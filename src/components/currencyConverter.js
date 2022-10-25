import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS} from '../assets/colors';

const CurrencyConverter = props => {
  const [currencySymbol, setCurrencySymbol] = useState([]);
  const [inputNum, setInputNum] = useState(0);
  const [outputNum, setOutputNum] = useState(0);
  const [inputCurr, setInputCurr] = useState();
  const [outputCurr, setOutputCurr] = useState();
  const [isLoading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await axios.get(
        'https://api.apilayer.com/exchangerates_data/symbols',
        {
          headers: {
            apikey: 'HynEPEUuOZsEe2kLUHaZte6PtwHXJwDZ',
          },
        },
      );
      var result = response.data.symbols;
      result = Object.keys(result);
      var temp_arr = [];
      for (res in result) {
        temp_arr = [...temp_arr, {label: result[res], value: result[res]}];
      }
      setCurrencySymbol(temp_arr);
      setInputCurr(temp_arr[0].value);
      setOutputCurr(temp_arr[0].value);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const convertCurrr = async newNum => {
    if (isNaN(newNum) || newNum <= 0) {
      setOutputNum(0.0);
      return;
    }
    try {
      setLoading(true);
      const url =
        'https://api.apilayer.com/exchangerates_data/convert?to=' +
        outputCurr +
        '&from=' +
        inputCurr +
        '&amount=' +
        newNum;
      const response = await axios.get(url, {
        headers: {
          apikey: 'HynEPEUuOZsEe2kLUHaZte6PtwHXJwDZ',
        },
      });
      var result = response.data.result;
      console.log(result);
      result = +result;
      setOutputNum(result.toFixed(3));
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    convertCurrr(inputNum);
  }, [inputCurr]);

  useEffect(() => {
    convertCurrr(inputNum);
  }, [outputCurr]);

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
      {isLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <View>
          <View style={styles.container_two}>
            <TextInput
              style={styles.textInput}
              // * onChangeText is not a good option here
              // * as on every digit change, currency will try to change
              // * thus increasing latency and redundancy for same operation
              onChangeText={newNum => {
                setInputNum(newNum);
                convertCurrr(newNum);
              }}
              value={inputNum}
              placeholder="0"
            />
            <Dropdown
              style={{backgroundColor: COLORS.beige, height: 40, width: 90}}
              data={currencySymbol}
              labelField="label"
              valueField="value"
              value={inputCurr}
              onChange={item => {
                setInputCurr(item.value);
              }}
            />
          </View>
          <View style={styles.container_two}>
            <Text style={styles.textInput}>{outputNum}</Text>
            <Dropdown
              style={{backgroundColor: COLORS.beige, height: 40, width: 90}}
              data={currencySymbol}
              labelField="label"
              valueField="value"
              value={outputCurr}
              dropdownPosition="top"
              onChange={item => {
                setOutputCurr(item.value);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default CurrencyConverter;
