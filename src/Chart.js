const {Chart} = require('chart.js');
import * as R from 'ramda';
// I created this function only using intuition, dispatch and model are needed? needs to be rethink
//probably should be moved to View file where all other HTML elements are generated. but can it be then done with ChartJS framework?
export default function generateChart(model) {
  const canvas = document.createElement('canvas');
  const ctx_ = canvas.getContext('2d');

  const labels = R.map(expense => expense.description, model);

  console.log(labels);

  new Chart(ctx_, {
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
        data: [12, 19, 3, 17, 28, 24, 7] // and here expenses.price
      }]
    }

  });

  return canvas;

}