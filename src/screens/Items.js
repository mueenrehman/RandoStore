import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image, FlatList, StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import TopBar from '../components/TopBar'
import Storage from '../helper/GlobalVariables'
import * as ItemService from '../services/Item'

export default class Items extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props)
        this.state = {
            items: Storage.items,
            count: Storage.itemCount
        }
        this._didAppear = this.props.navigation.addListener("didFocus", payback => {
            this.bucketCount()
        })
    }

    bucketCount = () => {
        this.setState({
            count: Storage.itemCount
        })
    }

    addItemsToCart = async (item) => {
        Storage.addedItems.push(item)
        Storage.itemCount = Storage.itemCount + 1
        this.setState({
            count: Storage.itemCount
        })
    }

    deleteItemsFromServer = async (item) => {
        let response = await ItemService.deleteItems(item.id)
        alert('item deleted successfully')
        this.refreshItemList()
    }
    
    refreshItemList = async () => {
        let response = await ItemService.getItems()
        if (response != undefined && response != null) {
            console.log('response =>', response)
            Storage.items = response
            this.setState({
                items: response
            })
        }
    }

    render() {
        return (
            <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                <StatusBar backgroundColor="grey" barStyle='dark-content' />
                <TopBar props={this.props} pageName={this.props.navigation.state.routeName} />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.items}
                    renderItem={({ item, index }) =>
                        <View style={{ height: 140, width: '100%', borderBottomWidth: 0.25, borderBottomColor: 'grey' }} activeOpacity={0.7}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white' }}>
                                <View style={{ marginLeft: '0%', justifyContent: 'center', width: '25%', }}>
                                    <Image
                                        style={{ height: '90%', width: '100%', resizeMode: 'stretch' }}
                                        source={{ uri: "http://localhost:3000/" + item.img }} />
                                </View>
                                <View style={{ width: '45%', marginLeft: '5%' }}>
                                    <View style={{ justifyContent: 'center', backgroundColor: 'white', marginRight: '5%', marginTop: '2%' }}>
                                        <Text numberOfLines={2} style={{ color: 'black', fontSize: 21, fontWeight: 'bold', marginRight: '2%' }}>{item.name}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', marginTop: '2%' }}>
                                        <Text numberOfLines={2} style={{ color: 'grey', fontSize: 16, }}>Rs {item.price}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '20%', flexDirection: 'row', }}>

                                    <TouchableOpacity style={{ width: '50%', backgroundColor: 'white', alignItems: 'center' }}
                                        onPress={() => {
                                            this.addItemsToCart(item)
                                        }}>
                                        <Ionicons name="add-circle-outline" size={35} ></Ionicons>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ width: '50%', backgroundColor: 'white', alignItems: 'center', top: 0 }}
                                        onPress={() => {
                                            this.deleteItemsFromServer(item)
                                        }}>
                                        <Ionicons name="trash-outline" size={35} color={'#ed0000'} ></Ionicons>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                    keyExtractor={item => item.title} />
            </View>
        );
    }
}

