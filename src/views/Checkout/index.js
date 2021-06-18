import React, {useState, useEffect, useRef} from 'react';
import {LogBox, Text, View, TouchableOpacity} from 'react-native';
import {css} from "./styles";
// RECEBENDO OBJETO PROPS CRIADO PELO REACT NAVIGATION
export default function Checkout(props) {

    useEffect(() => {
        async function sendServer() {
            let response = await fetch('http://10.0.0.149:3000/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    price: 100
                })
            });
            let json = await response.json();
            console.log(json);
        }

        sendServer();
    }, []);

    return (
        <View style={css.container}>
            {/*RECEBIMENTO DOS PARAMETROS PASSADO DURANTE A NAVEGAÇÃO*/}
            <Text>O valor da corrida é {props.route.params.price}</Text>
            <Text>Seu destino é {props.route.params.address}</Text>
        </View>
    );
}