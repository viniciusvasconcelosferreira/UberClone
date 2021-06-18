import React, {useState, useEffect, useRef} from 'react';
import {LogBox, Text, View, TouchableOpacity} from 'react-native';
import {css} from "./styles";
import config from '../../config'
import {WebView} from 'react-native-webview';

// RECEBENDO OBJETO PROPS CRIADO PELO REACT NAVIGATION
export default function Checkout(props) {
    const [url, setUrl] = useState(null);
    useEffect(() => {
        async function sendServer() {
            let response = await fetch(config.urlRoot, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    price: props.route.params.price,
                    address: props.route.params.address
                })
            });
            let json = await response.json();
            console.log(props);
            setUrl(json);
        }

        sendServer();
    }, []);

    //MUDANÇA DE ESTADO DE NAVEGAÇÃO
    async function stateChange(state) {
        console.log(state);
    }

    return (
        <View style={css.container}>
            {url &&
            <WebView
                originWhitelist={['*']}
                source={{uri: url}}
                style={css.checkoutmp}
                startInLoadingState={true}
                //MUDANÇAS OCORRIDAS NA WEBVIEW
                onNavigationStateChange={state => stateChange(state)}
            />
            }
            {/*RECEBIMENTO DOS PARAMETROS PASSADO DURANTE A NAVEGAÇÃO*/}
            {/*<Text>O valor da corrida é {props.route.params.price}</Text>*/}
            {/*<Text>Seu destino é {props.route.params.address}</Text>*/}
        </View>
    );
}