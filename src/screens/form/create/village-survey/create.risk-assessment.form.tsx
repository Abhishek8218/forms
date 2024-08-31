'use client'



import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultRiskAssessmentData, RiskAssessment } from './data';
import { riskAssessmentSchema } from './validation';



export const CreateRiskAssessmentForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultRiskAssessmentData,
    resolver: yupResolver(riskAssessmentSchema),
  });

  const mutation = useMutation({
    mutationKey: ['riskAssessment'],
    mutationFn: async (formData:RiskAssessment) => {
        console.log('Submitting risk assessment:', formData);
      // Replace with your API call
      return fetch('/api/risk-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      toast.success('Form submitted successfully!');
    },
    onError: () => {
      toast.error('Failed to submit the form.');
    },
  });

  const onSubmit = (data:any) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Negative Impacts */}
      <div>
        <label htmlFor="negativeImpacts">Negative Impacts</label>
        <Controller
          name="negativeImpacts"
          control={control}
          render={({ field }) => (
            <>
              <textarea
                id="negativeImpacts"
                {...field}
                rows={4}
                cols={50}
              />
              {errors.negativeImpacts && (
                <p>{errors.negativeImpacts.message}</p>
              )}
            </>
          )}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
