import { View, Text, TextInput, FlatList, StyleSheet, Alert, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { usePlatillosContext } from '../providers/platilloProvider'

export default function RealizarPedido() {

  const [nombre, setNombre] = useState<string>('')
  const [total, setTotal] = useState<number>(0)
  const { platillosAgregados, eliminarPlatillo } = usePlatillosContext()

  useEffect(() => {
    const nuevoTotal = platillosAgregados.reduce((totalAcumulado, p) => totalAcumulado + p.precio, 0)
    setTotal(nuevoTotal)
  }, [platillosAgregados])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmar Pedido</Text>
      <TextInput
        style={styles.input}
        placeholder='Ingrese su nombre'
        value={nombre}
        onChangeText={setNombre}
      />
      <FlatList
        data={platillosAgregados}
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
            <Button title='Eliminar platillo' onPress={() => {
              Alert.alert('Acción', 'Platillo eliminado')
              eliminarPlatillo(item)
            }}></Button>
          </View>
        )}
      />


      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Subtotal: L.{total}</Text>

      <Button title='Confirmar compra' onPress={() => {
        if (nombre.trim()) {
          Alert.alert('Compra realizada correctamente ', nombre + ', su total a pagar es L.' + total)
          setNombre('')
        } else {
          Alert.alert('Acción', 'El campo nombre es obligatorio')
        }
      }} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcfce7',
    padding: 8
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 8,
    textAlign: 'center',
    color: '#016630'
  },
  card: {
    padding: 8,
    backgroundColor: '#fff',
    margin: 6,
    borderRadius: 4
  },
  input: {
    backgroundColor: '#fafafa',
    borderRadius: 4,
    height: 40,
    marginHorizontal: 6,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 16,
    borderColor: '#016630',
    borderWidth: 1
  }
});