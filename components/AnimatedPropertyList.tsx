import { usePropertyStore } from '@/store/propertyStore'; // <-- import your Zustand store
import React, { FC, useEffect, useRef } from 'react';
import { Animated, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Typo from './Typo';

type Property = {
  id: string;
  title: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  features: string[];
  images: string[];
};

type Props = {
  properties: Property[];
};

/**
 * AnimatedPropertyList is a component that displays a list of properties.
 * It uses animation to fade in the properties when the component is mounted.
 * Each property is displayed as a card with an image, title, price, address, and features.
 * The component also includes a "Remove" button that removes the property from the list when pressed.
 * @param properties The list of properties to display.
 * @returns A JSX element that displays the list of properties.
 */
const AnimatedPropertyList: FC<Props> = ({ properties }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const removeProperty = usePropertyStore((state) => state.removeProperty); // <-- get removeProperty

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderItem = ({ item }: { item: Property }) => (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <FlatList
        data={item.images}
        horizontal
        keyExtractor={(_, idx) => idx.toString()}
        showsHorizontalScrollIndicator={false}
        style={styles.imageScroll}
        renderItem={({ item: img }) => (
          <Image source={{ uri: img }} style={styles.image} resizeMode="cover" />
        )}
      />
      <View style={styles.headerRow}>
        <Typo style={styles.title}>{item.title}</Typo>
        <TouchableOpacity onPress={() => removeProperty(item.id)} style={styles.removeBtn}>
          <Typo style={styles.removeBtnText}>Remove</Typo>
        </TouchableOpacity>
      </View>
      <Typo style={styles.price}>${item.price}/mo</Typo>
      <Typo style={styles.address}>
        {item.location.address}, {item.location.city}, {item.location.state}
      </Typo>
      <View style={styles.features}>
        {item.features.map((feature, idx) => (
          <View key={idx} style={styles.featureBadge}>
            <Typo style={styles.featureText}>{feature}</Typo>
          </View>
        ))}
      </View>
    </Animated.View>
  );

  return (
    <FlatList
      data={properties}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 12 }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#18181b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  removeBtn: {
    backgroundColor: '#ff5252',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 10,
  },
  removeBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageScroll: {
    marginBottom: 10,
  },
  image: {
    width: 160,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#222',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#00bcd4',
    marginBottom: 2,
  },
  address: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 6,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  featureBadge: {
    backgroundColor: '#27272a',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 6,
  },
  featureText: {
    fontSize: 13,
    color: '#fff',
  },
});

export default AnimatedPropertyList;