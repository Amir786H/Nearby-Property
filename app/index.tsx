import { colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import '../global.css';

// import { verifyInstallation } from 'nativewind';
// verifyInstallation();

const index = () => {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push('/(tabs)')
        }, 2000);
    },[])
  return (
    <View style={styles.container}>
        <Image 
            source={require('../assets/images/RealEstate.png')}
            style={styles.logo}
            resizeMode='contain'
            />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.neutral900,
    },
    logo: {
        height: "40%",
        aspectRatio: 1,
    }
})