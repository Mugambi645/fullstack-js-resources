import { isNotNumber } from "./utils.ts";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = 'you need to put in significantly more hours';

  if (average >= target) {
    rating = 3;
    ratingDescription = 'excellent work, target achieved!';
  } else if (average >= target * 0.5) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

// Error handling and parsing logic for the command line
try {
  if (process.argv.length < 4) {
    throw new Error('Not enough arguments. Provide a target and at least one day of exercise hours.');
  }

  const target = Number(process.argv[2]);
  if (isNotNumber(target)) {
    throw new Error('The target value must be a valid number.');
  }

  const dailyHoursArgs = process.argv.slice(3);
  const dailyHours: number[] = [];

  for (const arg of dailyHoursArgs) {
    if (isNotNumber(arg)) {
      throw new Error('All daily exercise hour inputs must be valid numbers.');
    }
    dailyHours.push(Number(arg));
  }

  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}