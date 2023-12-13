import { useState, SyntheticEvent } from 'react';

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent
} from '@mui/material';

import { NewEntry, EntryType } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
}

interface GenderOption {
  value: EntryType;
  label: string;
}

const typeOptions: GenderOption[] = Object.values(EntryType).map(v => ({
  value: v,
  label: v.toString()
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<NewEntry['type']>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const type = Object.values(EntryType).find(g => g.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'HealthCheck',
      description: '',
      date: '',
      specialist: '',
      healthCheckRating: 0,
      diagnosisCodes: []
    });
  };

  return (
    <div>
      <form style={{ paddingBottom: '4em' }} onSubmit={addEntry}>
        <InputLabel>Type</InputLabel>
        <Select label='Type' fullWidth value={type} onChange={onTypeChange}>
          {typeOptions.map(option => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label='Description'
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label='Date'
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label='Specialist'
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label='Diagnosis Codes'
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        {type === 'HealthCheck' && (
          <TextField
            label='Health Check Rating'
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          />
        )}
        {type === 'OccupationalHealthcare' && (
          <div>
            <TextField
              label='Employer Name'
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <div style={{ marginTop: '1.5em' }}>
              <InputLabel>Sick Leave</InputLabel>
              <TextField
                label='Start Date'
                fullWidth
                value={sickLeaveStartDate}
                onChange={({ target }) => setSickLeaveStartDate(target.value)}
              />
              <TextField
                label='End Date'
                fullWidth
                value={sickLeaveEndDate}
                onChange={({ target }) => setSickLeaveEndDate(target.value)}
              />
            </div>
          </div>
        )}
        {type === 'Hospital' && (
          <div style={{ marginTop: '1.5em' }}>
            <InputLabel>Discharge</InputLabel>
            <TextField
              label='Date'
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label='Criteria'
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </div>
        )}
        <Grid style={{ marginTop: '0.5em' }}>
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
