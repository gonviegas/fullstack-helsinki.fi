import { Diagnosis, HospitalEntry } from '../../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  style: React.CSSProperties;
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const Hospital = ({ style, entry, diagnoses }: Props) => {
  return (
    <div style={style}>
      <div>
        {entry.date} <LocalHospitalIcon />
      </div>
      <div>{entry.description}</div>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <div>Diagnosis</div>
          {entry.diagnosisCodes.map(entryCode => (
            <li key={entryCode}>
              {entryCode}{' '}
              {diagnoses.find(diagnosis => diagnosis.code === entryCode)?.name}
            </li>
          ))}
        </ul>
      )}
      <div>Discharge </div>
      <div>date: {entry.discharge.date} </div>
      <div>criteria: {entry.discharge.criteria} </div>
      <br />
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default Hospital;
