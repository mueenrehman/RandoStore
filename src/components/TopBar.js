import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons"
import { TextInput } from "react-native-gesture-handler";
import Storage from '../helper/Storage'

export default class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: Storage.itemCount,
            name: props.pageName
        }
    }

    componentWillReceiveProps(props) {
        this.setState(
            {
                count: Storage.itemCount,
                name: props.pageName
            })
    }

    pageNaming = () => { //header names
        if (this.state.name == "AddItems") {
            return "Add Items"
        }
        else {
            return this.state.name
        }
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{ height: 65, width: '100%', backgroundColor: 'white', flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: "grey" }}>
                    <View style={{ flexDirection: 'row', width: "80%", justifyContent: 'center', left: 0 }}>
                        <View style={{ width: '10%', justifyContent: 'center', }}>
                            {
                                this.state.name != "Home" &&
                                <TouchableOpacity onPress={() => { this.props.props.navigation.goBack() }} >
                                    <Ionicons name="arrow-back-outline" size={30}></Ionicons>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={{ width: '70%', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, left: 25 }}>
                                {this.pageNaming()}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: '20%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
                        {
                            this.state.name != "CheckOut" &&
                            <TouchableOpacity onPress={() => { this.props.props.navigation.navigate('CheckOut') }}>
                                <Ionicons name="cart-outline" size={55} />
                            </TouchableOpacity>
                        }
                    </View>
                    {
                        this.state.name != "CheckOut" &&
                        <View style={{ backgroundColor: 'red', height: 30, width: 30, borderRadius: 100, position: 'absolute', top: 5, right: 5, justifyContent: 'center' }}>
                            <Text style={{ color: 'black', textAlign: 'center' }}>
                                {this.state.count}
                            </Text>
                        </View>
                    }
                </View>
            </SafeAreaView>

        );
    }
}