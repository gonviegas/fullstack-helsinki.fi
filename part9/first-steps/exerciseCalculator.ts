interface InputValues {
  target: number;
  dailyExerciseHours: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  target: number,
  dailyExerciseHours: number[]
): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
  const average =
    dailyExerciseHours.reduce((a, b) => a + b) / dailyExerciseHours.length;
  const success = average >= target;
  let rating = 0;
  let ratingDescription = '';
  if (average < (target * 7) / 8) {
    rating = 1;
    ratingDescription = 'bad';
  } else if (average >= (target * 7) / 8 && average < (target * 9) / 8) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'good';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseArguments = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const dailyExerciseHoursArgs: number[] = [];

  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    } else {
      if (i !== 2) dailyExerciseHoursArgs.push(Number(args[i]));
    }
  }

  const targetArg = Number(args[2]);

  return {
    target: targetArg,
    dailyExerciseHours: dailyExerciseHoursArgs
  };
};

try {
  const { target, dailyExerciseHours } = parseArguments(process.argv);
  console.log(calculateExercises(target, dailyExerciseHours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
