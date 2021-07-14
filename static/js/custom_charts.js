// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawDevice);

// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['windows', 8],
  ['MacOS', 4],
  ['Android', 1],
  ['iOS', 2],
  ['その他', 2]
]);

  // Optional; add a title and set the width and height of the chart
  var options = {'width':400, 'height':260};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('checkOs'));
  chart.draw(data, options);
}


function drawDevice() {
  var data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['iPhone', 6],
  ['Galaxy', 3],
  ['Xperia', 4],
  ['Huawei', 1],
  ['その他', 2]
]);

  // Optional; add a title and set the width and height of the chart
  var options = {'width':400, 'height':260};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('checkDevice'));
  chart.draw(data, options);
}