import Loading from '@/components/Loading';
import PropertyCard from '@/components/PropertyCard';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { useProfile, useProperties } from '@/hooks/useProperties'; // adjust path as needed
import { verticalScale } from '@/utils/styling';
import * as Icons from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const { data, isLoading, error } = useProperties();
  const { data: profile} = useProfile();

  const [search, setSearch] = useState('');
  const [searchFlag, setSearchFlag] = useState(false);
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    if (data) setFiltered(data);
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <Typo>Error loading properties</Typo>;
  // list properties available nearby using the stack query api call

  const handleSearch = (text: string) => {
    setSearch(text);
    if (!text) {
      setFiltered(data);
      return;
    }
    const lower = text.toLowerCase();
    setFiltered(
      data?.filter(
        (property: any) =>
          property.title.toLowerCase().includes(lower) ||
          property.location?.address?.toLowerCase().includes(lower) ||
          property.location?.city?.toLowerCase().includes(lower) ||
          property.location?.state?.toLowerCase().includes(lower)
      ) || []
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ gap: 4 }}>
            <Typo size={16} color={colors.neutral400}>Hello,</Typo>
            <Typo size={20} fontWeight={'500'}>{profile?.name}</Typo>
          </View>

          <TouchableOpacity style={styles.searchIcon} onPress={() => setSearchFlag(!searchFlag)}>
            <Icons.MagnifyingGlass
              size={verticalScale(22)}
              color={colors.neutral200}
              weight='bold'
            />
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        <View style={{ marginBottom: 12 }}>
          {searchFlag && (
            <View
              style={{
                backgroundColor: colors.neutral700,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12,
                height: 44,
              }}
            >
              <Icons.MagnifyingGlass size={20} color={colors.neutral400} />
              <TextInput
                value={search}
                onChangeText={handleSearch}
                placeholder="Search properties..."
                placeholderTextColor={colors.neutral400}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: colors.neutral100,
                  marginLeft: 8,
                  fontSize: 16,
                }}
              />
            </View>
          )}
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          {filtered?.map((property: any) => (
            <PropertyCard key={property?.id} property={property} />
          ))}
        </ScrollView>

      </View>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    marginTop: verticalScale(8),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacingY._10,
  },
  searchIcon: {
    backgroundColor: colors.neutral700,
    padding: spacingX._10,
    borderRadius: 50,
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: 'absolute',
    bottom: verticalScale(30),
    right: verticalScale(30),
  },
  scrollViewStyle: {
    marginTop: spacingY._10,
    paddingBottom: verticalScale(100),
    gap: spacingY._25
  }
})