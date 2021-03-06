import React, { Component } from "react";
import { View, StyleSheet, Platform, Image } from "react-native";
// import Background from "./Background";
import { goToAuth, goHome } from '../Navigation';
import Text from '../AppText';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const styles = StyleSheet.create({
    activity: {
        alignSelf: "center"
    },
    text1: {
        color: "white",
        fontSize: 50,
        fontFamily: 'Poppins-Bold'
    },
    text2: {
        color: "red",
        fontSize: 50,
        fontFamily: 'Montserrat-Bold'
    },
    textContainer: {
        flexDirection: 'row',
        alignSelf: "center",
    }
});

const backgroundImage = "../imgs/Android.png";
class Splash extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // goHome()
        AsyncStorage.getItem("credentials")
            .then(data => {
                if (!data) {
                    return setTimeout(() => goToAuth(), 4000)
                }
                setTimeout(() => goHome(), 4000)
                // let data = {
                //     token: token
                // }
                // axios.post(`https://agentscove.com/parser/api?email=${email}&password=${password}&signin=true`, data).then(function (response) {
                //     AsyncStorage.setItem("TOKEN", response.data.token);
                //     setTimeout(() => goHome(), 4000)
                // }).catch(function (err) {
                //     if (err) {
                //         return goToAuth();
                //     }
                // })
            });
    }

    render() {
        return (
            // <Background img={require(backgroundImage)}>

            // </Background>
            <View style={{ flex: 1, backgroundColor: "#CCC", justifyContent: "center", alignItems: "center" }}>
                <Image style={{ width: 130, height: 130, borderRadius: 130 / 2 }} source={require('../imgs/logo_main.jpeg')} />
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 16 }}>Initializing...</Text>
                </View>
            </View>
        );
    }
}

export default Splash;
