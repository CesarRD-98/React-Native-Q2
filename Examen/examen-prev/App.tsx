import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import TabNav from './components/tabNav';
import { StackActions } from '@react-navigation/native';
import PlatilloProvider from './providers/platilloProvider';
import Inicio from './screens/inicio';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <PlatilloProvider>
          <TabNav></TabNav>
        </PlatilloProvider>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
