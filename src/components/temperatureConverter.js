import React from 'react';
import {View} from 'react-native';
import Converter from './converter';

const TemperatureConverter = props => {
  const sampleData = [
    {label: 'F', value: 'F'},
    {label: 'C', value: 'C'},
    {label: 'K', value: 'K'},
  ];

  return (
    <View>
      <Converter entity={'temp'} sampleData={sampleData} />
    </View>
  );
};

export default TemperatureConverter;
