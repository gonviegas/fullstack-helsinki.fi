const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi < 25) {
    return 'Normal (healthy weight)'
  } else if (bmi < 30) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

const height = Number(process.argv[2])
const weight = Number(process.argv[3])

console.log(calculateBmi(height, weight))
