import React, {useState, useEffect, useRef} from 'react';
import {LogBox, Text, View, TouchableOpacity, NativeModules} from 'react-native';
import {css} from "./styles";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import config from '../../config'
import MapViewDirections from 'react-native-maps-directions';
import {MaterialIcons} from '@expo/vector-icons';

LogBox.ignoreAllLogs(); //IGNORAR TODAS AS NOTIFICAÇÕES DE REGISTRO
// INSTANCIANDO OBJETO PROPS CRIADO PELO REACT NAVIGATION
export default function Home(props) {
    const mapEl = useRef(null);
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [distance, setDistance] = useState(null);
    const [price, setPrice] = useState(null);
    const [address, setAddress] = useState(null);
    const locale = NativeModules.I18nManager.localeIdentifier;

    useEffect(() => {
        //INVOCAÇÃO AUTOMATICA
        (async function () {
            // SOLICITANDO PERMISSÃO DE LOCALIZAÇÃO
            const {status, permissions} = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                // OBJETO LOCATION
                let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
                setOrigin({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    // APROXIMAÇÃO DO SATÉLITE
                    latitudeDelta: 0.000922,
                    longitudeDelta: 0.000421,
                })
            } else {
                throw new Error('Permissão de localização não concedida');
            }
        })();
    }, []);

    return (
        <View style={css.container}>
            <MapView style={css.map}
                     initialRegion={origin}
                     showsUserLocation={true}
                     zoomEnabled={true}
                     loadingEnabled={true}
                     ref={mapEl}>
                {destination &&
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={config.googleApi}
                    // GROSSURA DO TRAÇO DA ROTA
                    strokeWidth={3}
                    onReady={result => {
                        setDistance(result.distance);
                        setPrice(result.distance * 3);
                        // DISTANCIMENTO DAS BORDAS
                        mapEl.current.fitToCoordinates(
                            result.coordinates, {
                                edgePadding: {
                                    top: 50,
                                    bottom: 50,
                                    left: 50,
                                    right: 50
                                }
                            }
                        );
                    }
                    }
                />
                }
            </MapView>
            <View style={css.search}>
                <GooglePlacesAutocomplete
                    placeholder='Para onde vamos?'
                    onPress={(data, details = null) => {
                        setAddress(data.description);
                        setDestination({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.000922,
                            longitudeDelta: 0.000421
                        });
                    }}
                    query={{
                        key: config.googleApi,
                        // ANOTATION: locale.replace('_', '-').toLowerCase()
                        language: 'pt-br',
                    }}
                    // DETALHES DOS LOCAIS NA LISTA
                    fetchDetails={true}
                    // ESTILO DA LISTA DE LOCAIS
                    styles={
                        {
                            listView: {
                                backgroundColor: '#fff',
                                zIndex: 10
                            },
                            container: {
                                position: 'absolute',
                                width: '100%'
                            }
                        }
                    }
                />
                {distance &&
                <View style={css.containerDistance}>
                    <Text style={css.textDistance}>Distância: {distance.toFixed(2).replace('.', ',')}km</Text>
                    {/*REDIRECIONAMENTO PARA TELA DE CHECKOUT COM PASSAGEM DE PARAMETROS*/}
                    <TouchableOpacity style={css.buttonPrice} onPress={() => props.navigation.navigate('Checkout', {
                        price: price.toFixed(2),
                        address: address
                    })}>
                        <MaterialIcons name="payment" size={24} color="#fff"/>
                        <Text style={css.textPrice}> Pagar R${price.toFixed(2).replace('.', ',')}
                        </Text>
                    </TouchableOpacity>
                </View>
                }
            </View>
        </View>
    );
}