// SocialStructureForm.tsx
'use client'
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { SocialStructure,defaultSocialStructureData } from './data';
import { socialStructureSchema } from './validation';



export const CreateSocialStructureForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultSocialStructureData,
    resolver: yupResolver(socialStructureSchema),
  });

  const mutation = useMutation({
    mutationKey: ['socialStructure'],
    mutationFn: async (formData:SocialStructure) => {
      // Replace with your API call
      console.log('Submitting social structure:', formData);
      return fetch('/api/social-structure', {
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
    mutation.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Political Influence */}
      <div>
        <label htmlFor="politicianCount">Number of Politicians</label>
        <Controller
          name="politicalInfluence.politicianCount"
          control={control}
          render={({ field }) => (
            <>
              <input
                type="number"
                id="politicianCount"
                {...field}
              />
              {errors.politicalInfluence?.politicianCount && (
                <p>{errors.politicalInfluence.politicianCount.message}</p>
              )}
            </>
          )}
        />
      </div>

      {/* Healthcare */}
      <div>
        <label htmlFor="hospital">Hospital Details</label>
        <Controller
          name="amenities.healthcare.hospital"
          control={control}
          render={({ field }) => (
            <>
              <input
                type="text"
                id="hospital"
                {...field}
              />
              {errors.amenities?.healthcare?.hospital && (
                <p>{errors.amenities.healthcare.hospital.message}</p>
              )}
            </>
          )}
        />
      </div>

      {/* Education */}
      <div>
        <label htmlFor="school">School Details</label>
        <Controller
          name="amenities.education.school"
          control={control}
          render={({ field }) => (
            <>
              <input
                type="text"
                id="school"
                {...field}
              />
              {errors.amenities?.education?.school && (
                <p>{errors.amenities.education.school.message}</p>
              )}
            </>
          )}
        />
      </div>

      {/* Financial Services */}
      <div>
        <label htmlFor="bank">Bank Name</label>
        <Controller
          name="amenities.financialServices.bank"
          control={control}
          render={({ field }) => (
            <>
              <input
                type="text"
                id="bank"
                {...field}
              />
              {errors.amenities?.financialServices?.bank && (
                <p>{errors.amenities.financialServices.bank.message}</p>
              )}
            </>
          )}
        />
      </div>
      <div>
        <label htmlFor="loanCustomers">Number of MFI Loan Customers</label>
        <Controller
          name="amenities.financialServices.microfinance.loanCustomers"
          control={control}
          render={({ field }) => (
            <>
              <input
                type="number"
                id="loanCustomers"
                {...field}
              />
              {errors.amenities?.financialServices?.microfinance?.loanCustomers && (
                <p>{errors.amenities.financialServices.microfinance.loanCustomers.message}</p>
              )}
            </>
          )}
        />
      </div>
      <div>
        <label htmlFor="loanProvider">MFI Loan Provider</label>
        <Controller
          name="amenities.financialServices.microfinance.loanProvider"
          control={control}
          render={({ field }) => (
            <>
              <input
                type="text"
                id="loanProvider"
                {...field}
              />
              {errors.amenities?.financialServices?.microfinance?.loanProvider && (
                <p>{errors.amenities.financialServices.microfinance.loanProvider.message}</p>
              )}
            </>
          )}
        />
      </div>
      <div>
        <label htmlFor="repaymentHistory">Repayment History</label>
        <Controller
          name="amenities.financialServices.microfinance.repaymentHistory"
          control={control}
          render={({ field }) => (
            <>
              <select
                id="repaymentHistory"
                {...field}
              >
                <option value="very poor">VeryPoor</option>
                <option value="poor">Poor</option>
                <option value="good">Good</option>
                <option value="very good">Very Good</option>
              </select>
              {errors.amenities?.financialServices?.microfinance?.repaymentHistory && (
                <p>{errors.amenities.financialServices.microfinance.repaymentHistory.message}</p>
              )}
            </>
          )}
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};


