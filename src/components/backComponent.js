import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
// import {BackButton} from '../assets/images/back_button.jpeg';

const BackComponent = props => {
  const {setKeyFunc} = props;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      height: '2%',
      width: '2%',
    },
    img: {
      height: 40,
      width: 40,
      position: 'absolute',
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setKeyFunc('home');
      }}>
      <Image
        style={styles.img}
        source={require('../assets/images/back_button.jpeg')}
      />
    </TouchableOpacity>
  );
};

export default BackComponent;
