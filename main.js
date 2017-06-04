var width = 960,
	height = 136,
	cellSize = 17;

var no_months_in_a_row = Math.floor(width / (cellSize * 7 + 50));
var shift_up = cellSize * 3;

var day = d3.timeFormat("%w"), // day of the week
	day_of_month = d3.timeFormat("%e") // day of the month
	day_of_year = d3.timeFormat("%j")
	week = d3.timeFormat("%U"), // week number of the year
	month = d3.timeFormat("%m"), // month number
	year = d3.timeFormat("%Y"),
	percent = d3.timeFormat(".1%"),
	format = d3.timeFormat("%Y-%m-%d");


var svg = d3.select("#chart").selectAll("svg")
	.data([2017])
	.enter().append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("class", "RdYlGn")
	.append("g")


var rect = svg.selectAll(".day")
	.data(function(d) {
		console.log(d);
		return d3.timeDay.range(new Date(d, 0, 1), new Date(d + 1, 0, 1));
	})
	.enter().append("rect")
	.attr("class", "day")
	.attr("data", function(d) {
		return d;
	})
	.attr("width", cellSize)
	.attr("height", cellSize)
	.attr("x", function(d) {
		var week_diff = week(d) - week(new Date(year(d), 0, 1) )
		console.log(week_diff);
		return week_diff * cellSize;
		
	})
	.attr("y", function(d) {

		return day(d) * cellSize;
	})
	.datum(d3.timeFormat("%Y-%m-%d"));