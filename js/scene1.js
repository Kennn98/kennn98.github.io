 // settings
 var margin = {top: 10, right: 10, bottom: 20, left: 50},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#scene1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate("+margin.left+","+margin.top+")");
 
d3.csv("https://kennn98.github.io/data/human-development-index-hdi-2014.csv")
.then( function(data, i) {

    var x_HDI = d3.scaleLinear()
    .domain([0, 1])
    .range([ 0, width - 50 ]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_HDI));

    var y_GNI = d3.scaleLinear()
    .domain([0, 90000])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y_GNI));
    
    var z_GNI = d3.scaleLinear()
    .domain([0, 90000])
    .range([2, 20]);
    
    var colorScale = d3.interpolateHclLong("red","green")

    svg.append('g')
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d, i) { return x_HDI(parseFloat(d.HDI)); } )
    .attr("cy", function (d, i) { return y_GNI(parseInt(d.GNI)); } )
    .attr("r", 5)
    .attr("fill",function (d, i) {return colorScale(parseFloat(d.HDI))})
    .attr("opacity", 0.8)

    svg.append('g')
    .attr('transform', 'translate(' + 20 + ', ' + 50 + ')')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('GNI(usd)')

    svg.append('g')
    .attr('transform', 'translate(' + 380 + ', ' + 360 + ')')
    .append('text')
    .attr('text-anchor', 'middle')
    .text('HDI')
})

// add tool tip

