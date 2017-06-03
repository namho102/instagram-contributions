var width = 960,
	height = 136,
	cellSize = 17;


var svg = d3.select("#chart").selectAll("svg")
	.data(d3.range(2016, 2017))
	.enter().append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("class", "RdYlGn")
	.append("g")


