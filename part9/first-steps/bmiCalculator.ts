interface InputValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  let bmiText: string = '';
  if (bmi < 18.5) {
    bmiText = 'Underweight';
  } else if (bmi < 25) {
    bmiText = 'Normal (healthy weight)';
  } else if (bmi < 30) {
    bmiText = 'Overweight';
  } else {
    bmiText = 'Obese';
  }
  return bmiText;
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
