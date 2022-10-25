import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS} from '../assets/colors';

const CurrencyConverter = props => {
  const [currencySymbol, setCurrencySymbol] = useState([]);

  useEffect(() => {
    axios
      // .get('https://api.adviceslip.com/advice/201')
      .get('https://api.apilayer.com/exchangerates_data/symbols', {
        // method: 'GET',
        // redirect: 'follow',
        headers: {
          apikey: 'HynEPEUuOZsEe2kLUHaZte6PtwHXJwDZ',
        },
      })
      .then(response => {
        console.log(response);
        // const res = response.data.symbols;
        console.log('HELLO');
        // console.log(res);
      })
      .catch(error => {
        console.log('HELLO - 2');
        console.log(error);
      });
    console.log('HELLO - 3');
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '40%',
    },
    container_two: {
      flex: 1,
      flexDirection: 'row',
      marginTop: '5%',
    },
    textInput: {
      backgroundColor: COLORS.beige,
      height: 40,
      width: 250,
      color: COLORS.black,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.container_two}>
        <TextInput
          style={styles.textInput}
          onChangeText={newNum => {
            console.log(newNum);
          }}
          placeholder="0"
        />
        <Dropdown
          style={{backgroundColor: COLORS.beige, height: 40, width: 70}}
          data={currencySymbol}
          labelField="label"
          valueField="value"
          // value={inputUnit}
          onChange={item => {
            // console.log(item);
          }}
        />
      </View>
      <View style={styles.container_two}>
        <Text style={styles.textInput}>12</Text>
        <Dropdown
          style={{backgroundColor: COLORS.beige, height: 40, width: 70}}
          data={currencySymbol}
          labelField="label"
          valueField="value"
          // value={outputUnit}
          dropdownPosition="bottom"
          onChange={item => {}}
        />
      </View>
    </View>
  );
};

export default CurrencyConverter;
