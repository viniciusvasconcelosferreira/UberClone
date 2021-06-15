import {StyleSheet} from "react-native";

const css = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    map: {
        height: '60%',
    },
    search: {
        height: '40%',
    },
    containerDistance: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    textDistance: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonPrice: {
        backgroundColor: '#000',
        padding: 7,
        borderRadius: 4,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textPrice: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export {css};