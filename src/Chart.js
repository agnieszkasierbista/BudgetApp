// //I don't know where to put it ;)
// window.onload = function () {
//   var chart = new CanvasJS.Chart("chartContainer",
//     {
//       title: {
//         text: "Gaming Consoles Sold in 2012"
//       },
//       legend: {
//         maxWidth: 350,
//         itemWidth: 120
//       },
//       data: [
//         {
//           type: "pie",
//           showInLegend: true,
//           legendText: "{indexLabel}",
//           dataPoints: [
//             { y: 4181563, indexLabel: "PlayStation 3" },
//             { y: 2175498, indexLabel: "Wii" },
//             { y: 3125844, indexLabel: "Xbox 360" },
//             { y: 1176121, indexLabel: "Nintendo DS" },
//             { y: 1727161, indexLabel: "PSP" },
//             { y: 4303364, indexLabel: "Nintendo 3DS" },
//             { y: 1717786, indexLabel: "PS Vita" }
//           ]
//         }
//       ]
//     });
//   chart.render();
// }


// I created this function only using intuition, dispatch and model are needed? needs to be rethink
export function showchart(dispatch, model) {
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["M", "T", "W", "T", "F", "S", "S"], //here I'd like to add expenses.description
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
}