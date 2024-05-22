import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuOptions from './MenuOptions';

import Usuario1 from './TAB1';
import Usuario2 from './TAB2';
import Usuario3 from './TAB3';

const Stack = createNativeStackNavigator();

export default class ManejoTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            tiempoTotal: 0,
            userData: this.props.route.params.userData // Recibe los datos del usuario
        };
    }

    componentDidMount() {
        this.cargarTiempoTotal();
    }

    cargarTiempoTotal = async () => {
        try {
            const tiempoTotal = await AsyncStorage.getItem('tiempoTotal');
            if (tiempoTotal !== null) {
                this.setState({ tiempoTotal: parseInt(tiempoTotal) });
            }
        } catch (error) {
            console.error('Error cargando el tiempo total:', error);
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    handleOptionSelect = (screen) => {
        this.setModalVisible(false);
        this.props.navigation.navigate(screen);
    }

    handleLogout = async () => {
        this.setModalVisible(false);
        // Guardar el tiempo total en AsyncStorage
        try {
            await AsyncStorage.setItem('tiempoTotal', this.state.tiempoTotal.toString());
        } catch (error) {
            console.error('Error guardando el tiempo total:', error);
        }

        // Navegar a la pantalla de inicio de sesión
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }


    actualizarTiempoTotal = (tiempo) => {
        this.setState(prevState => ({
            tiempoTotal: prevState.tiempoTotal + tiempo
        }));
    }

    render() {
        const { modalVisible, userData, tiempoTotal } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Usuario1"
                        options={{
                            title: 'Contador',
                            headerLeft: null,  // Oculta la flecha de retroceso
                            headerRight: () => (
                                <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                                    <MaterialCommunityIcons name="menu-open" size={30} color="black" />
                                </TouchableOpacity>
                            ),
                        }}
                    >
                        {props => <Usuario1 {...props} userData={userData} actualizarTiempoTotal={this.actualizarTiempoTotal} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name="Usuario2"
                        options={{
                            title: 'Total',
                            headerRight: () => (
                                <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                                    <MaterialCommunityIcons name="menu" size={30} color="black" />
                                </TouchableOpacity>
                            ),
                        }}
                    >
                        {props => <Usuario2 {...props} tiempoTotal={tiempoTotal} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name="Usuario3"
                        component={Usuario3}
                        options={{
                            title: 'Anuncios',
                            headerRight: () => (
                                <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                                    <MaterialCommunityIcons name="menu" size={30} color="black" />
                                </TouchableOpacity>
                            ),
                        }}
                    />
                </Stack.Navigator>
                {modalVisible && (
                    <View style={styles.modalOverlay}>
                        <TouchableOpacity style={styles.modalOverlayTouchable} onPress={() => this.setModalVisible(false)} />
                        <MenuOptions
                            onOptionSelect={this.handleOptionSelect}
                            onClose={() => this.setModalVisible(false)}
                            onLogout={this.handleLogout}
                        />
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(218, 112, 214, 0.5)',
    },
    modalOverlayTouchable: {
        flex: 1,
    },
});




