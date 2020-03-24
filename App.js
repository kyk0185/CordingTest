import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Users from './src/component/Users';
import { AppLoading } from 'expo';

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { fontLoad: false, posts: [] }
  }
  componentDidMount = async () => {
    await Font.loadAsync({
      'NotoSansCJKkrRegular': require('./src/assets/font/NotoSansCJKkr-Regular.otf'),
      'NotoSansCJKkrBold': require('./src/assets/font/NotoSansCJKkr-Bold.otf'),
      'NanumPen': require('./src/assets/font/NanumPen.ttf'),
    })
    this.setState({ fontLoad: true })
  }

  render() {
    if (!this.state.fontLoad) {
      return (
        <AppLoading />
      )
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Users" component={Users} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


