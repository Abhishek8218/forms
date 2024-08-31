'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { metadataSchema } from './validation'; // Assuming the schema is in a file named schemas.js
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultMetadataData, IMetadata } from './data';



// Define the form component
export const ModifyMetaDataForm = () => {

    const queryClient = useQueryClient();
    // Initialize the form with react-hook-form and Yup validation schema



      // Fetch existing data using React Query

  const { data: initialData, isLoading, isError , isSuccess } = useQuery({
    queryKey: ['metadata'],
    queryFn: async () => {
      const response = await fetch('/api/metadata'); // Replace with your actual API endpoint
      if (!response.ok) throw new Error('Failed to fetch metadata');
      return response.json();
    },

  });
    const { handleSubmit, control, reset } = useForm<IMetadata>({
        defaultValues: initialData || defaultMetadataData,
        resolver: yupResolver(metadataSchema),
  });







  // Define the mutation using React Query for form submission
  const mutation = useMutation({
    mutationKey: ['modifiedMetadata'],
    mutationFn: async (formData: IMetadata) => {
      console.log('Submitting modified metadata:', formData);
      const response = await fetch('/api/metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit metadata');
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast.success('Metadata submitted successfully!');
      queryClient.invalidateQueries({ queryKey: ["metaData"] });
      reset(data); // Optionally reset form fields with new data
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to submit metadata');
    },
  });

  // Handle form submission
  const onSubmit = (data: IMetadata) => {
    mutation.mutateAsync(data);
  };

  // Display loading state if fetching data
  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Failed to load initial data</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold">Modify Metadata Form</h2>

      {/* Survey Date Field */}
      <Controller
        name="surveyDate"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <label className="block font-medium">Survey Date</label>
            <input
              type="date"
              {...field}
              className={`mt-1 p-2 border rounded-md w-full ${fieldState.invalid ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
          </div>
        )}
      />

      {/* Surveyor Employee ID */}
      <Controller
        name="surveyor.employeeId"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <label className="block font-medium">Employee ID</label>
            <input
              type="text"
              disabled
              {...field}
              className={`mt-1 p-2 border rounded-md w-full ${fieldState.invalid ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
          </div>
        )}
      />

      {/* Surveyor Name */}
      <Controller
        name="surveyor.name"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <label className="block font-medium">Surveyor Name</label>
            <input
              type="text"
              disabled
              {...field}
              className={`mt-1 p-2 border rounded-md w-full ${fieldState.invalid ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
          </div>
        )}
      />

      {/* Branch to Village Distance */}
      <Controller
        name="location.branchToVillageDistanceKM"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <label className="block font-medium">Branch to Village Distance (KM)</label>
            <input
              type="number"
              {...field}
              className={`mt-1 p-2 border rounded-md w-full ${fieldState.invalid ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
          </div>
        )}
      />

      {/* Village Name */}
      <Controller
        name="location.village.name"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <label className="block font-medium">Village Name</label>
            <input
              type="text"
              {...field}
              className={`mt-1 p-2 border rounded-md w-full ${fieldState.invalid ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
          </div>
        )}
      />

      {/* Gram Panchayat */}
      <Controller
        name="location.village.gramPanchayat"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <label className="block font-medium">Gram Panchayat</label>
            <input
              type="text"
              {...field}
              className={`mt-1 p-2 border rounded-md w-full ${fieldState.invalid ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
          </div>
        )}
      />

      {/* Road Condition */}
      <Controller
        name="location.village.roadCondition"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <label className="block font-medium">Road Condition</label>
            <input
              type="text"
              {...field}
              className={`mt-1 p-2 border rounded-md w-full ${fieldState.invalid ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
          </div>
        )}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        disabled={mutation.isPending || isLoading}
      >
        {mutation.isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
