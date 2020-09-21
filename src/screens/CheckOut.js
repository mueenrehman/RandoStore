import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image, ScrollView, FlatList } from "react-native";
import * as ItemService from '../services/Item'
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
                                <TouchableOpacity style={{ height: 140, width: '100%', marginTop: 10 }} activeOpacity={0.7}  >
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white' }}>
                                        <View style={{ marginLeft: '5%', justifyContent: 'center', width: '40%', }}>
                                            <Image
                                                style={{ height: '90%', width: '90%', resizeMode: 'stretch' }}
                                                source={{ uri: "http://localhost:3000/" + item.img }} />
                                        </View>
                                        <View style={{ width: '54%', marginLeft: '4%' }}>
                                            <View style={{ justifyContent: 'center', backgroundColor: 'white', marginRight: '5%', marginTop: '2%' }}>
                                                <Text numberOfLines={3} style={{ color: 'black', fontSize: 21, fontWeight: 'bold', marginRight: '2%' }}>{item.name}</Text>
                                            </View>
                                            <View style={{ justifyContent: 'center', marginTop: '2%' }}>
                                                <Text numberOfLines={2} style={{ color: 'grey', fontSize: 16, }}>Rs: {item.price}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={item => item.title} />
                    </View>
                    <View style={{ height: '30%', width: '100%', borderRadius: 20, backgroundColor: 'lightgrey', }}>
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
                <View style={{ height: "100%", width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                    <Text style={{ fontSize: 20, }}>
                        No items added
                    </Text>
                </View>
            )


        }
    }

}