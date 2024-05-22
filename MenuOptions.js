import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuOptions = ({ onOptionSelect, onClose, onLogout }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.option} onPress={() => onOptionSelect('Usuario1')}>
                <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
                <Text style={styles.optionText}>Contador</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => onOptionSelect('Usuario2')}>
                <MaterialCommunityIcons name="chart-bar" size={24} color="black" />
                <Text style={styles.optionText}>Total</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => onOptionSelect('Usuario3')}>
                <MaterialCommunityIcons name="newspaper" size={24} color="black" />
                <Text style={styles.optionText}>Anuncios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={onLogout}>
                <MaterialCommunityIcons name="logout" size={24} color="black" />
                <Text style={styles.optionText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={onClose}>
                <MaterialCommunityIcons name="cancel" size={24} color="black" />
                <Text style={styles.optionText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        marginLeft: 20,
        marginTop: 60,
        top: 0,
        width: '90%',
        backgroundColor: 'rgba(274, 172, 215, 1)', // Color de fondo semitransparente
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(109, 163, 207, 0.8)', // Mismo color que el fondo para la línea inferior
        zIndex: 1,
        borderRadius: 1,
        backdropFilter: 'blur(15px)', // Propiedad de CSS para difuminar
        webkitBackdropFilter: 'blur(15px)', // Prefijo para navegadores basados en WebKit (como Safari)
    },
    option: {
        padding: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
        borderColor: 'white',
    },
    optionText: {
        fontSize: 18,
        color: 'black',
    },
});


export default MenuOptions;