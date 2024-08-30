import * as Yup from 'yup';

// Schema for metadata object
export const metadataSchema = Yup.object().shape({
  surveyDate: Yup.date().required('Survey date is required'),
  surveyor: Yup.object().shape({
    employeeId: Yup.string().required('Employee ID is required'),
    name: Yup.string().required('Surveyor name is required'),
  }),
  location: Yup.object().shape({
    branchToVillageDistanceKM: Yup.number()
      .min(0, 'Distance must be a positive number')
      .required('Distance from branch to village is required'),
    village: Yup.object().shape({
      name: Yup.string().required('Village name is required'),
      gramPanchayat: Yup.string().required('Gram Panchayat is required'),
      roadCondition: Yup.string().required('Road condition is required'),
    }),
  }),
});

// Schema for demographics object
export const demographicsSchema = Yup.object().shape({
  population: Yup.object().shape({
    total: Yup.number()
      .min(0, 'Total population must be a positive number')
      .required('Total population is required'),
    genderDistribution: Yup.object().shape({
      women: Yup.number().min(0, 'Number of women must be a positive number'),
      men: Yup.number().min(0, 'Number of men must be a positive number'),
      children: Yup.number().min(0, 'Number of children must be a positive number'),
    }),
  }),
  workforce: Yup.object().shape({
    agriculture: Yup.object().shape({
      sanchit: Yup.string().required('Sanchit Agriculture details are required'),
      kharif: Yup.string().required('Kharif Agriculture details are required'),
      rabi: Yup.string().required('Rabi Agriculture details are required'),
    }),
    factoryProximity: Yup.object().shape({
      nearbyFactory: Yup.string().required('Nearby factory details are required'),
      workers: Yup.number()
        .min(0, 'Number of factory workers must be a positive number')
        .required('Number of workers is required'),
    }),
    employment: Yup.object().shape({
      governmentEmployees: Yup.number()
        .min(0, 'Number of government employees must be a positive number')
        .required('Number of government employees is required'),
      privateEmployees: Yup.number()
        .min(0, 'Number of private employees must be a positive number')
        .required('Number of private employees is required'),
      dailyWorkers: Yup.number()
        .min(0, 'Number of daily wage workers must be a positive number')
        .required('Number of daily wage workers is required'),
    }),
  }),
});

// Schema for socialStructure object
export const socialStructureSchema = Yup.object().shape({
  politicalInfluence: Yup.object().shape({
    politicianCount: Yup.number()
      .min(0, 'Number of politicians must be a positive number')
      .required('Number of politicians is required'),
  }),
  amenities: Yup.object().shape({
    healthcare: Yup.object().shape({
      hospital: Yup.string().required('Hospital details are required'),
    }),
    education: Yup.object().shape({
      school: Yup.string().required('School details are required'),
    }),
    financialServices: Yup.object().shape({
      bank: Yup.string().required('Bank name is required'),
      microfinance: Yup.object().shape({
        loanCustomers: Yup.number()
          .min(0, 'Number of MFI loan customers must be a positive number')
          .required('Number of MFI loan customers is required'),
        loanProvider: Yup.string().required('MFI loan provider is required'),
        repaymentHistory: Yup.string()
          .oneOf(['good', 'poor', 'very good'], 'Repayment history must be either good, poor, or very good')
          .required('Repayment history is required'),
      }),
    }),
  }),
});

// Schema for riskAssessment object
export const riskAssessmentSchema = Yup.object().shape({
  negativeImpacts: Yup.string().required('Details on negative impacts are required'),
});

// Schema for contacts object
export const contactsSchema = Yup.object().shape({
  primaryContacts: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Contact name is required'),
      role: Yup.string().required('Contact role is required'),
      contact: Yup.string()
        .matches(
          /^(\+\d{1,3}[- ]?)?\d{10}$/,
          'Contact number is not valid. Must be a 10-digit number or formatted with country code'
        )
        .required('Contact number is required'),
    })
  ),
});
