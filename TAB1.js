import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';

export default class Usuario1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tiempoTranscurrido: 0,
            contadorIniciado: false,
            contadorPausado: false
        };
    }

    componentDidMount() {
        this.cargarTiempoTranscurrido();
    }

    componentWillUnmount() {
        BackgroundTimer.stopBackgroundTimer(); // Detiene el contador en segundo plano al salir de la pantalla
    }

    cargarTiempoTranscurrido = async () => {
        try {
            const tiempo = await AsyncStorage.getItem('tiempoTranscurrido');
            if (tiempo !== null) {
                this.setState({ tiempoTranscurrido: parseInt(tiempo) });
            }
        } catch (error) {
            console.error('Error cargando el tiempo transcurrido:', error);
        }
    }

    guardarTiempoTranscurrido = async (tiempo) => {
        try {
            await AsyncStorage.setItem('tiempoTranscurrido', tiempo.toString());
        } catch (error) {
            console.error('Error guardando el tiempo transcurrido:', error);
        }
    }

    reiniciarTiempoTotal = async () => {
        try {
            await AsyncStorage.setItem('tiempoTranscurrido', '0'); // Reinicia el tiempo transcurrido en la sesión actual
            this.setState({ tiempoTranscurrido: 0 }); // Reinicia el tiempo en el estado del componente
            this.props.actualizarTiempoTotal(0); // Actualiza el tiempo total en el componente ManejoTabs
        } catch (error) {
            console.error('Error reiniciando el tiempo total:', error);
        }
    }


    iniciarContador = () => {
        this.setState({ contadorIniciado: true, contadorPausado: false });
        this.intervalo = BackgroundTimer.setInterval(() => { // Inicia el contador en segundo plano
            this.setState(prevState => {
                const nuevoTiempo = prevState.tiempoTranscurrido + 1;
                this.guardarTiempoTranscurrido(nuevoTiempo);
                return { tiempoTranscurrido: nuevoTiempo };
            });
        }, 1000);
    }

    pausarContador = () => {
        BackgroundTimer.clearInterval(this.intervalo); // Pausa el contador en segundo plano
        this.setState({ contadorPausado: true });
    }

    detenerContador = () => {
        BackgroundTimer.clearInterval(this.intervalo); // Detiene el contador en segundo plano
        this.props.actualizarTiempoTotal(this.state.tiempoTranscurrido);
        this.setState({ contadorIniciado: false, contadorPausado: false });
    }

    reanudarContador = () => {
        this.iniciarContador();
    }

    render() {
        const { userData } = this.props;

        return (
            <View style={styles.container}>
                <ImageBackground source={require('./assets/newFond.jpeg')} style={styles.backgroundImage}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>Bienvenido, {userData.nombre}</Text>
                    </View>
                    <View style={styles.counterContainer}>
                        <Text style={styles.counterTitle}>Contador de esta sesión...</Text>
                        <Text style={styles.counterText}>Tiempo transcurrido en esta sesión: {this.state.tiempoTranscurrido} segundos</Text>
                        {!this.state.contadorIniciado && (
                            <TouchableOpacity onPress={this.iniciarContador} style={[styles.button, styles.startButton]}>
                                <Text style={styles.buttonText}>Iniciar Contador</Text>
                            </TouchableOpacity>
                        )}
                        {this.state.contadorIniciado && !this.state.contadorPausado && (
                            <TouchableOpacity onPress={this.pausarContador} style={[styles.button, styles.pauseButton]}>
                                <Text style={styles.buttonText}>Pausar Contador</Text>
                            </TouchableOpacity>
                        )}
                        {this.state.contadorIniciado && this.state.contadorPausado && (
                            <TouchableOpacity onPress={this.reanudarContador} style={[styles.button, styles.resumeButton]}>
                                <Text style={styles.buttonText}>Reanudar Contador</Text>
                            </TouchableOpacity>
                        )}
                        {this.state.contadorIniciado && (
                            <TouchableOpacity onPress={this.detenerContador} style={[styles.button, styles.stopButton]}>
                                <Text style={styles.buttonText}>Detener Contador</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={this.reiniciarTiempoTotal} style={[styles.button, styles.resetButton]}>
                            <Text style={styles.buttonText}>Reiniciar Tiempo Total</Text>
                        </TouchableOpacity>
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
    welcomeContainer: {
        marginTop: 50,  // Ajusta este valor para mover el recuadro de bienvenida hacia arriba
        marginBottom: 20,
        backgroundColor: 'rgba(218, 112, 214, 0.5)',
        padding: 25,
        borderRadius: 20,
        alignItems: 'center',
    },
    welcomeText: {
        color: 'black',
        fontSize: 16,
    },
    counterContainer: {
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 25,
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
        fontSize: 15,
        marginBottom: 30,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    startButton: {
        backgroundColor: '#20B2AA',
    },
    pauseButton: {
        backgroundColor: 'orange',
    },
    resumeButton: {
        backgroundColor: 'green',
    },
    stopButton: {
        backgroundColor: 'red',
    },
    resetButton: {
        backgroundColor: 'gray',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});





