import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image, ScrollView, FlatList } from "react-native";
import * as ItemService from '../services/Item'
import Ionicons from "react-native-vector-icons/Ionicons"
import Storage from '../helper/Storage'
import { TextInput } from "react-native-gesture-handler";
import TopBar from '../components/TopBar'

export default class CheckOut extends Component {
    static navigationOptions = {
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            itemsList: Storage.addedItems,
            price: 0
        }
        this.getTotalPrice()
    }

    getTotalPrice = () => {
        this.state.price = 0
        for (let index = 0; index < this.state.itemsList.length; index++) {
            this.state.price = this.state.price + parseInt(this.state.itemsList[index].price)
        }
        this.setState({
            price: this.state.price
        })
    }

    removeItemFromCheckoutList = async (item, index) => {
        this.state.itemsList = 0
        if (item.id == Storage.addedItems[index].id) {
            Storage.addedItems.splice(index, 1)
            Storage.itemCount = Storage.itemCount - 1
        }
        this.setState({
            itemsList: Storage.addedItems
        }, () => {
            this.getTotalPrice()
        })

    }

    render() {
        if (this.state.itemsList.length != 0) {
            return (
                <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                    <TopBar props={this.props} pageName={this.props.navigation.state.routeName} />

                    <View style={{ height: '60%', borderBottomColor: 'grey', borderBottomWidth: 0 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.itemsList}
                            renderItem={({ item, index }) =>
                                <View style={{ height: 140, width: '100%', marginTop: 10 }} activeOpacity={0.7}  >
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white' }}>
                                        <View style={{ justifyContent: 'center', width: '40%', }}>
                                            <Image
                                                style={{ height: '90%', width: '90%', resizeMode: 'stretch' }}
                                                source={{ uri: "http://localhost:3000/" + item.img }} />
                                        </View>
                                        <View style={{ width: '46%', marginLeft: '0%', backgroundColor: 'white' }}>
                                            <View style={{ justifyContent: 'center', backgroundColor: 'white', marginRight: '5%', marginTop: '2%' }}>
                                                <Text numberOfLines={3} style={{ color: 'black', fontSize: 21, fontWeight: 'bold', marginRight: '2%' }}>{item.name}</Text>
                                            </View>
                                            <View style={{ justifyContent: 'center', marginTop: '2%' }}>
                                                <Text numberOfLines={2} style={{ color: 'grey', fontSize: 16, }}>Rs: {item.price}</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '10%', backgroundColor: "white" }}>
                                            <TouchableOpacity style={{ width: '70%', backgroundColor: 'white', alignItems: 'center', top: 0 }}
                                                onPress={() => {
                                                    this.removeItemFromCheckoutList(item, index)
                                                }}>
                                                <Ionicons name="close-circle-outline" size={30} ></Ionicons>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            }
                            keyExtractor={item => item.title} />
                    </View>
                    <View style={{ height: '30%', width: '100%', borderRadius: 20, backgroundColor: '#F6F6F6', }}>
                        <Text style={{ fontSize: 25, fontWeight: '700', textAlign: 'center', marginTop: '5%' }}>
                            Order Details
                    </Text>
                        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                            <View style={{ width: "75%" }}>
                                <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'right', marginRight: '0%' }}>
                                    Total amount:
                    </Text>
                            </View>
                            <View style={{ width: "20%", marginLeft: '5%' }}>
                                <Text style={{ fontSize: 20, fontWeight: '700', }}>
                                    Rs {this.state.price}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
        else {
            return (

                <View style={{ height: "100%", width: '100%', backgroundColor: 'white' }}>
                    <TopBar props={this.props} pageName={this.props.navigation.state.routeName} />
                    <View style={{ height: "80%", width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                        <Text style={{ fontSize: 20, }}>
                            No items added
                    </Text>
                    </View>
                </View>
            )


        }
    }

}