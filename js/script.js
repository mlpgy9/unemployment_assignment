// $(document).ready(function() {
//     console.log("Hello world.")
// });
// 


var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    };

var width = $(".chart").width() - margin.left - margin.right;
var height = $(".chart").height() - margin.top - margin.bottom;

var formatDate = d3.time.format("%Y-%d-%m");

// var x = d3.time.scale()
//     .range([0, width]);

// changed from time.scale to scale.linear for  range of months 0, 11 -- FOR REFERENCE: http://stackoverflow.com/questions/32948462/d3-js-error-invalid-value-for-path-attribute-for-a-line-chart

 var x = d3.scale.linear()
    .range([0, 11]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.observation_date); })
    .y(function(d) { return y(d.Year); });

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//END OF GLOBAL VARIABLES 

//WHERE THE DATA IS LOADED

d3.csv("unemployment.csv", type, function(error, data) {

  console.log(data);

  if (error) throw error;
  
//LOCAL VARIABLES HERE

// var Year = d3.extent(data, function(d) {
//         return +d.observation_date;
//     });
// var unemploymentRate = d3.extent(data, function(d) {
//         return +d.CLMUR;
//     });

//     x.domain(
//     data.map(function(d){
//     console.log(d);
//     return d.CLMUR;
//     })
//     );
// 
// for (i = 0; i < data.length; i++) {
//                 data[i].Year = parseYear(data[i].Year);
//             }
    


    
    /* ----------------- */
    // Set your domains for time and values here.
    // Use the line chart example as your guide.
    // Don't use what you've commented out above. It won't work!!
    // Time domain is an array of two values: earliest and latest date.
    // Values domain is an array of two values: lowest and highest values.
    /* ----------------- */

    // var timeDomain = --> Your work here.
    // var valueDomain = --> Your work here.

    x.domain(Year).nice();
    y.domain(unemploymentRate).nice();


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
        .attr("class", "label")
        .attr("x", width/2)
        .attr("y", -6)
        .style("text-anchor", "middle")
        .text("Year");
        
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Unemployment Rate");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
})

function type(d) {
  d.observation_date = formatDate.parse(d.observation_date);
  d.CLMUR = +d.CLMUR;
  return d;
}

// function type(d) {
//   d.date = formatDate.parse(d.date);
//   d.close = +d.close;
//   return d;
// }
