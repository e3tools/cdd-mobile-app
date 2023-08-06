import React, { useContext, useEffect, useState } from 'react';

import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import styles from './TForm.style'; 


// import { Controller, useForm } from 'react-hook-form';
// import { HStack } from 'native-base';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import * as SecureStore from 'expo-secure-store';

const t = require('tcomb-form-native');

const { Form } = t.form;
let options = {
  fields: {
    birthDate: {
      mode: 'date'
    }
  }
}
let Person = t.struct({
  name: t.String,              
  surname: t.maybe(t.String),  
  age: t.Number,
  // birthDate: t.Date,
  rememberMe: t.Boolean
});


function TForm() {

  const onPress = () => {
      console.log("ist");
  }

  return (
    <View style={styles.container}>
        {/* <Form
          // ref="form"
          type={Person}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight> */}
        <Text style={styles.buttonText}>Save</Text>
    </View>
  );
}

export default TForm;
