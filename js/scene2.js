var margin = {top: 10, right: 10, bottom: 90, left: 45},
width = 1000 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var svg = d3.select("#scene2")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate("+margin.left+","+margin.top+")");

// Parse the Data
d3.csv("https://kennn98.github.io/data/human-development-index-hdi-2014.csv").then( function(data, i) {

var x_Country = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.Country; }))
    .padding(0.03);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_Country))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-50)")
    .style("text-anchor", "end");

var y_GNI = d3.scaleLinear()
    .domain([0, 90000])
    .range([0, height]);
    svg.append("g")
    .call(d3.axisLeft(y_GNI)
    .tickValues([0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000])
    .tickFormat((d, i) => 
        ['90000', '80000', '70000', '60000', '50000', '40000', '30000', '20000', '10000', '0'][i]));

var colorScale = d3.interpolateHclLong("red","green")


// Bars
svg.selectAll("barchart")
.data(data)
.enter()
.append("rect")
.attr("x", function(d) { return x_Country(d.Country); })
.attr("width", x_Country.bandwidth())
.attr("y", function(d) { return height - y_GNI(d.GNI); })
.attr("fill", function (d, i) {return colorScale(parseFloat(d.HDI))})
.attr("height", function(d) { return y_GNI(d.GNI) ; })

// y label
svg.append('g')
    .attr('transform', 'translate(' + 20 + ', ' + 50 + ')')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('GNI(usd)')

const x_labelheight = height - 10;
const x_labelwidth = width - 50;
svg.append('g')
    .attr('transform', 'translate(' + x_labelwidth + ', ' + x_labelheight + ')')
    .append('text')
    .attr('text-anchor', 'middle')
    .text('Country')
    
})