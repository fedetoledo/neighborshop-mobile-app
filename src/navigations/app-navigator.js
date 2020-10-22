import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FavouritesScreen from '../components/favourites/FavouritesScreen';
import ProfileScreen from '../components/profile/ProfileScreen';
import HomeScreen from '../components/market/Home';
import CategoryScreen from '../components/market/Category';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductDetail from '../components/market/ProductDetail';
import ModifyProfile from '../components/profile/ModifyProfile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeNavigator() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Category" component={CategoryScreen}
            options={
                ({route}) => ({
                    title: route.params.name,
                    headerTitleAlign: 'center',
                    // headerRight: () => (<SearchButton/>),
                })
            }
          />
          <Stack.Screen name="ProductDetail" component={ProductDetail}
            options={
                ({route}) => ({
                    title: route.params.market.name,
                    headerTitleAlign: 'center',
                })
            }
          />
        </Stack.Navigator>
    );
}

function FavouritesNavigator() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Favoritos" component={FavouritesScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="ProductDetail" component={ProductDetail}
            options={
                ({route}) => ({
                    title: route.params.market,
                    headerTitleAlign: 'center',
                })
            }
          />
        </Stack.Navigator>
    );
}

function ProfileNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen name="ModifyProfile" component={ModifyProfile}
                options={{
                    title: 'Modificar Perfil',
                    headerBackTitle: 'Perfil',
                }}
            />
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#517fa4',
            }}
        >
            <Tab.Screen
                options= {{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="heart" color={color} size={size} />
                        ),
                    }}
                name="Store" component={FavouritesNavigator} />
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
                name="Profile" component={ProfileNavigator} />
        </Tab.Navigator>
    );
}

