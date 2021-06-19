import React, {useState, useEffect, useRef} from 'react';
import {LogBox, Text, View, TouchableOpacity} from 'react-native';
import {css} from "./styles";

// RECEBENDO OBJETO PROPS CRIADO PELO REACT NAVIGATION
export default function Tracking() {
    return (
        <View style={css.container}>
            <Text>Seu pagamento foi aprovado.</Text>
        </View>
    );
}