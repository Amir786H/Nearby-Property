import { colors, spacingX, spacingY } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { FC } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  property: Property;
};

const PropertyCard: FC<Props> = ({ property }) => {

  const router = useRouter();
  const handleNavigation = () => {
    // navigate to property details screen
    router.push({
      pathname: '../(modals)/propertyModal',
      params: { property: JSON.stringify(property) }
    });
  }

  return (
    <View style={styles.card}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
        {property.images.map((img, idx) => (
          <TouchableOpacity key={idx} onPress={handleNavigation}>
            <Image
              source={{ uri: img }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.title}>{property.title}</Text>
      <Text style={styles.price}>${property.price}/mo</Text>
      <Text style={styles.address}>
        {property.location.address}, {property.location.city}, {property.location.state}
      </Text>
      <View style={styles.features}>
        {/* {property.features.map((feature, idx) => (
          <View key={idx} style={styles.featureBadge}>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral800 || '#fff',
    borderRadius: 12,
    padding: spacingX._15 || 15,
    marginBottom: spacingY._10 || 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  imageScroll: {
    marginBottom: spacingY._10 || 10,
  },
  image: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral100 || '#222',
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary || '#007AFF',
    marginBottom: 2,
  },
  address: {
    fontSize: 14,
    color: colors.neutral400 || '#666',
    marginBottom: 6,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  featureBadge: {
    backgroundColor: colors.neutral700 || '#eee',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  featureText: {
    fontSize: 12,
    color: colors.neutral200 || '#333',
  },
});

export default PropertyCard;