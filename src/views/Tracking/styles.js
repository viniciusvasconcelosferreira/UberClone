import {StyleSheet} from "react-native";

const css = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    motorista: {
        alignItems: 'center',
        backgroundColor: '#222'
    },
    motoristaImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20
    },
    motoristaText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#fff'
    }
});
export {css};