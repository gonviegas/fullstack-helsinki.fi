import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, InputValues } from './exerciseCalculator';

const app = express();
const app2 = express();

app2.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight) || !height || !weight) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else {
    res.json({
      weight,
      height,
      bmi: calculateBmi(height, weight)
    });
  }
});

app2.post('/exercises', (req, res) => {
  const { dailyExerciseHours, target } = req.body as InputValues;

  if (!dailyExerciseHours || !target) {
    res.status(400).send({ error: 'parameters missing' });
  } else if (isNaN(target) || dailyExerciseHours.some(elem => isNaN(elem))) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else {
    const result = calculateExercises(target, dailyExerciseHours);
    res.send(result);
  }
});

const PORT = 3003;
const PORT_2 = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app2.listen(PORT_2, () => {
  console.log(`Server running on port ${PORT_2}`);
});
