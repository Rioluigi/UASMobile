/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import React from 'react';
import {Link} from '@react-navigation/native';

const StartScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C62E2E',
      }}>
      <View>
        <Image
          source={require('../assets/bg.jpeg')}
          style={{width: 420, height: 620, bottom: 18}}
        />
        <Text
          style={{
            fontSize: 34,
            color: 'white',
            bottom: 10,
            paddingHorizontal: 30,
            textAlign: 'center',
            fontFamily: 'fantasy',
          }}>
          Wings so good, your taste buds will love it.
        </Text>
        <Text
          style={{
            color: '#A9A9A9',
            textAlign: 'center',
            marginTop: 20,
            bottom: 25,
          }}>
          The best grain, the finest roast, the powerful flavor.
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#FF9100',
          width: 315,
          height: 62,
          borderRadius: 16,
          padding: 18,
          bottom: 10,
        }}>
        <Link
          to="/Login"
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '600',
          }}>
          Get Started
        </Link>
      </View>
    </View>
  );
};

export default StartScreen;
