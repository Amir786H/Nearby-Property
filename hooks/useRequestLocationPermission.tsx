import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const useRequestLocationPermission = () => {
  const [status, setStatus] = useState<'granted' | 'denied' | 'undetermined' | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setStatus(status);
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
      }
    })();
  }, []);

  return status;
};

export default useRequestLocationPermission;