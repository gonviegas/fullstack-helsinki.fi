import { useState, SyntheticEvent } from 'react';

import {
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Checkbox,
  ListItemText
} from '@mui/material';

import { NewEntry, Diagnosis, HealthCheckRating } from '../../../types';
import InputField from './InputField';

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnoses: Diagnosis[];
}

interface typeOptions {
  value: NewEntry['type'];
  label: string;
}

const types: typeOptions[] = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
  { value: 'Hospital', label: 'Hospital' }
];

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 285
    }
  }
};

interface HealthCheckRatingOption {
  label: string;
  value: HealthCheckRating;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [];
for (const [label, value] of Object.entries(HealthCheckRating)) {
  if (typeof value === 'number')
    healthCheckRatingOptions.push({ label, value });
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [type, setType] = useState<NewEntry['type']>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([]);
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const handleDiagnosisCodeChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (type === 'HealthCheck') {
      onSubmit({
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        healthCheckRating
      });
    } else if (type === 'OccupationalHealthcare') {
      onSubmit({
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        employerName,
        sickLeave: {
          startDate: sickLeaveStartDate,
          endDate: sickLeaveEndDate
        }
      });
    } else if (type === 'Hospital') {
      onSubmit({
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
      });
    }
  };

  return (
    <div
      style={{
        border: '1px dashed black',
        marginBottom: '1em',
        paddingBottom: '2.5em'
      }}
    >
      <form
        style={{ paddingBottom: '4em', padding: '0 1em 1em 1em ' }}
        onSubmit={addEntry}
      >
        <h3>New Entry</h3>
        <div>
          <InputLabel>Type</InputLabel>
          <Select
            fullWidth
            value={type}
            onChange={({ target }) => setType(target.value as NewEntry['type'])}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {types.map(option => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </div>
        <InputField
          label='Description'
          type='text'
          value={description}
          onChange={setDescription}
        />
        <InputField label='Date' type='date' value={date} onChange={setDate} />
        <InputField
          label='Specialist'
          type='text'
          value={specialist}
          onChange={setSpecialist}
        />
        <div style={{ marginTop: '1em' }}>
          <div>
            <InputLabel>Diagnosis Codes</InputLabel>
            <Select
              fullWidth
              multiple
              value={diagnosisCodes}
              onChange={handleDiagnosisCodeChange}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {diagnoses.map(option => (
                <MenuItem key={option.code} value={option.code}>
                  <Checkbox
                    checked={diagnosisCodes.indexOf(option.code) > -1}
                  />
                  <ListItemText primary={`${option.code} - ${option.name}`} />
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        {type === 'HealthCheck' && (
          <div>
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              fullWidth
              value={healthCheckRating}
              onChange={({ target }) =>
                setHealthCheckRating(target.value as HealthCheckRating)
              }
              MenuProps={MenuProps}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {healthCheckRatingOptions.map(option => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}
        {type === 'OccupationalHealthcare' && (
          <div>
            <InputField
              label='Employer Name'
              type='text'
              value={employerName}
              onChange={setEmployerName}
            />
            <InputLabel style={{ marginTop: '1.5em' }}>Sick Leave</InputLabel>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1em',
                width: '100%'
              }}
            >
              <div style={{ color: '#444' }}>Start:</div>
              <InputField
                type='date'
                value={sickLeaveStartDate}
                onChange={setSickLeaveStartDate}
              />

              <div style={{ color: '#444' }}>End:</div>
              <InputField
                type='date'
                value={sickLeaveEndDate}
                onChange={setSickLeaveEndDate}
              />
            </div>
          </div>
        )}
        {type === 'Hospital' && (
          <div>
            <InputLabel style={{ marginTop: '1.5em' }}>Discharge</InputLabel>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1em',
                width: '100%'
              }}
            >
              <div style={{ color: '#444' }}>Date:</div>
              <InputField
                type='date'
                value={dischargeDate}
                onChange={setDischargeDate}
              />
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1em',
                width: '100%',
                marginTop: '0.5em'
              }}
            >
              <div style={{ color: '#444' }}>Criteria:</div>
              <InputField
                type='text'
                value={dischargeCriteria}
                onChange={setDischargeCriteria}
              />
            </div>
          </div>
        )}
        <Grid style={{ marginTop: '2em' }}>
          <Grid item>
            <Button
              color='secondary'
              variant='contained'
              style={{ float: 'left' }}
              type='button'
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right'
              }}
              type='submit'
              variant='contained'
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
