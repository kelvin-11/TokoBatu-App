import { StyleSheet, SafeAreaView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, ROUTES } from '../../constants';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace(ROUTES.HOME_CLICK);
    }, 2000);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/logo1.png')}
        style={styles.logo} />
    </SafeAreaView>
  )
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.black,
  },
  logo: {
    width: 300,
    height: 300,
  }
})