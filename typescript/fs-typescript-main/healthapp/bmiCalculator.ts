import { isNotNumber } from "./utils.ts";

export const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightMeters = heightCm / 100;
  const bmi = weightKg / (heightMeters * heightMeters);

  if (bmi < 18.5) return "Underweight";
  if (bmi >= 18.5 && bmi < 25.0) return "Normal range";
  if (bmi >= 25.0 && bmi < 30.0) return "Overweight";
  return "Obese";
};

// Error handling and parsing logic for the command line
try {
  if (process.argv.length < 4) throw new Error('Not enough arguments. Provide height and weight.');
  if (process.argv.length > 4) throw new Error('Too many arguments.');

  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);

  if (isNotNumber(height) || isNotNumber(weight)) {
    throw new Error('Provided values were not numbers!');
  }

  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}