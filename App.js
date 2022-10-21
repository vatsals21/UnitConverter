/**
 * App.js is the starting point for the react-native app
 * Main screens will be called here.
 */

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import {COLORS} from './src/assets/colors';
import BackComponent from './src/components/backComponent';
import WelcomeScreen from './src/screens/welcomeScreen';

const App = () => {
  // const Stack=createNativeStackNavigator();
  // * isEnabled state will keep track of dark mode.
  const [isEnabled, setIsEnabled] = useState(false);
  const [entityKey, setEntityKey] = useState(1);

  // * toggleSwicth func will change the value of the isEnabled state
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  /**
   * setKeyFunc is a callback function which will set the entity key
   * variable that renders the coresponding component using switch case
   */
  const setKeyFunc = key => {
    setEntityKey(key);
  };

  const styles = StyleSheet.create({
    container: {
      padding: '2%',
      marginTop: '1%',
      marginRight: '1%',
      marginBottom: '1%',
      marginLeft: '1%',
      borderRadius: 20,
      backgroundColor: isEnabled ? COLORS.darkBlue : COLORS.lighBlue,
      flex: 1,
    },
    container_two: {
      flexDirection: 'row',
    },
    switch: {
      // height: '5%',
      // width: '5%',
      position: 'absolute',
      right: 5,
      top: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <BackComponent setKeyFunc={setKeyFunc} />
        <Switch
          style={styles.switch}
          trackColor={{true: COLORS.blue, false: COLORS.lightGrey}}
          thumbColor={isEnabled ? COLORS.brightYellow : COLORS.darkGrey}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <WelcomeScreen
        setKeyFunc={setKeyFunc}
        entityKey={entityKey}
        isEnabled={isEnabled}
      />
    </View>
  );
};

export default App;
