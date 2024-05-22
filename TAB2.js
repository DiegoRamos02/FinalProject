import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Usuario2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tiempoTotal: 0,
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

    render() {
        const { tiempoTotal } = this.state;

        return (
            <View style={styles.container}>
                <ImageBackground source={require('./assets/newFond.jpeg')} style={styles.backgroundImage}>
                    <View style={styles.counterContainer}>
                        <Text style={styles.counterTitle}>Tiempo Total Transcurrido:</Text>
                        <Text style={styles.counterText}>{tiempoTotal} segundos</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    counterContainer: {
        marginTop: 20,
        backgroundColor: 'rgba(255, 25, 255, 0.5)',
        padding: 50,
        borderRadius: 20,
        alignItems: 'center',
    },
    counterTitle: {
        color: 'black',
        fontSize: 24,
        marginBottom: 10,
    },
    counterText: {
        color: 'black',
        fontSize: 17,
        marginBottom: 50,
    },
});





