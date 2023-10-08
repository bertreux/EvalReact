import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationStack from './navigation/NavigationStack';
import Icone from "react-native-vector-icons/Foundation";
import Login from './composants/front/Login';
import {ProfilContextProvider} from './context/profilContext';

const Tabs = createBottomTabNavigator()

export default function App() {
    return (
        <View style={styles.container}>
            <ProfilContextProvider>
                <NavigationContainer>
                    <Tabs.Navigator>
                        <Tabs.Screen options={{
                            headerShown: false,
                            tabBarIcon: function () {
                                return <Icone size={20} color={'black'} name="home"/>
                            }
                        }}
                                    component={NavigationStack} name="home"/>
                        <Tabs.Screen options={{
                            tabBarIcon: function () {
                                return <Icone size={20} color={'black'} name="eye"/>
                            }
                        }} component={Login} name="login"/>
                    </Tabs.Navigator>
                </NavigationContainer>
            </ProfilContextProvider>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
