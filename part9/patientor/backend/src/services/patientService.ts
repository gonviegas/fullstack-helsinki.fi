import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Patient[] = patientsData;

const getAll = (): Patient[] => {
  return patients;
};

const getAllNonSensitive = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(d => d.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  getAllNonSensitive,
  findById,
  addPatient
};
