import {
  NewPatient,
  Gender,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  HealthCheckRating,
  Diagnosis
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map(v => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect healthcheck rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseSickLeave = (
  object: unknown
): NewOccupationalHealthcareEntry['sickLeave'] => {
  if (!object || typeof object !== 'object' || !('sickLeave' in object)) {
    return {} as NewOccupationalHealthcareEntry['sickLeave'];
  }

  const sickLeave =
    object.sickLeave as NewOccupationalHealthcareEntry['sickLeave'];

  if (
    !sickLeave ||
    typeof sickLeave !== 'object'
  ) {
    throw new Error('Incorrect sick leave: ' + sickLeave);
  }

  sickLeave.startDate = parseSickLeaveDate(sickLeave.startDate);
  sickLeave.endDate = parseSickLeaveDate(sickLeave.endDate);

  return object.sickLeave as NewOccupationalHealthcareEntry['sickLeave'];
};

const parseDischargeDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect discharge date: ' + date);
  }
  return date;
};

const parseSickLeaveDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect sick leave date: ' + date);
  }
  return date;
};

const parseDischargeCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing discharge criteria');
  }

  return criteria;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }

  return employerName;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };
    return newPatient;
  }

  throw new Error('Incorrect data: a field missing');
};

export const toNewHealthCheckEntry = (object: unknown): NewHealthCheckEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'healthCheckRating' in object &&
    'type' in object
  ) {
    const newEntry: NewHealthCheckEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      type: 'HealthCheck'
    };
    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

export const toNewHospitalEntry = (object: unknown): NewHospitalEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object &&
    'discharge' in object
  ) {
    const newEntry: NewHospitalEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
      type: 'Hospital',
      discharge: {
        date: parseDischargeDate(
          (object.discharge as NewHospitalEntry['discharge']).date
        ),
        criteria: parseDischargeCriteria(
          (object.discharge as NewHospitalEntry['discharge']).criteria
        )
      }
    };
    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

export const toNewOccupationalHealthcareEntry = (
  object: unknown
): NewOccupationalHealthcareEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object &&
    'employerName' in object
  ) {
    const newEntry: NewOccupationalHealthcareEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
      type: 'OccupationalHealthcare',
      employerName: parseEmployerName(object.employerName),
      sickLeave: parseSickLeave(object)
    };
    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

export default toNewPatient;
