import React, { Component } from "react";
import { Text, TouchableOpacity, View, StatusBar, Image, ScrollView, FlatList, ImageBackground } from "react-native";
import { SafeAreaView } from "react-navigation";
import TopBar from '../components/TopBar'
import * as ItemService from '../services/Item'
import Storage from '../helper/Storage'

export default class Home extends Component {
    static navigationOptions = {
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.getItemsList() //fetching data from server
        this.state = {
            count: Storage.itemCount
        }
        this._didAppear = this.props.navigation.addListener('didFocus', payback => {
            this.basketCount() //to get the basket count after coming back to homepage from items page
        })
    }

    getItemsList = async () => {
        let response = await ItemService.getItems()
        if (response != undefined && response != null) {
            console.log("response =>", response)
            Storage.items = response //items are assigned to global variable
        }
    }

    basketCount = () => {
        this.setState({
            count: Storage.itemCount 
        })
    }

    render() {
        return (
            <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                <TopBar props={this.props} pageName={this.props.navigation.state.routeName} />
                <View style={{ backgroundColor: 'white', alignItems: 'center', width: '100%', height: '20%', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', }}>RandoStore</Text>
                </View>
                <View style={{ height: '40%', backgroundColor: 'white' }}>
                    <TouchableOpacity style={{ backgroundColor: "#2196F3", width: '70%', height: 70, marginLeft: '15%', marginRight: '15%', marginTop: '5%', borderRadius: 10, justifyContent: 'center', }}
                        onPress={() => { this.props.navigation.navigate('AddItems') }} >
                        <Text style={{ color: "white", fontWeight: "bold", textAlign: "center", fontSize: 25 }}>Put Items Up for Sale</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#2196F3", width: '70%', height: 70, marginLeft: '15%', marginRight: '15%', marginTop: '5%', borderRadius: 10, justifyContent: 'center', }}
                        onPress={() => { this.props.navigation.navigate('Items') }} >
                        <Text style={{ color: "white", fontWeight: "bold", textAlign: "center", fontSize: 25 }}>Browse our Items!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#2196F3", width: '70%', height: 70, marginLeft: '15%', marginRight: '15%', marginTop: '5%', borderRadius: 10, justifyContent: 'center', }}
                        onPress={() => { this.props.navigation.navigate('CheckOut') }} >
                        <Text style={{ color: "white", fontWeight: "bold", textAlign: "center", fontSize: 25 }}>Check out!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

