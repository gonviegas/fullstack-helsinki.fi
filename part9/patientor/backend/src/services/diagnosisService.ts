import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
  return diagnosesData;
};

export default { getEntries };
