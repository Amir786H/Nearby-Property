import { useQuery } from '@tanstack/react-query';

const fetchProperties = async () => {
  const res = await fetch('http://192.168.43.90:3000/properties');
  if (!res.ok) throw new Error('Network response was not ok');
  const data = await res.json();
  // console.log(data);
  return data;
};

const fetchProfile = async () => {
  const res = await fetch('http://192.168.43.90:3000/profile');
  if (!res.ok) throw new Error('Network response was not ok');
  const profiledata = await res.json();
  // console.log(data);
  return profiledata;
};

export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });
}

// API ENDPOINTS ARE HERE:

// http://localhost:3000/properties
// http://localhost:3000/bookings
// http://localhost:3000/profile

// NOTE: IF YOU ARE TESTING ON YOUR REAL DEVICE OR EMULATOR PLEASE CHANGE THE LOCALHOST TO YOUR IP ADDRESS