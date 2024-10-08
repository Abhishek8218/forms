
'use client'

import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultContactsData,Contacts } from './data';
import { contactsSchema } from './validation';



export const CreateContactsForm = () => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues:defaultContactsData,
    resolver: yupResolver(contactsSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'primaryContacts',
    control,
  });

  const mutation = useMutation({
    mutationFn: async (formData:Contacts) => {
      // Replace with your API call
      console.log('Submitting contacts:', formData);
      return fetch('/api/contacts', {
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
      {fields.map((item, index) => (
        <div key={item.id} style={{ marginBottom: '1rem' }}>
          <label htmlFor={`primaryContacts[${index}].name`}>Name</label>
          <Controller
            name={`primaryContacts.${index}.name`}
            control={control}
            render={({ field }) => (
              <>
                <input
                  id={`primaryContacts[${index}].name`}
                  {...field}
                />
                {errors.primaryContacts?.[index]?.name && (
                  <p>{errors.primaryContacts[index].name.message}</p>
                )}
              </>
            )}
          />

          <label htmlFor={`primaryContacts[${index}].role`}>Role</label>
          <Controller
            name={`primaryContacts.${index}.role`}
            control={control}
            render={({ field }) => (
              <>
                <input
                  id={`primaryContacts[${index}].role`}
                  {...field}
                />
                {errors.primaryContacts?.[index]?.role && (
                  <p>{errors.primaryContacts[index].role.message}</p>
                )}
              </>
            )}
          />

          <label htmlFor={`primaryContacts[${index}].contact`}>Contact</label>
          <Controller
            name={`primaryContacts.${index}.contact`}
            control={control}
            render={({ field }) => (
              <>
                <input
                  id={`primaryContacts[${index}].contact`}
                  {...field}
                />
                {errors.primaryContacts?.[index]?.contact && (
                  <p>{errors.primaryContacts[index].contact.message}</p>
                )}
              </>
            )}
          />

          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: '', role: '', contact: '' })}
      >
        Add New Contact
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
