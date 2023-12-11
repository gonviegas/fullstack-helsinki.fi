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
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default Hospital;
