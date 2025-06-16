import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Header from '@/components/Header'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import useRequestLocationPermission from '@/hooks/useRequestLocationPermission'
import { scale, verticalScale } from '@/utils/styling'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { usePropertyStore } from '@/store/propertyStore'

const AnimatedFeatures: FC<{ features: string[], title: string }> = ({ features, title }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.featuresContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Typo size={18} fontWeight={'700'}
        style={[styles.featuresTitle, { color: colors.primary || '#007AFF' }]}
      >
        {title}
      </Typo>
      <Typo style={styles.featuresTitle}>Features</Typo>
      <View style={styles.featuresList}>
        {features.map((feature, idx) => (
          <Animated.View
            key={idx}
            style={[
              styles.featureBadge,
              {
                opacity: fadeAnim,
                transform: [{ scale: fadeAnim }],
              },
            ]}
          >
            <Typo style={styles.featureText}>{feature}</Typo>
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );
};


const propertyModal = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const status = useRequestLocationPermission();
  const { property } = useLocalSearchParams();
  const propertyData = property ? JSON.parse(property as string) : null;
  // console.log('propertyData:  ', propertyData);

  const addProperty = usePropertyStore((state) => state.addProperty);

  const onBookProperty = async () => {
    // Add state management logic here: Zustand
    setLoading(true);
    if (propertyData) {
      addProperty(propertyData); // Add to the array
      // e.g., router.push('/confirmation');
    }
    setLoading(false);
  }


  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title="Property Details"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        {/* Todo : show property details */}
        <MapView
          style={{ height: verticalScale(300), width: '100%', bottom: spacingY._50 }}
          initialRegion={{
            latitude: propertyData?.location?.coordinates?.latitude || 37.78825,
            longitude: propertyData?.location?.coordinates?.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {propertyData?.location?.coordinates && (
            <Marker
              coordinate={{
                latitude: propertyData?.location?.coordinates?.latitude,
                longitude: propertyData?.location?.coordinates?.longitude,
              }}
              title={propertyData.title}
              description={propertyData.location.address}
            />
          )}
        </MapView>

        {propertyData?.features && <AnimatedFeatures features={propertyData?.features} title={propertyData?.title} />}
      </View>

      <View style={styles.footer}>
        <Button onPress={onBookProperty} loading={loading} style={{ flex: 1 }} >
          <Typo color={colors.black} fontWeight={"700"}>Book Property</Typo>
        </Button>
      </View>
    </ModalWrapper>
  )
}

export default propertyModal

const styles = StyleSheet.create({
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 50,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7
  },
  inputContainer: {
    gap: spacingY._15,
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacingY._10,
    // paddingVertical: spacingY._20,
  },
  featuresContainer: {
    // marginTop: 0,
    backgroundColor: '#18181b',
    bottom: spacingY._50,
    borderRadius: 14,
    padding: verticalScale(20),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureBadge: {
    backgroundColor: '#27272a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#fff',
  },
})