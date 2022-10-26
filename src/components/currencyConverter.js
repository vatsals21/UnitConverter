import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS} from '../assets/colors';

const CurrencyConverter = props => {
  const {isEnabled} = props;

  // * currencySymbol array will store all the available currencies
  const [currencySymbol, setCurrencySymbol] = useState([]);
  const [inputNum, setInputNum] = useState(0);
  const [outputNum, setOutputNum] = useState(0);
  const [inputCurr, setInputCurr] = useState();
  const [outputCurr, setOutputCurr] = useState();
  const [isLoading, setLoading] = useState(true);

  /**
   * This is an async function which will get all the currencies through
   * the api, the function will be called during the rendering of the
   * currencyConverter component
   */
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

  /**
   * convertCurr will convert the amount to desired currency
   * using the api and the values passed
   */
  const convertCurr = async newNum => {
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
    convertCurr(inputNum);
  }, [inputCurr]);

  useEffect(() => {
    convertCurr(inputNum);
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
    loadingText: {
      color: isEnabled ? COLORS.white : COLORS.black,
    },
    button: {
      marginTop: '-10%',
    },
  });

  /**
   * Using terneary operator below to determine which View to render
   */
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color={COLORS.green} />
          <Text style={styles.loadingText}>Loading Data......</Text>
        </View>
      ) : (
        <View>
          <View style={styles.container_two}>
            <TextInput
              style={styles.textInput}
              onChangeText={newNum => {
                setInputNum(newNum);
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
          <Button
            style={styles.button}
            title="Convert"
            onPress={() => {
              /**
               * The inputNum variable is an string object
               * Converting it to Number first and then calling the
               * convertCurr function
               */
              convertCurr(Number(inputNum.valueOf()));
            }}
            color={COLORS.green}
          />
        </View>
      )}
    </View>
  );
};

export default CurrencyConverter;
