import React from 'react';
import {View} from 'react-native';
import Converter from './converter';

const WeightConverter = props => {
  const sampleData = [
    {label: 'g', value: 'g'},
    {label: 'mg', value: 'mg'},
    {label: 'kg', value: 'kg'},
    {label: 'mt', value: 'mt'},
    {label: 'lb', value: 'lb'},
  ];

  return (
    <View>
      <Converter entity={'weight'} sampleData={sampleData} />
    </View>
  );
};

export default WeightConverter;
