'use client'

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { metadataSchema } from './validation'; // Assuming the schema is in a file named schemas.js
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultMetadataData,Metadata } from './data';
// Assuming a recoil state is defined in recoilState.js

export const CreateMetaDataForm = () => {
  // Define form state using Recoil (if necessary)


  // Initialize the form with react-hook-form and Yup validation schema
  const { handleSubmit, control, reset } = useForm({
    defaultValues: defaultMetadataData,
    resolver: yupResolver(metadataSchema),
  });

  // Define the mutation using React Query for form submission
  const mutation = useMutation({
    mutationFn: async (formData:Metadata) => {
      // Replace with your actual API call
      console.log('Submitting metadata:', formData);
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
      reset(); // Reset form fields on success
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to submit metadata');
    },
  });

  // Handle form submission
  const onSubmit = (data: any) => { // Optional: update Recoil state
    mutation.mutateAsync(data);
  };

  return (

    // Render the form using the Controller component
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold">Create Metadata Form</h2>

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
        disabled={mutation.isPending}
      >
        {mutation.isPending? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
