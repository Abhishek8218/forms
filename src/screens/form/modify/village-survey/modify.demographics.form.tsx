'use client'

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { demographicsSchema } from './validation';
import { IDemographics,defaultDemographicsData } from './data';

export const ModifyDemographicsForm: React.FC = () => {


    const queryClient = useQueryClient();
  // Fetch metadata using useQuery
  const { data: InitialDemographicsData, isLoading, error,isSuccess } = useQuery<IDemographics>({
queryKey: ['demographics-data'],
    queryFn: async () => {
      const response = await fetch('/api/demographics'); // Fetch metadata from API
      if (!response.ok) {
        throw new Error('Failed to fetch metadata');
      }
      return response.json();
    },
  });

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: InitialDemographicsData || defaultDemographicsData ,
    resolver: yupResolver(demographicsSchema),
  });

  const mutation = useMutation({
    mutationKey: ['modifiedDemographics'],
    mutationFn: async (formData: IDemographics) => {
      console.log('Submitting modified demographics:', formData);
      const response = await fetch('/api/demographics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Form submitted successfully');
        queryClient.invalidateQueries({ queryKey: ['demographics-data'] });
       // Reset form after successful submission
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutateAsync(data);
  };

  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading metadata: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="population.total" className="block text-sm font-medium text-gray-700">Total Population</label>
        <Controller
          name="population.total"
          control={control}
          render={({ field }) => (
            <>
              <input
                id="population.total"
                type="number"
                {...field}
                className="input"
                placeholder="Total Population"
              />
              {errors.population?.total && (
                <p className="text-red-500 text-sm">{errors.population.total.message}</p>
              )}
            </>
          )}
        />
      </div>

      {/* Additional fields remain unchanged */}

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
