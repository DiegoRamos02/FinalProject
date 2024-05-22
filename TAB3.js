import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';

export default class Usuario3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mensajes: [],
            cargando: true
        };
    }

    componentDidMount() {
        fetch('https://finalxd.000webhostapp.com/get_anuncios.php')
            .then(response => response.json())
            .then(data => {
                this.setState({ mensajes: data, cargando: false });
            })
            .catch(error => {
                console.error('Error al obtener los mensajes:', error);
                this.setState({ cargando: false });
            });
    }

    render() {
        const { mensajes, cargando } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={require('./assets/newFond.jpeg')} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                    {/* Contenedor para el título */}
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 35,
                            backgroundColor: 'rgba(225, 185, 250, 1)', 
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 10,
                            textAlign: 'center'
                        }}>
                            Próximos eventos...
                        </Text>
                    </View>
                    {/* Contenedor para los mensajes */}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {cargando ? (
                            <Text style={{ color: 'black', fontSize: 20 }}>Cargando...</Text>
                        ) : (
                            <View>
                                {mensajes.map((mensaje, index) => (
                                    <Text key={index} style={{
                                        color: 'black',
                                        fontSize: 20,
                                        backgroundColor: 'rgba(218, 112, 214, 0.5)',
                                        padding: 15,
                                        margin: 5,
                                        borderRadius: 25,
                                        textAlign: 'auto'
                                    }}>{mensaje.texto}</Text>
                                ))}
                                {mensajes.length === 0 && (
                                    <Text style={{ color: 'black', fontSize: 20 }}>No hay mensajes disponibles</Text>
                                )}
                            </View>
                        )}
                    </View>
                </ImageBackground>
            </View>
        );
    }
}