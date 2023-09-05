import React from 'react';
import { getAllProperties } from '../utils/api';
import { useQuery } from 'react-query';

export default function useProperties() {
  const { data, isError, isLoading, refetch } = useQuery(
    'properties',
    getAllProperties,
    { refetchOnWindowFocus: false }
  );
  return { data, isError, isLoading };
}
