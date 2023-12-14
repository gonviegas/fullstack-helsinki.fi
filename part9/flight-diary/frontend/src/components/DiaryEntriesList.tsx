import { DiaryEntry } from '../types';

interface DiaryEntriesListProps {
  diaryEntries: DiaryEntry[];
}

const styleH = {
  marginTop: '1.5em',
  marginBottom: '0.3em'
};

const styleP = {
  marginBottom: '0.1em',
  marginTop: '0.1em'
};

const DiaryEntriesList = (props: DiaryEntriesListProps) => {
  return (
    <>
      <h2 style={styleH}>Diary entries</h2>
      {props.diaryEntries.map(entry => (
        <div key={entry.id}>
          <h3 style={styleH}>{entry.date}</h3>
          <p style={styleP}>visibility: {entry.visibility}</p>
          <p style={styleP}>weather: {entry.weather}</p>
          {entry.comment && <p style={styleP}>comment: {entry.comment}</p>}
        </div>
      ))}
    </>
  );
};

export default DiaryEntriesList;
