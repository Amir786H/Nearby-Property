import Loading from '@/components/Loading';
import PropertyCard from '@/components/PropertyCard';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors, spacingY } from '@/constants/theme';
import { useProfile, useProperties } from '@/hooks/useProperties'; // adjust path as needed
import { verticalScale } from '@/utils/styling';
import * as Icons from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const { data, isLoading, error } = useProperties();
  const { data: profile } = useProfile();

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
      <View className="flex-1 px-5 mt-2">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
          <View className="gap-1">
            <Typo size={16} color={colors.neutral400}>Hello,</Typo>
            <Typo size={20} fontWeight={'500'}>{profile?.name}</Typo>
          </View>
          <TouchableOpacity
            className="bg-zinc-700 p-2.5 rounded-full"
            onPress={() => setSearchFlag(!searchFlag)}
          >
            <Icons.MagnifyingGlass
              size={verticalScale(22)}
              color={colors.neutral200}
              weight='bold'
            />
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        <View className="mb-3">
          {searchFlag && (
            <View className="bg-zinc-700 rounded flex-row items-center px-3 h-11">
              <Icons.MagnifyingGlass size={20} color={colors.neutral400} />
              <TextInput
                value={search}
                onChangeText={handleSearch}
                placeholder="Search properties..."
                placeholderTextColor={colors.neutral400}
                className="flex-1 bg-transparent text-zinc-100 ml-2 text-base"
              />
            </View>
          )}
        </View>

        <ScrollView
          contentContainerStyle={{
            marginTop: spacingY._10,
            paddingBottom: verticalScale(100),
            gap: spacingY._25,
          }}
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
