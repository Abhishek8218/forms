// data.ts

// Interfaces for form data

export interface IVillage {
    name: string;
    gramPanchayat: string;
    roadCondition: string;
  }

  export interface IMetadata {
    surveyDate: string;
    surveyor: ISurveyor;
    location: ILocation;

  }

  
  export interface ILocation {
    branchToVillageDistanceKM: number;
    village: IVillage;
  }
  
  export interface ISurveyor {
    employeeId: string;
    name: string;
  }
  
  export interface IDemographics {
    population: {
      total: number;
      genderDistribution: {
        women: number;
        men: number;
        children: number;
      };
    };
    workforce: {
      agriculture: {
        sanchit: string;
        kharif: string;
        rabi: string;
      };
      factoryProximity: {
        nearbyFactory: string;
        workers: number;
      };
      employment: {
        governmentEmployees: number;
        privateEmployees: number;
        dailyWorkers: number;
      };
    };
  }
  
  export interface ISocialStructure {
    politicalInfluence: {
      politicianCount: number;
    };
    amenities: {
      healthcare: {
        hospital: string;
      };
      education: {
        school: string;
      };
      financialServices: {
        bank: string;
        microfinance: {
          loanCustomers: number;
          loanProvider: string;
          repaymentHistory: 'good' | 'poor' | 'very good';
        };
      };
    };
  }
  
  export interface IRiskAssessment {
    negativeImpacts: string;
  }
  
  export interface IContact {
    name: string;
    role: string;
    contact: string;
  }
  
  export interface IContacts {
    primaryContacts: IContact[];
  }
  
  // Default values
  export const defaultMetadataData: IMetadata = {
    surveyDate: '', // Empty string for date
    surveyor: {
      employeeId: 'testID', // Placeholder for employee ID
      name: 'testName',
    },
    location: {
      branchToVillageDistanceKM: 20,
      village: {
        name: '',
        gramPanchayat: '',
        roadCondition: '',
      },
    },
  };
  
  // Default values for other components can be added similarly
  export const defaultDemographicsData: IDemographics = {
    population: {
      total: 0,
      genderDistribution: {
        women: 0,
        men: 0,
        children: 0,
      },
    },
    workforce: {
      agriculture: {
        sanchit: '',
        kharif: '',
        rabi: '',
      },
      factoryProximity: {
        nearbyFactory: '',
        workers: 0,
      },
      employment: {
        governmentEmployees: 0,
        privateEmployees: 0,
        dailyWorkers: 0,
      },
    },
  };
  
  export const defaultSocialStructureData: ISocialStructure = {
    politicalInfluence: {
      politicianCount: 0,
    },
    amenities: {
      healthcare: {
        hospital: '',
      },
      education: {
        school: '',
      },
      financialServices: {
        bank: '',
        microfinance: {
          loanCustomers: 0,
          loanProvider: '',
          repaymentHistory: 'good', // Default to 'good'
        },
      },
    },
  };
  
  export const defaultRiskAssessmentData: IRiskAssessment = {
    negativeImpacts: '',
  };
  
  export const defaultContactsData: IContacts = {
    primaryContacts: [
      { name: '', role: '', contact: '' },
      { name: '', role: '', contact: '' },
      { name: '', role: '', contact: '' },
      { name: '', role: '', contact: '' },
      { name: '', role: '', contact: '' },
    ],
  };
  