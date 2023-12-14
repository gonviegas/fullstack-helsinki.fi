import { Diagnosis, HealthCheckEntry, HealthCheckRating } from '../../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  style: React.CSSProperties;
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheck = ({ style, entry, diagnoses }: Props) => {
  const healthCheckRating = () => {
    switch (entry.healthCheckRating) {
      case HealthCheckRating.Healthy:
        return <FavoriteIcon htmlColor='green' />;
      case HealthCheckRating.LowRisk:
        return <FavoriteIcon htmlColor='yellow' />;
      case HealthCheckRating.HighRisk:
        return <FavoriteIcon htmlColor='orange' />;
      case HealthCheckRating.CriticalRisk:
        return <FavoriteIcon htmlColor='red' />;
      default:
        return null;
    }
  };

  return (
    <div style={style}>
      <div>
        {entry.date} <MedicalServicesIcon />
      </div>
      <div>{entry.description}</div>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <div>Diagnosis</div>
          {entry.diagnosisCodes.map(entryCode => (
            <li key={entryCode}>
              {entryCode}{' '}
              {diagnoses.find(diagnosis => diagnosis.code === entryCode)?.name}
            </li>
          ))}
        </ul>
      ): (
        <br />
      )}
      <div>{healthCheckRating()}</div>
      <br />
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default HealthCheck;
