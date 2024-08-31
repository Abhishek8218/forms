'use client'

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { demographicsSchema } from './validation';
import { defaultDemographicsData, Demographics } from './data';

export const CreateDemographicsForm: React.FC = () => {
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: defaultDemographicsData,
    resolver: yupResolver(demographicsSchema),
  });

  const mutation = useMutation({
    mutationKey: ['demographics'],
    mutationFn: async (formData: Demographics) => {
      console.log('Submitting demographics:', formData);
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
      reset(); // Reset form after successful submission
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutateAsync(data);
  };

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

      <div>
        <label htmlFor="population.genderDistribution.women" className="block text-sm font-medium text-gray-700">Number of Women</label>
        <Controller
          name="population.genderDistribution.women"
          control={control}
          render={({ field }) => (
            <>
              <input
                id="population.genderDistribution.women"
                type="number"
                {...field}
                className="input"
                placeholder="Number of Women"
              />
              {errors.population?.genderDistribution?.women && (
                <p className="text-red-500 text-sm">{errors.population.genderDistribution.women.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="population.genderDistribution.men" className="block text-sm font-medium text-gray-700">Number of Men</label>
        <Controller
          name="population.genderDistribution.men"
          control={control}
          render={({ field }) => (
            <>
              <input
                id="population.genderDistribution.men"
                type="number"
                {...field}
                className="input"
                placeholder="Number of Men"
              />
              {errors.population?.genderDistribution?.men && (
                <p className="text-red-500 text-sm">{errors.population.genderDistribution.men.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="population.genderDistribution.children" className="block text-sm font-medium text-gray-700">Number of Children</label>
        <Controller
          name="population.genderDistribution.children"
          control={control}
          render={({ field }) => (
            <>
              <input
                id="population.genderDistribution.children"
                type="number"
                {...field}
                className="input"
                placeholder="Number of Children"
              />
              {errors.population?.genderDistribution?.children && (
                <p className="text-red-500 text-sm">{errors.population.genderDistribution.children.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="workforce.agriculture.sanchit" className="block text-sm font-medium text-gray-700">Sanchit Agriculture Details</label>
        <Controller
          name="workforce.agriculture.sanchit"
          control={control}
          render={({ field }) => (
            <>
              <input
                id="workforce.agriculture.sanchit"
                type="text"
                {...field}
                className="input"
                placeholder="Sanchit Agriculture Details"
              />
              {errors.workforce?.agriculture?.sanchit && (
                <p className="text-red-500 text-sm">{errors.workforce.agriculture.sanchit.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="workforce.agriculture.kharif" className="block text-sm font-medium text-gray-700">Kharif Agriculture Details</label>
        <Controller
          name="workforce.agriculture.kharif"
          control={control}
          render={({ field }) => (
            <>
              <input
                id="workforce.agriculture.kharif"
                type="text"
                {...field}
                className="input"
                placeholder="Kharif Agriculture Details"
              />
              {errors.workforce?.agriculture?.kharif && (
                <p className="text-red-500 text-sm">{errors.workforce.agriculture.kharif.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="workforce.agriculture.rabi" className="block text-sm font-medium text-gray-700">Rabi Agriculture Details</label>
        <Controller
          name="workforce.agriculture.rabi"
          control={control}
          render={({ field }) => (
            <>
              <input
                id="workforce.agriculture.rabi"
                type="text"
                {...field}
                className="input"
                placeholder="Rabi Agriculture Details"
              />
              {errors.workforce?.agriculture?.rabi && (
                <p className="text-red-500 text-sm">{errors.workforce.agriculture.rabi.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="workforce.factoryProximity.nearbyFactory" className="block text-sm font-medium text-gray-700">Nearby Factory Details</label>
        <Controller
          name="workforce.factoryProximity.nearbyFactory"
          control={control}
          render={({ field }) => (
            <>
              <input
                id="workforce.factoryProximity.nearbyFactory"
                type="text"
                {...field}
                className="input"
                placeholder="Nearby Factory Details"
              />
              {errors.workforce?.factoryProximity?.nearbyFactory && (
                <p className="text-red-500 text-sm">{errors.workforce.factoryProximity.nearbyFactory.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="workforce.factoryProximity.workers" className="block text-sm font-medium text-gray-700">Number of Factory Workers</label>
        <Controller
          name="workforce.factoryProximity.workers"
          control={control}
          render={({ field }) => (
            <>
              <input
                id="workforce.factoryProximity.workers"
                type="number"
                {...field}
                className="input"
                placeholder="Number of Factory Workers"
              />
              {errors.workforce?.factoryProximity?.workers && (
                <p className="text-red-500 text-sm">{errors.workforce.factoryProximity.workers.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="workforce.employment.governmentEmployees" className="block text-sm font-medium text-gray-700">Number of Government Employees</label>
        <Controller
          name="workforce.employment.governmentEmployees"
          control={control}
          render={({ field }) => (
            <>
              <input
                id="workforce.employment.governmentEmployees"
                type="number"
                {...field}
                className="input"
                placeholder="Number of Government Employees"
              />
              {errors.workforce?.employment?.governmentEmployees && (
                <p className="text-red-500 text-sm">{errors.workforce.employment.governmentEmployees.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="workforce.employment.privateEmployees" className="block text-sm font-medium text-gray-700">Number of Private Employees</label>
        <Controller
          name="workforce.employment.privateEmployees"
          control={control}
          render={({ field }) => (
            <>
              <input
                id="workforce.employment.privateEmployees"
                type="number"
                {...field}
                className="input"
                placeholder="Number of Private Employees"
              />
              {errors.workforce?.employment?.privateEmployees && (
                <p className="text-red-500 text-sm">{errors.workforce.employment.privateEmployees.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="workforce.employment.dailyWorkers" className="block text-sm font-medium text-gray-700">Number of Daily Workers</label>
        <Controller
          name="workforce.employment.dailyWorkers"
          control={control}
          render={({ field }) => (
            <>
              <input
                id="workforce.employment.dailyWorkers"
                type="number"
                {...field}
                className="input"
                placeholder="Number of Daily Workers"
              />
              {errors.workforce?.employment?.dailyWorkers && (
                <p className="text-red-500 text-sm">{errors.workforce.employment.dailyWorkers.message}</p>
              )}
            </>
          )}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
