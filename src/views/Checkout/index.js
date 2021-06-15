import React, {useState, useEffect, useRef} from 'react';
import {LogBox, Text, View, TouchableOpacity} from 'react-native';
import {css} from "./styles";
// RECEBENDO OBJETO PROPS CRIADO PELO REACT NAVIGATION
export default function Checkout(props) {
    return (
        <View style={css.container}>
            {/*RECEBIMENTO DOS PARAMETROS PASSADO DURANTE A NAVEGAÇÃO*/}
            <Text>O valor da corrida é {props.route.params.price}</Text>
            <Text>Seu destino é {props.route.params.address}</Text>
        </View>
    );
}