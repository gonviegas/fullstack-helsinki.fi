import { useState, useEffect } from 'react';
import { DiaryEntry, Notification, NotificationType } from './types';
import diaryService from './services/diary';
import DiaryEntriesList from './components/DiaryEntriesList';
import AddDiaryEntryForm from './components/AddDiaryEntryForm';
import Notifier from './components/Notifier';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<Notification>({
    type: NotificationType.Success,
    msg: ''
  });

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAll();
      setDiaryEntries(diaries);
    };

    void fetchDiaries();
  }, []);

  return (
    <>
      <Notifier notification={notification} setNotification={setNotification} />
      <AddDiaryEntryForm
        diaryEntries={diaryEntries}
        setDiaryEntries={setDiaryEntries}
        setNotification={setNotification}
      />
      <DiaryEntriesList diaryEntries={diaryEntries} />
    </>
  );
}

export default App;
