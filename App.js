import React from 'react';
import {View, StyleSheet} from 'react-native';
import SectionListBasics from './components/SectionListBasics';

function App() {
  return (
    <View style={styles.container}>
      <SectionListBasics />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
