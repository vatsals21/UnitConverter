import React from 'react';
import {View} from 'react-native';
import Converter from './converter';

const LengthConverter = props => {
  const sampleData = [
    {label: 'mm', value: 'mm'},
    {label: 'cm', value: 'cm'},
    {label: 'm', value: 'm'},
    {label: 'km', value: 'km'},
    {label: 'in', value: 'in'},
    {label: 'ft', value: 'ft'},
    {label: 'yd', value: 'yd'},
    {label: 'mi', value: 'mi'},
  ];

  return (
    <View>
      <Converter entity={'length'} sampleData={sampleData} />
    </View>
  );
};

export default LengthConverter;
