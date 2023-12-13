import { Patient, Diagnosis, NewEntry } from '../../types.ts';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import patientService from '../../services/patients';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryDetails from './EntryDetails';
import AddEntryForm from './AddEntryForm';
import { Button } from '@mui/material';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailsPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id as Patient['id'];
  const [showAddEntry, setShowAddEntry] = useState<boolean>(false);

  useEffect(() => {
    const fetchPatient = async (id: Patient['id']) => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
    void fetchPatient(id);
  }, [id]);

  const submitNewEntry = async (values: NewEntry) => {
    console.log(values);
    // try {
    //   const patient = await patientService.create(values);
    //   setPatients(patients.concat(patient));
    //   setModalOpen(false);
    // } catch (e: unknown) {
    //   if (axios.isAxiosError(e)) {
    //     if (e?.response?.data && typeof e?.response?.data === 'string') {
    //       const message = e.response.data.replace(
    //         'Something went wrong. Error: ',
    //         ''
    //       );
    //       console.error(message);
    //       setError(message);
    //     } else {
    //       setError('Unrecognized axios error');
    //     }
    //   } else {
    //     console.error('Unknown error', e);
    //     setError('Unknown error');
    //   }
    // }
  };

  return (
    <>
      <h2>
        {patient?.name}{' '}
        {patient?.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </h2>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <div>date of birth: {patient?.dateOfBirth}</div>
      <div style={{ marginTop: '2em' }}>
        {showAddEntry ? (
          <AddEntryForm
            onCancel={() => setShowAddEntry(false)}
            onSubmit={submitNewEntry}
          />
        ) : null}
        {patient?.entries.map(entry => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
        <Button variant='contained' onClick={() => setShowAddEntry(true)}>
          New Entry
        </Button>
      </div>
    </>
  );
};

export default PatientDetailsPage;
