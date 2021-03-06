import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Form, Item, Input, Label, Toast, Icon, Thumbnail, Spinner } from 'native-base';
import styles from '../styles';
import Text from '../AppText';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { goHome } from '../Navigation';
import Loader from './Loader';

class Register extends Component {

    state = {
        confirmPassword: true,
        isProcessing: false,
        loading: false,
        loadingText: undefined
    };

    onRegister = () => {
        if (this.password != this.confirmPassword) {
            return Toast.show({
                text: "password and confirm password does not match",
                type: "danger",
                textStyle: {
                    fontFamily: "Sofia Pro Regular"
                }
            })
        }
        if (this.email == null || this.fullname == null) {
            alert("Invalid credentials");
            return;
        }
        else {
            this.doRegister();
        }
        // MainTabs();
    };

    doRegister(credentials) {
        this.showLoader('Please wait...')
        axios.get(`https://agentscove.com/parser/api?email=${this.email}&name=${this.fullname}&signup=true`).then((response) => {
            this.hideLoader();
            if (response.data.data[0].error) {
                alert(response.data.data[0].response)
            } else {
                alert(response.data.data[0].response)
            }
            // AsyncStorage.setItem("TOKEN", response.data.token);
            // this.props.navigator.push({
            //     screen: "uwe.Home",
            //     title: "Home"
            // })
            // goHome();
            console.log(response.data);
        }).catch((err) => {
            alert(err);
            if (err) {
                this.hideLoader();
            }
        })
    }

    onConfirmPassword = p => {
        this.setState({
            confirmPassword: p === this.password
        });
    }

    showLoader(loadingText) {
        this.setState({ loading: true, loadingText })
    }

    hideLoader() {
        this.setState({ loading: false, loadingText: null })
    }

    render() {
        const { loading, loadingText } = this.state;
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <LinearGradient
                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                    locations={[0, 0.5, 0.6]}
                    colors={['#111111', '#333333', '#78787A']}
                    style={[{
                        flex: 1,
                        padding: 20,
                        justifyContent: "center"
                    }]}>
                    <View>
                        {/* <Thumbnail large style={{
                            alignSelf: "center",
                            position: "relative",
                            bottom: 30,
                            width: 90,
                            height: 90,
                            borderRadius: 90 / 2,
                            borderColor: "#F1F1F1",
                            borderWidth: 3
                        }} source={require("../imgs/logo_main.jpeg")} /> */}
                        <View style={{ padding: 20, alignItems: "center" }}>
                            <Text style={{ fontSize: 35, color: "white" }}>Sign up</Text>
                        </View>
                        <Form>
                            <Item rounded last>
                                <Label style={styles.placeholder}><Icon style={styles.defaultGrayTextColor} name="person" /></Label>
                                <Input
                                    placeholder="email address"
                                    placeholderTextColor="#CCC"
                                    textContentType="emailAddress"
                                    onChangeText={em => this.email = em}
                                    style={styles.inputFormStyle}
                                    autoCapitalize={"none"}
                                />
                            </Item>
                            <Item style={{ marginTop: 10 }} rounded last>
                                <Label style={styles.placeholder}><Icon style={styles.defaultGrayTextColor} name="person" /></Label>
                                <Input
                                    placeholder="full name"
                                    placeholderTextColor="#CCC"
                                    onChangeText={u => this.fullname = u}
                                    style={styles.defaultFont}
                                    autoCapitalize={"none"}
                                    style={styles.inputFormStyle}
                                />
                            </Item>
                            {/* <Item style={{ marginTop: 10 }} rounded last>
                            <Label style={styles.placeholder}><Icon style={styles.defaultGrayTextColor} name="ios-unlock" /></Label>
                            <Input
                                placeholder="password"
                                placeholderTextColor="#CCC"
                                onChangeText={p => this.password = p}
                                secureTextEntry={true}
                                style={styles.inputFormStyle}
                            />
                        </Item>
                        <Item style={{ marginTop: 10 }} rounded last>
                            <Label style={styles.placeholder}><Icon style={styles.defaultGrayTextColor} name="ios-unlock" /></Label>
                            <Input
                                placeholder="confirm password"
                                placeholderTextColor="#CCC"
                                onChangeText={e => this.confirmPassword = e}
                                secureTextEntry={true}
                                style={styles.inputFormStyle}
                            />
                        </Item> */}
                        </Form>
                        <View style={styles.button}>
                            <TouchableOpacity
                                disabled={this.state.isProcessing ? true : false}
                                onPress={this.onRegister}
                            >
                                <LinearGradient
                                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                                    locations={[0, 0.5, 0.6]}
                                    colors={['#0152DF', '#0152DF', '#0152DF']}
                                    style={[{
                                        height: 50,
                                        width: "100%",
                                        alignItems: "center",
                                        borderRadius: 50,
                                        justifyContent: "center"
                                    }, this.state.isProcessing ? { opacity: 0.5 } : { opacity: 1 }]}>
                                    {
                                        this.state.isProcessing ? <View style={{ justifyContent: "center" }}>
                                            <Spinner size="large" color="#00A86B" />
                                        </View> : <Text style={styles.textWhite}>Submit</Text>
                                    }
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.accountText}>
                        <Text>Already have an account?</Text>
                        <TouchableOpacity onPress={this.Login}><Text style={{ marginLeft: 5 }}>Sign In</Text></TouchableOpacity>
                    </View> */}
                        {loading && <Loader loading={loading} text={loadingText} />}
                    </View>
                </LinearGradient>
            </ScrollView>
        );
    }
}

export default Register;