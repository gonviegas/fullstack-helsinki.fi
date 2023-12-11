import { Diagnosis, OccupationalHealthcareEntry } from '../../../types';
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  style: React.CSSProperties;
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcare = ({ style, entry, diagnoses }: Props) => {
  return (
    <div style={style}>
      <div>
        {entry.date} {<WorkIcon />} {entry.employerName}
      </div>
      <div>{entry.description}</div>
      {entry.diagnosisCodes && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <div>diagnosis:</div>
          {entry.diagnosisCodes.map(entryCode => (
            <li key={entryCode}>
              {entryCode}{' '}
              {diagnoses.find(diagnosis => diagnosis.code === entryCode)?.name}
            </li>
          ))}
        </ul>
      )}
      {entry.sickLeave && (
        <div>
          sick leave: {entry.sickLeave.startDate} / {entry.sickLeave.endDate}
        </div>
      )}
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default OccupationalHealthcare;
