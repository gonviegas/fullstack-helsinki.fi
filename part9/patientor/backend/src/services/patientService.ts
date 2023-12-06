import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientData } from '../types';

const getEntries = (): Patient[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getEntries,
  getNonSensitiveEntries
};
