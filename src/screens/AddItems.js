import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image, } from "react-native";
import { TextInput } from 'react-native-paper';
import TopBar from '../components/TopBar'
import Storage from '../helper/Storage'
import * as ItemService from '../services/Item'

export default class AddItems extends Component {
    static navigationOptions = {
        headerShown: false
    };
    constructor(props) {
        super(props);
        this.state = {  //state variables
            name: "",
            price: "",
            photoUrl: "", 
        }
    }

    addItemToServer = async () => { 
        //validation of empty objects
        if (this.state.name == '') {
            alert("Name cannot be empty!")
            return
        }
        if (this.state.price == '') {
            alert("Price cannot be empty!")
            return
        }
        if (this.state.photoUrl == '') {
            alert("ImageUrl cannot be empty!")
            return
        }
        //calling additems service
        let response = await ItemService.addItems(this.state.name, this.state.price, this.state.photoUrl)
        if (response != undefined && response != null) { //response of service
            console.log("response =>", response)
            alert("item added successfully")
            this.refreshItemList()
        }
    }

    refreshItemList = async () =>{
        let response = await ItemService.getItems()
        if (response != undefined && response != null) {
            console.log("response =>", response)
            Storage.items = response //items are assigned to global variable
            
        }
    }

    render() {
        return (
            <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                <TopBar props={this.props} pageName={this.props.navigation.state.routeName} />
                <View style={{ height: '60%', margin: '6%', borderRadius: 10, backgroundColor: 'white', borderWidth: 0.5, borderColor: "#9869C6", shadowColor: 'black', shadowOpacity: 0.5, shadowOffset: { height: 2, width: 2, } }}>
                    <Text style={{ color: '#2196F3', textAlign: 'center', fontWeight: 'bold', fontSize: 30, top: '6%', }}>Put Items Up for Sale</Text>
                    <TextInput
                        style={{ top: '7%', margin: '3%', height: '10%', }}
                        mode="outlined"
                        label="Name"
                        theme={{ colors: { primary:"#2196F3" } }}
                        value={this.state.name}
                        onChangeText={(text) => this.setState({ name: text })}
                    />
                    <TextInput
                        style={{ top: '7%', height: '10%', margin: '3%' }}
                        mode="outlined"
                        label="Price"
                        theme={{ colors: { primary:"#2196F3" } }}
                        value={this.state.price}
                        onChangeText={(text) => this.setState({ price: text })}
                    />
                    <TextInput
                        style={{ top: '7%', height: '10%', margin: '3%' }}
                        mode="outlined"
                        label="Image Url"
                        theme={{ colors: { primary:"#2196F3" } }}
                        value={this.state.photoUrl}
                        onChangeText={(text) => this.setState({ photoUrl: text })}
                    />
                    <View style={{ height: '20%', marginTop: '5%' }}>
                        <TouchableOpacity style={{ backgroundColor: "#2196F3", width: '70%', height: '50%', marginLeft: '15%', marginRight: '15%', marginTop: '10%', borderRadius: 40, justifyContent: 'center', }}
                            onPress={() => { this.addItemToServer() }} >
                            <Text style={{ color: "white", fontWeight: "bold", textAlign: "center", fontSize: 25 }}>Submit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: "white", width: '25%', height: '50%', marginLeft: '37.5%', marginRight: '37.5%', marginTop: '8%', borderRadius: 40, justifyContent: 'center', }}
                            onPress={() => { this.props.navigation.navigate('Items') }} >

                            <Text style={{ color: "#2196F3", textAlign: "center", fontSize: 15 }}>View Items</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        );
    }
}

