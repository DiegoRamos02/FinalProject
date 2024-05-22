import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      pin: ''
    };
  }

  entrar = () => {
    const { codigo, pin } = this.state;
    let _this = this;
    var http = new XMLHttpRequest();
    var url = 'http://148.202.152.33/cucei/autentificacion_siauu_temporal.php';
    var params = 'codigo=' + encodeURIComponent(codigo) + '&nip=' + encodeURIComponent(pin);

    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        console.log('Respuesta del servidor:', http.responseText);
        if (http.responseText == '0') {
          Alert.alert('Datos incorrectos');
        } else {
          const responseArray = http.responseText.split(','); // Ajusta según el delimitador real
          const tercerDato = responseArray[2] ? responseArray[2].trim() : 'N/A';
          _this.props.navigation.navigate("ManejoTabs", { userData: { nombre: tercerDato } });
        }
      }
    };




    http.send(params);
  }

  render() {
    return (
      <View>
        <ImageBackground source={require('./assets/CuceiTimer.png')} style={{ width: '100%', height: '100%' }} blurRadius={0}>
          <View style={{ marginTop: 200 }}>
            <TextInput
              style={{
                color: 'white',
                backgroundColor: '#8395a7',
                borderColor: 1,
                borderWidth: 1,
                borderRadius: 20,
                paddingLeft: 10,
                marginTop: 250,
                width: 300,
                height: 60,
                alignSelf: 'center',
              }}
              placeholder='Código'
              placeholderTextColor='white'
              onChangeText={codigo => this.setState({ codigo })}
              value={this.state.codigo}
            />
            <TextInput
              style={{
                color: 'white',
                backgroundColor: '#8395a7',
                borderColor: 1,
                borderWidth: 1,
                borderRadius: 20,
                paddingLeft: 10,
                marginTop: 20,
                width: 300,
                height: 60,
                alignSelf: 'center',
              }}
              placeholder='Contraseña'
              placeholderTextColor='white'
              onChangeText={pin => this.setState({ pin })}
              value={this.state.pin}
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#2c3e50',
                width: 200,
                height: 60,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 60,
                alignSelf: 'center',
              }}
              onPress={this.entrar}>
              <Text style={{ color: 'white', fontWeight: '700' }}>Iniciar Sesión</Text>
              <Icon name="login-variant" size={18} color="white" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}