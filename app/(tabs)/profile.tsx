import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors } from '@/constants/theme';
import { useProfile } from '@/hooks/useProperties'; // adjust path as needed
import { verticalScale } from '@/utils/styling';
import React from 'react';
import { Image, View } from 'react-native';

const Profile = () => {  
  const { data } = useProfile();

  return (
    <ScreenWrapper>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../../assets/images/RealEstate.png')}
          style={{
            width: verticalScale(200),
            height: verticalScale(200),
            borderRadius: 50
          }}
        />
        <Typo size={24} fontWeight={'bold'} color={colors.primary}>
          {data?.name}
        </Typo>
        <Typo size={18} fontWeight={'500'} color={colors.white}>
          {data?.email}
        </Typo>
      </View>

    </ScreenWrapper>
  );
};

export default Profile;