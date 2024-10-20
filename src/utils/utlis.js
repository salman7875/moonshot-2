export const sumTotalChartData = (data) => {
  return data.reduce(
    (acc, cur) => {
      const { A, B, C, D, E, F } = cur;
      acc.A += A;
      acc.B += B;
      acc.C += C;
      acc.D += D;
      acc.E += E;
      acc.F += F;
      return acc;
    },
    { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 }
  );
};

export const formatLabelDate = (str) => {
  const date = new Date(str);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  return `${day}-${month}`;
};
