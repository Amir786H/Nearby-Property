// import { AuthProvider } from '@/contexts/authContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import '../global.css';

const queryClient = new QueryClient();

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen
        name="(modals)/propertyModal"
        options={{
          presentation: 'modal',
        }}
      /> */}
      {/* <Stack.Screen
        name="(modals)/walletModal"
        options={{
          presentation: 'modal',
        }}
      /> */}
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StackLayout />
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({});

