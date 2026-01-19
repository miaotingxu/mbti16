import { questions } from '../data/mbtiData';

export const calculateMBTI = (answers: Record<number, string>) => {
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  questions.forEach(q => {
    const answer = answers[q.id];
    if (answer) {
      // answer should be one of 'E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'
      if (answer in scores) {
        scores[answer as keyof typeof scores]++;
      }
    }
  });

  // Determine type based on scores
  // If scores are equal, we can have a default preference or just pick one.
  // Standard MBTI tie-breaking is complex, but for this app we'll use > to favor first letter if tied, or >= for consistent behavior.
  // E vs I: E usually default if tied? Actually I is often safer default. Let's stick to >= for E.
  
  const type = [
    scores.E >= scores.I ? 'E' : 'I',
    scores.S >= scores.N ? 'S' : 'N',
    scores.T >= scores.F ? 'T' : 'F',
    scores.J >= scores.P ? 'J' : 'P'
  ].join('');

  return { type, scores };
};
