import { useState } from 'react';
import axios from 'axios';
import {
  Visibility,
  Weather,
  DiaryEntry,
  DiaryEntryFormValues,
  Notification,
  NotificationType
} from '../types';
import diaryService from '../services/diary';

interface VisibilityOption {
  value: Visibility;
  label: string;
}

interface WeatherOption {
  value: Weather;
  label: string;
}

interface AddDiaryEntryFormProps {
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  diaryEntries: DiaryEntry[];
  setNotification: React.Dispatch<React.SetStateAction<Notification>>;
}

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(
  v => ({
    value: v,
    label: v.toString()
  })
);

const weatherOptions: WeatherOption[] = Object.values(Weather).map(v => ({
  value: v,
  label: v.toString()
}));

const AddDiaryEntryForm = (props: AddDiaryEntryFormProps) => {
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState<string>('');

  const styleFields = {
    paddingRight: 10
  };

  const onVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value == 'string') {
      const value = event.target.value;
      const visibility = Object.values(Visibility).find(
        g => g.toString() === value
      );
      if (visibility) {
        setVisibility(visibility);
        console.log(visibility);
      }
    }
  };

  const onWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value == 'string') {
      const value = event.target.value;
      const weather = Object.values(Weather).find(g => g.toString() === value);
      if (weather) {
        setWeather(weather);
        console.log(weather);
      }
    }
  };

  const addDiaryEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiaryEntry: DiaryEntryFormValues = {
      date,
      visibility,
      weather,
      comment
    };

    try {
      const diaryEntry = await diaryService.create(newDiaryEntry);
      props.setDiaryEntries(props.diaryEntries.concat(diaryEntry));
      props.setNotification({
        type: NotificationType.Success,
        msg: 'New diary entry added successfully'
      });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          props.setNotification({ type: NotificationType.Error, msg: message });
        } else {
          const message = 'Unrecognized axios error';
          props.setNotification({ type: NotificationType.Error, msg: message });
        }
      } else {
        const message = 'Unknown error';
        props.setNotification({ type: NotificationType.Error, msg: message });
      }
    }

    setDate('');
    setVisibility(Visibility.Good);
    setWeather(Weather.Sunny);
    setComment('');
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={addDiaryEntry}>
        <div>
          <label style={styleFields}>Date</label>
          <input type='date' onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <label style={styleFields}>Visibility</label>
          {visibilityOptions.map(v => (
            <label key={v.value}>
              {v.label}
              <input
                type='radio'
                value={v.value}
                name='visibility'
                checked={v.value === visibility}
                onChange={onVisibilityChange}
              />
            </label>
          ))}
        </div>
        <div>
          <label style={styleFields}>Weather</label>
          {weatherOptions.map(v => (
            <label key={v.value}>
              {v.label}
              <input
                type='radio'
                value={v.value}
                name='weather'
                checked={v.value === weather}
                onChange={onWeatherChange}
              />
            </label>
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          <label style={styleFields}>Comment</label>
          <textarea rows={1} onChange={e => setComment(e.target.value)} />
        </div>
        <button type='submit'>Add</button>
      </form>
    </>
  );
};
export default AddDiaryEntryForm;
