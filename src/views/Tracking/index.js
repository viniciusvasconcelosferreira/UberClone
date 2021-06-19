import React, {useState, useEffect, useRef} from 'react';
import {LogBox, Text, View, TouchableOpacity, Image} from 'react-native';
import {css} from "./styles";

// RECEBENDO OBJETO PROPS CRIADO PELO REACT NAVIGATION
export default function Tracking() {
    return (
        <View style={[css.container, css.motorista]}>
            <Image style={css.motoristaImage} source={require('../../assets/motorista-2.jpg')}/>
            <Text style={css.motoristaText}>O motorista fulano está a caminho</Text>
        </View>
    );
}