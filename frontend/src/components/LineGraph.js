import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5, 6],
        },
      ]}
      width={700}
      height={300}
    />
  );
}