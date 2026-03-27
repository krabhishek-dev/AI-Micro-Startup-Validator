export const calculateScore = ({ market, competition, monetization, risk }) => {
  const score =
    (market.score * 3) +
    (monetization.score * 2) +
    (10 - competition.score) * 2 +
    (10 - risk.score) * 3;

  return Math.min(Math.round(score), 100);
};