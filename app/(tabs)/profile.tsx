import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors } from '@/constants/theme';
import { useProfile } from '@/hooks/useProperties';
import React from 'react';
import { Image, View } from 'react-native';

const Profile = () => {
  const { data } = useProfile();

  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center items-center bg-zinc-950 px-8">
        <Image
          source={require('../../assets/images/RealEstate.png')}
          className="w-52 h-52 rounded-full bg-zinc-300"
          resizeMode="contain"
        />
        <Typo size={28} fontWeight={'bold'} color={colors.primary} className="text-primary mt-12">
          {data?.name}
        </Typo>
        <Typo size={20} fontWeight={'500'} className="text-white mt-2">
          {data?.email}
        </Typo>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;