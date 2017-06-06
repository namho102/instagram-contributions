var width = 960 ,
	height = 136,
	cellSize = 17,
	padding = 0.5;

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

var color = d3.scaleQuantize()
        .domain([-.05, .05])
        .range(d3.range(11).map(function(d) { return "q" + d + "-11"; }));

var svg = d3.select("#chart").selectAll("svg")
	.data(d3.range(2008, 2011))
	.enter().append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("class", "RdYlGn")
	.append("g")


var rect = svg.selectAll(".day")
	.data(function(d) {
		// console.log(d);
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
		var week_diff = week(d) - week(new Date(year(d), 0, 1));
		// console.log(week_diff);
		return week_diff * cellSize + padding;
		
	})
	.attr("y", function(d) {

		return day(d) * cellSize + padding;
	})
	.datum(d3.timeFormat("%Y-%m-%d"));

d3.csv("dji.csv", function(error, csv) {
	var data = d3.nest()
		.key(function(d) { return d.Date; })
		.rollup(function(d) { console.log(d); return (d[0].Close - d[0].Open) / d[0].Open; })
		.map(csv);

	console.log(data);	
	rect.filter(function(d) { return d in data; })
		.attr("class", function(d) { console.log(d); return "day " + color(data[d]); })
		.select("title")
		.text(function(d) { return d + ": " + percent(data[d]); });


});