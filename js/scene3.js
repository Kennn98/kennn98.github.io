 // settings
 var margin = {top: 35, right: 10, bottom: 20, left: 50},
    width = 800 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

var svg = d3.select("#scene3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate("+margin.left+","+margin.top+")");

// Initialize the X-HDI axis
var x = d3.scaleLinear()
  .range([ 0, width - 50 ]);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = svg.append("g")
  .attr("class", "yaxis")

function update(parameter){
  d3.csv("https://kennn98.github.io/data/human-development-index-hdi-2014.csv")
  .then( function(data, i) {
    // svg.selectAll("text").remove()
    // X axis
    x.domain([0, d3.max(data, function(d) { return parseFloat(d.HDI); }) ])
    xAxis.transition().duration(750).call(d3.axisBottom(x))

    // Y axis
    y.domain([0, d3.max(data, function(d) { return parseInt(d[parameter]); }) ]);
    yAxis.transition().duration(750).call(d3.axisLeft(y));

    var colorScale = d3.interpolateHclLong("red","green")

    // variable u: map data to existing bars
    var s = svg.selectAll("circle")
    .data(data)

    // console.log(data[parameter]);
  
    // update bars
    s.enter()
      .append("circle")
      .merge(s)
      .transition()
      .duration(750)
        .attr("cx", function(d) { return x(parseFloat(d.HDI)); })
        .attr("cy", function(d) { return y(parseInt(d[parameter])); })
        .attr("r", 5)
        .attr("height", function(d) { return height - y(parseFloat(d[parameter])); })
        .attr("fill",function (d, i) {return colorScale(parseFloat(d.HDI))})
        .attr("opacity", 0.8)
    
    const x_labelheight = height - 10;
    const x_labelwidth = width - 60;
    svg.append('g')
      .attr('transform', 'translate(' + x_labelwidth + ', ' + x_labelheight + ')')
      .append('text')
      .attr('text-anchor', 'middle')
      .text('HDI')

    // svg.append('g')
    //   .attr('transform', 'translate(' + 20 + ', ' + 50 + ')')
    //   .append('text')
    //   .attr('text-anchor', 'middle')
    //   .attr('transform', 'rotate(-90)')
    //   .text(parameter)
})
}

// Initialize the plot with the first dataset
update("GNI")