import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS} from '../assets/colors';
import CurrencyConverter from '../components/currencyConverter';
import LengthConverter from '../components/lengthConverter';
import SelectEntity from '../components/selectEntity';
import TemperatureConverter from '../components/temperatureConverter';
import WeightConverter from '../components/weightConverter';

const WelcomeScreen = props => {
  const {isEnabled, setKeyFunc, entityKey} = props;

  const styles = StyleSheet.create({
    container: {
      padding: '5%',
      marginTop: '5%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 21,
      fontFamily: 'Comfortaa-Regular',
      color: isEnabled ? COLORS.brightYellow : COLORS.darkBlue,
    },
  });

  return (
    <View style={styles.container}>
      {/* <SelectEntity isEnabled={isEnabled} /> */}
      {(() => {
        switch (entityKey) {
          case 'Length':
            return <LengthConverter />;
          case 'Weight':
            return <WeightConverter />;
          case 'Temperature':
            return <TemperatureConverter />;
          case 'Currency':
            return <CurrencyConverter />;
          default:
            return (
              <View>
                <Text style={styles.text}>
                  Hi!! What would you like to convert?
                </Text>
                <SelectEntity isEnabled={isEnabled} setKeyFunc={setKeyFunc} />
              </View>
            );
        }
      })()}
    </View>
  );
};

export default WelcomeScreen;
