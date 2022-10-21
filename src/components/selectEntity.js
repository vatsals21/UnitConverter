/**
 * This component contains the buttons that will take the user to respective
 * converter screen.
 */
import {Button} from '@react-native-material/core';
import React from 'react';
import {Text, FlatList, StyleSheet, View} from 'react-native';
import {COLORS} from '../assets/colors';

const SelectEntity = props => {
  const {isEnabled, setKeyFunc} = props;
  const ENTITY = [
    {
      id: 1,
      title: 'Length',
    },
    {
      id: 2,
      title: 'Weight',
    },
    {
      id: 3,
      title: 'Temperature',
    },
    {
      id: 4,
      title: 'Currency',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20%',
    },
    buttonContainer: {
      flex: 1,
      marginTop: '30%',
    },
    button: {
      color: isEnabled ? COLORS.lightyellow : COLORS.brightYellow,
    },
    buttonText: {
      fontFamily: 'Comfortaa-Regular',
      fontWeight: '600',
      fontSize: 15,
    },
  });

  const renderItem = ({item}) => (
    <View style={styles.buttonContainer}>
      <Button
        title={item.title}
        onPress={() => {
          console.log(item.title);
          setKeyFunc(item.title);
        }}
        titleStyle={styles.buttonText}
        color={styles.button.color}
        tintColor={COLORS.darkBlue}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ENTITY}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default SelectEntity;
