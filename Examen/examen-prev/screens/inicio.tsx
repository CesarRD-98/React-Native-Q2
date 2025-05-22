import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native'
import React from 'react'
import { usePlatillosContext } from '../providers/platilloProvider';

export default function Inicio() {

    const { platillos, agregarPlatillo } = usePlatillosContext()

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Menú de platillos</Text>
                <FlatList
                    data={platillos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 18
                            }}>{item.nombrePlato}</Text>
                            <Text style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                marginBottom: 4,
                                fontSize: 14
                            }}>L.{item.precio}</Text>
                            <Button title='Agregar platillo' onPress={() => {
                                Alert.alert('Acción', 'Platillo agregado exitosamente')
                                agregarPlatillo(item)
                            }}/>
                        </View>
                    )}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dff2fe',
        padding: 8
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 8,
        textAlign: 'center',
        color: '#00598a'
    },
    card: {
        padding: 8,
        backgroundColor: '#fff',
        margin: 6,
        borderRadius: 4
    }
});