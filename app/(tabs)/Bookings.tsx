import AnimatedPropertyList from '@/components/AnimatedPropertyList';
import ScreenWrapper from '@/components/ScreenWrapper';
import { usePropertyStore } from '@/store/propertyStore';
import React from 'react';
import { StyleSheet } from 'react-native';

const Bookings = () => {
  const selectedProperties = usePropertyStore((state) => state.selectedProperties);
  // console.log('selectedProperties: ', selectedProperties);

  return (
    <ScreenWrapper>
      <AnimatedPropertyList properties={selectedProperties} />
    </ScreenWrapper>
  );
};

export default Bookings;

const styles = StyleSheet.create({});