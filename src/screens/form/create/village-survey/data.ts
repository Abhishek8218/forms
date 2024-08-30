// data.ts

// Interfaces for form data

export interface Village {
    name: string;
    gramPanchayat: string;
    roadCondition: string;
  }

  export interface Metadata {
    surveyDate: string;
    surveyor: Surveyor;
    location: Location;

  }

  
  export interface Location {
    branchToVillageDistanceKM: number;
    village: Village;
  }
  
  export interface Surveyor {
    employeeId: string;
    name: string;
  }
  
  export interface Demographics {
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
  
  export interface SocialStructure {
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
  
  export interface RiskAssessment {
    negativeImpacts: string;
  }
  
  export interface Contact {
    name: string;
    role: string;
    contact: string;
  }
  
  export interface Contacts {
    primaryContacts: Contact[];
  }
  
  // Default values
  export const defaultMetadataData: Metadata = {
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
  export const defaultDemographicsData: Demographics = {
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
  
  export const defaultSocialStructureData: SocialStructure = {
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
  
  export const defaultRiskAssessmentData: RiskAssessment = {
    negativeImpacts: '',
  };
  
  export const defaultContactsData: Contacts = {
    primaryContacts: [
      { name: '', role: '', contact: '' },
      { name: '', role: '', contact: '' },
      { name: '', role: '', contact: '' },
      { name: '', role: '', contact: '' },
      { name: '', role: '', contact: '' },
    ],
  };
  