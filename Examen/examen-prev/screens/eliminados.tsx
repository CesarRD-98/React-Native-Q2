import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { usePlatillosContext } from '../providers/platilloProvider'

export default function Eliminados() {

  const { platillosEliminados } = usePlatillosContext()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Platillos eliminados</Text>
      <FlatList
        data={platillosEliminados}
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
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4e6',
    padding: 8
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 8,
    textAlign: 'center',
    color: '#a50036'
  },
  card: {
    padding: 8,
    backgroundColor: '#fff',
    margin: 6,
    borderRadius: 4
  }
});