import { Entry, Diagnosis } from '../../../types';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';
import HealthCheck from './HealthCheck';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const style = {
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  {
    switch (entry.type) {
      case 'HealthCheck':
        return (
          <HealthCheck style={style} entry={entry} diagnoses={diagnoses} />
        );
      case 'OccupationalHealthcare':
        return (
          <OccupationalHealthcare
            style={style}
            entry={entry}
            diagnoses={diagnoses}
          />
        );
      case 'Hospital':
        return <Hospital style={style} entry={entry} diagnoses={diagnoses} />;
      default:
        return assertNever(entry);
    }
  }
};

export default EntryDetails;
