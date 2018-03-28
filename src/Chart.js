import Chart from 'chart.js';
import * as R from 'ramda';

export default function generateChart(model, ctx) {
  const labels = R.map(expense => expense.description, model.expenses);
  const costs = R.map(expense => expense.price, model.expenses);

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        backgroundColor: [
          "#2ecc71",
          "#3498db",
          "#95a5a6",
          "#9b59b6",
          "#f1c40f",
          "#e74c3c",
          "#34495e"
        ],
        data: costs
      }]
    }

  });
}