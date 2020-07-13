import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import StoreScreen from '../scenes/Store';
import ProfileScreen from '../scenes/Profile';
import HomeScreen from '../scenes/shop/Home';
import CategoryScreen from '../scenes/shop/Category';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductDetail from '../scenes/shop/ProductDetail';
import SearchButton from '../components/shop/atoms/SearchButton';
import FavouriteButton from '../components/shop/atoms/FavouriteButton';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeNavigator() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}
          />
          <Stack.Screen name="Category" component={CategoryScreen}
            options={
                ({route}) => ({
                    title: route.params.name,
                    headerTitleAlign: 'center',
                    headerRight: () => (<SearchButton/>),
                })
            }
          />
          <Stack.Screen name="ProductDetail" component={ProductDetail}
            options={
                ({route}) => ({
                    title: route.params.product.store,
                    headerTitleAlign: 'center',
                    headerRight: () => (<FavouriteButton />),
                })
            }
          />
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
        >
            <Tab.Screen
                options= {{
                    tabBarLabel: 'Mi tienda',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="store" color={color} size={size} />
                        ),
                    }}
                name="Store" component={StoreScreen} />
            <Tab.Screen
                options= {{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
                name="Home" component={HomeNavigator}
            >
            </Tab.Screen>
            <Tab.Screen
                options= {{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
                name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

