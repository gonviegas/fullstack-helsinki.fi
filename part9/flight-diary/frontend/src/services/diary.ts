import axios from 'axios';
import { DiaryEntry, DiaryEntryFormValues } from '../types';
import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);
  return data;
};

const create = async (object: DiaryEntryFormValues) => {
  const { data } = await axios.post<DiaryEntry>(
    `${apiBaseUrl}/diaries`,
    object
  );
  return data;
};

export default { getAll, create };
