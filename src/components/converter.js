/**
 * * This component will convert the input to desired inputUnit
 */
import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS} from '../assets/colors';

const Converter = props => {
  const {sampleData} = props;

  const initialInputUnit = sampleData[0].value;
  const initialOutputUnit = sampleData[0].value;

  const [inputNum, setInputNum] = useState();
  const [resultNum, setResultNum] = useState(null * 100);
  const [inputUnit, setInputUnit] = useState(initialInputUnit);
  const [outputUnit, setOutputUnit] = useState(initialOutputUnit);

  /**
   * * calling convertInputNum() only when input unit has updated and stored
   * * after setInputUnit operation
   */
  useEffect(() => {
    convertInputNum(inputNum);
  }, [inputUnit]);

  /**
   * * calling convertInputNum() only when output unit has updated and stored
   * * after setOutputUnit operation
   */
  useEffect(() => {
    convertInputNum(inputNum);
  }, [outputUnit]);

  const convertInputNum = newNum => {
    let temp = -10;
    // console.log('Unit ', inputUnit);
    // console.log('Input ', newNum);

    // * checking if the input number is valid or not
    if (isNaN(newNum)) {
      setResultNum(0.0);
      return;
    }

    /**
     * * common switch case is used for length, temperature and weight
     * * as all unit symbols are different hence no need to create
     * * separate functions for each entity.
     */
    switch (inputUnit) {
      // * convert input temperature to F for common conversion.
      case 'F':
        temp = newNum;
        break;
      case 'C':
        temp = newNum * (9 / 5) + 32;
        break;
      case 'K':
        temp = (newNum - 273.15) * (9 / 5) + 32;
        break;

      // * convert input length to mtrs.
      case 'mm':
        temp = newNum * 0.001;
        break;
      case 'cm':
        temp = newNum * 0.01;
        break;
      case 'm':
        temp = newNum;
        break;
      case 'km':
        temp = newNum * 1000;
        break;
      case 'in':
        temp = newNum * 0.0254;
        break;
      case 'ft':
        temp = newNum * 0.3048;
        break;
      case 'yd':
        temp = newNum * 0.9144;
        break;
      case 'mi':
        temp = newNum * 1609.34;
        break;

      // * convert input weight to grams
      case 'g':
        temp = newNum;
        break;
      case 'mg':
        temp = newNum * 0.001;
        break;
      case 'kg':
        temp = newNum * 1000;
        break;
      case 'mt':
        temp = newNum * 1000000;
        break;
      case 'lb':
        temp = newNum * 453.6;
        break;
    }
    switch (outputUnit) {
      // * convert F to output temperature unit.
      case 'F':
        temp = temp;
        break;
      case 'C':
        temp = (temp - 32) * (5 / 9);
        break;
      case 'K':
        temp = (temp - 32) * (5 / 9) + 273.15;
        break;

      // * convert mtrs to output length unit.
      case 'mm':
        temp = temp * 1000;
        break;
      case 'cm':
        temp = temp * 100;
        break;
      case 'm':
        temp = temp;
        break;
      case 'km':
        temp = temp * 0.001;
        break;
      case 'in':
        temp = temp * 39.37;
        break;
      case 'ft':
        temp = temp * 3.281;
        break;
      case 'yd':
        temp = temp * 1.094;
        break;
      case 'mi':
        temp = temp * 0.000621371;
        break;

      // * convert grams to output weight unit.
      case 'g':
        temp = temp;
        break;
      case 'mg':
        temp = temp * 1000;
        break;
      case 'kg':
        temp = temp * 0.001;
        break;
      case 'mt':
        temp = temp / 1000000.0;
        break;
      case 'lb':
        temp = temp / 453.6;
        break;
    }
    // console.log('Result ', outputUnit);
    temp = +temp;
    setResultNum(temp.toFixed(3));
  };

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
            setInputNum(newNum);
            convertInputNum(newNum);
            // console.log(newNum);
          }}
          value={inputNum}
          placeholder="0"
        />
        <Dropdown
          style={{backgroundColor: COLORS.beige, height: 40, width: 70}}
          data={sampleData}
          labelField="label"
          valueField="value"
          value={inputUnit}
          onChange={item => {
            // console.log(item);
            setInputUnit(item.value);
            // convertInputNum(inputNum);
          }}
        />
      </View>
      <View style={styles.container_two}>
        <Text style={styles.textInput}>{resultNum}</Text>
        <Dropdown
          style={{backgroundColor: COLORS.beige, height: 40, width: 70}}
          data={sampleData}
          labelField="label"
          valueField="value"
          value={outputUnit}
          dropdownPosition="bottom"
          onChange={item => {
            // console.log(item.value + ' ' + typeof item.value);
            setOutputUnit(item.value);
            // convertInputNum(inputNum);
          }}
        />
      </View>
    </View>
  );
};

export default Converter;
