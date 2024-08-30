import { atom } from 'recoil';

// Define the Recoil atom for metadata form state
export const metadataState = atom({
  key: 'metadataState', // Unique ID for this atom
  default: {
    surveyDate: Date(),
    surveyor: {
      employeeId: 'employee2803',
      name: 'test user',
    },
    location: {
      branchToVillageDistanceKM: 0,
      village: {
        name: '',
        gramPanchayat: '',
        roadCondition: '',
      },
    },
  },
});
