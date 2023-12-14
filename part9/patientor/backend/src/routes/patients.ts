import express from 'express';
import patientService from '../services/patientService';
import {
  toNewPatient,
  toNewHealthCheckEntry,
  toNewOccupationalHealthcareEntry,
  toNewHospitalEntry
} from '../utils';
import { NewEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAllNonSensitive());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    let newEntry;
    if (req.body.type === 'HealthCheck') {
      newEntry = toNewHealthCheckEntry(req.body);
    } else if (req.body.type === 'OccupationalHealthcare') {
      newEntry = toNewOccupationalHealthcareEntry(req.body);
    } else if (req.body.type === 'Hospital') {
      newEntry = toNewHospitalEntry(req.body);
    } else {
      throw new Error('Invalid entry type');
    }

    const addedEntry = patientService.addEntry(
      req.params.id,
      newEntry as NewEntry
    );

    addedEntry ? res.json(addedEntry) : res.sendStatus(404);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
