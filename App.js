import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect, useRef} from 'react';
import {LogBox, Text, View} from 'react-native';
import {css} from "./src/styles/css";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import config from './src/config'

LogBox.ignoreAllLogs(); //IGNORAR TODAS AS NOTIFICAÇÕES DE REGISTRO

export default function App() {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);

    useEffect(() => {
        //INVOCAÇÃO AUTOMATICA
        (async function () {
            const {status, permissions} = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
                setOrigin({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.000922,
                    longitudeDelta: 0.000421,
                })
            } else {
                throw new Error('Location permission not granted');
            }
        })();
    }, []);

    return (
        <View style={css.container}>
            <MapView style={css.map}
                     initialRegion={origin}
                     showsUserLocation={true}
                     zoomEnabled={true}
                     loadingEnabled={true}>
            </MapView>
            <View style={css.search}>
                <GooglePlacesAutocomplete
                    placeholder='Para onde vamos?'
                    onPress={(data, details = null) => {
                        setDestination({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.000922,
                            longitudeDelta: 0.000421
                        });
                        console.log(destination);
                    }}
                    query={{
                        key: config.googleApi,
                        language: 'pt-br',
                    }}
                    fetchDetails={true}
                    styles={{listView: {height: 100}}}
                />
            </View>
        </View>
    );
}
