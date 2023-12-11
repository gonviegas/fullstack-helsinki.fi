import { Patient, Diagnosis } from '../types.ts';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import patientService from '../services/patients';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailsPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id as Patient['id'];

  useEffect(() => {
    const fetchPatient = async (id: Patient['id']) => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
    void fetchPatient(id);
  }, [id]);

  return (
    <>
      <h2>
        {patient?.name}{' '}
        {patient?.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </h2>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <div>date of birth: {patient?.dateOfBirth}</div>
      <h3>entries</h3>
      {patient?.entries.map(entry => (
        <div key={entry.id}>
          {entry.date} {entry.description}
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map(entryCode => (
                <li key={entryCode}>
                  {entryCode}
                  {' '}
                  {
                    diagnoses.find(diagnosis => diagnosis.code === entryCode)
                      ?.name
                  }
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
};

export default PatientDetailsPage;
