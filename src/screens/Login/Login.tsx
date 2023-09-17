import React, { useContext, useRef, useState } from 'react';
import {
  Keyboard,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';

import { Controller, useForm } from 'react-hook-form';
import { HStack } from 'native-base';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import styles from './Login.style';
import MESSAGES from '../../utils/formErrorMessages';
import { emailRegex, passwordRegex } from '../../utils/formUtils';
import AuthContext from '../../contexts/auth';
import API from '../../services/API';
import moment from 'moment';
import { Button } from 'react-native';
var t = require('tcomb-form-native');

var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  age: t.Number,               // a required number
  rememberMe: t.Boolean ,       // a boolean
  gender: t.enums({M: 'Male', F: 'Female'}, 'gender'),
  birthday: t.Date
}); 
const options = {
    fields: {
      birthday: {
        mode: 'date',
        config: {
          format: (date) => moment(date).format('YYYY-mm-d'),
        }, 
      }
    }
};


async function save(key, value) {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

function getInitialState() {
  const value = {};
  return { value, type: this.getType(value) };
}

function onChange(value) {
  // recalculate the type only if strictly necessary
  const type = value.gender !== this.state.value.gender ?
    this.getType(value) :
    this.state.type;
  this.setState({ value, type });
}

function Login() {
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const form = useRef(null);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };
  return (
    <ScrollView
      style={{
        backgroundColor: 'white',
        paddingBottom: 30,
        paddingHorizontal: 30,
      }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'space-between',
        }}
        contentContainerStyle={{ flex: 1, justifyContent: 'space-evenly' }}
        behavior="position"
      >
        <View
          style={{
            marginBottom: 50,
            marginTop: 70,
            alignItems: 'center',
            justifyContent: 'flex-end',
            flex: 0.5,
          }}
        >
          <Image
            style={{ height: 230, width: 230, marginBottom: 20 }}
            resizeMode="contain"
            source={require('../../../assets/cdd-logo.png')}
          />
          <Text
            style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 19,
              lineHeight: 22,
              letterSpacing: 0,
              textAlign: 'center',
              color: '#24c38b',
            }}
          >
            Bienvenu! Accédez à votre compte ici
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View
              style={{
                backgroundColor: 'white',
              }}
            >
              <KeyboardAvoidingView
                style={{
                  backgroundColor: 'white',
                }}
                behavior="padding"
              >
                 <View>
         {/* The button that used to trigger the date picker */}
    <Text>ddd</Text>

                  {/* display */}
                  <Form
                    ref={form}
                    type={Person}
                    options={options}
                  />

                </View>
              </KeyboardAvoidingView>
            
            </View>

            <View />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default Login;
