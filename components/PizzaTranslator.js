/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';

const PizzaTranslator = () => {
  const [text, setText] = useState('');

  return (
    <View style={{padding: 10}}>
      <TextInput
        style={{heigth: 40}}
        placeholder="Type here to translator"
        // eslint-disable-next-line no-shadow
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text style={{padding: 20, fontSize: 42}}>
        {text
          .split(' ')
          .map(word => word && '🍕')
          .join(' ')}
      </Text>
    </View>
  );
};
export default PizzaTranslator;
