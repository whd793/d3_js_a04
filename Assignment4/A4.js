var tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return '<strong>Name: </strong> <span class="details">'
    + d.properties.NAME + '<br /></span> <strong>Total: </strong> <span class="details">' + d.total + '</span>'; });


var width = 1500,
    height = 800;

var color = ["#d6fff6", "#a5ffeb", "#6dffde", "#00d6ab"];



var projection = d3.geoAlbers()
    .scale(10000)
    .translate([-width / 2.6, height - 100]);

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g");

var legendText=[]

svg.call(tip);

createLegend();

function createLegend(){
    for(var i=0;i<color.length;i++){
        svg.attr('class','Legend'+(i+1))
            .append('rect')
            .attr('x',1150)
            .attr('y',400+i*50)
            .attr('width',20)
            .attr('height',20)
            .attr('fill',color[i]);
    }
}

g.append("text")
    .attr("x", 1200)
    .attr("y", 415)
    .text("Less than -2%");

g.append("text")
    .attr("x", 1200)
    .attr("y", 465)
    .text("Less than 0%");

g.append("text")
    .attr("x", 1200)
    .attr("y", 515)
    .text("Less than 2%");

g.append("text")
    .attr("x", 1200)
    .attr("y", 565)
    .text("Less than 5%");

var dataEst2016 = new Array();
var dataEst2015 = new Array();
var dataEst2014 = new Array();
var dataEst2013 = new Array();

d3.csv("2016.csv", function (data) {
    d3.json("indiana.json", function (error, indiana) {

        if (error) throw error;

        for (var i = 0; i < data.length; i++) {
            var dataID = data[i].geoid;
            dataEst2016[i] = data[i].est;

            for (var j = 0; j < indiana.objects.cb_2015_indiana_county_20m.geometries.length; j++) {
                var jsonID = "AA" + indiana.objects.cb_2015_indiana_county_20m.geometries[j].properties["GEOID"];

                if (dataID == jsonID) {
                    indiana.objects.cb_2015_indiana_county_20m.geometries[j].properties["EST2016"] = dataEst2016[j];
                }
            }
        }
    })
})

d3.csv("2015.csv", function (data) {
    d3.json("indiana.json", function (error, indiana) {

        if (error) throw error;

        for (var i = 0; i < data.length; i++) {
            var dataID = data[i].geoid;
            dataEst2015[i] = data[i].est;

            for (var j = 0; j < indiana.objects.cb_2015_indiana_county_20m.geometries.length; j++) {
                var jsonID = "AA" + indiana.objects.cb_2015_indiana_county_20m.geometries[j].properties["GEOID"];

                if (dataID == jsonID) {
                    indiana.objects.cb_2015_indiana_county_20m.geometries[j].properties["EST2015"] = dataEst2015[j];
                }
            }
        }
    })
})

d3.csv("2014.csv", function (data) {
    d3.json("indiana.json", function (error, indiana) {

        if (error) throw error;

        for (var i = 0; i < data.length; i++) {
            var dataID = data[i].geoid;
            dataEst2014[i] = data[i].est;

            for (var j = 0; j < indiana.objects.cb_2015_indiana_county_20m.geometries.length; j++) {
                var jsonID = "AA" + indiana.objects.cb_2015_indiana_county_20m.geometries[j].properties["GEOID"];

                if (dataID == jsonID) {
                    indiana.objects.cb_2015_indiana_county_20m.geometries[j].properties["EST2014"] = dataEst2014[j];
                }
            }
        }
    })
})

d3.csv("2013.csv", function (data) {
    d3.json("indiana.json", function (error, indiana) {

        if (error) throw error;

        for (var i = 0; i < data.length; i++) {
            var dataID = data[i].geoid;
            dataEst2013[i] = data[i].est;

            for (var j = 0; j < indiana.objects.cb_2015_indiana_county_20m.geometries.length; j++) {
                var jsonID = "AA" + indiana.objects.cb_2015_indiana_county_20m.geometries[j].properties["GEOID"];

                if (dataID == jsonID) {
                    indiana.objects.cb_2015_indiana_county_20m.geometries[j].properties["EST2013"] = dataEst2013[j];
                }
            }
        }
    })
})

function changeMap() {
    d3.csv("2012.csv", function (data) {
            d3.json("indiana.json", function (error, indiana) {

                if (error) throw error;

                for (var i = 0; i < data.length; i++) {
                    var dataID = data[i].geoid;
                    dataEst2012[i] = data[i].est;

                    for (var j = 0; j < indiana.objects.cb_2015_indiana_county_20m.geometries.length; j++) {
                        var jsonID = "AA" + indiana.objects.cb_2015_indiana_county_20m.geometries[j].properties["GEOID"];

                        if (dataID == jsonID) {
                            indiana.objects.cb_2015_indiana_county_20m.geometries[j].properties["EST2012"] = dataEst2012[j];
                        }
                    }
                }

                for (var i = 0; i < data.length; i++) {
                    indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["EST2012"] = dataEst2012[i];
                    if (flag == 0) {
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["GROWTH"] = (Math.round(((dataEst2016[i] - dataEst2012[i]) / dataEst2012[i]) * 10000) / 100) + "%";
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["EST"] = dataEst2016[i];
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["EST2012"] = dataEst2012[i];
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["EST2013"] = dataEst2013[i];
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["EST2014"] = dataEst2014[i];
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["EST2015"] = dataEst2015[i];
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["EST2016"] = dataEst2016[i];
                        var pGrowth = parseFloat((dataEst2016[i] - dataEst2012[i]) / dataEst2012[i]);
                    }
                    else {
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["GROWTH"] = (Math.round(((dataEst2013[i] - dataEst2012[i]) / dataEst2012[i]) * 10000) / 100) + "%";
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["EST"] = dataEst2013[i];
                        var pGrowth = parseFloat((dataEst2013[i] - dataEst2012[i]) / dataEst2012[i]);
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["EST2012"] = dataEst2012[i];
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["EST2013"] = dataEst2013[i];
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["EST2014"] = dataEst2014[i];
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["EST2015"] = dataEst2015[i];
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["EST2016"] = dataEst2016[i];
                    }

                    if (pGrowth >= -0.05 && pGrowth < -0.02) {
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["COLOR"] = color[0];
                    }
                    else if (pGrowth >= -0.02 && pGrowth < -0.00) {
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["COLOR"] = color[1];
                    }
                    else if (pGrowth >= 0.00 && pGrowth < 0.02) {
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["COLOR"] = color[2];
                    }
                    else {
                        indiana.objects.cb_2015_indiana_county_20m.geometries[i].properties["COLOR"] = color[3];
                    }
                }

                g.append("g")
                    .attr("id", "states")
                    .selectAll("path")
                    .data(topojson.feature(indiana, indiana.objects.cb_2015_indiana_county_20m).features)
                    .enter()
                    .append("path")
                    .attr("fill", function (d) {
                        return d.properties["COLOR"];
                    })
                    .on("mouseover", function (d) {
                        tip.show(d)
                        originalColor = d3.select(this).style("fill");
                        console.log(d);
                        d3.select(this)
                            .style('fill', 'yellow');
                    })
                    .on("mouseout", function (d) {
                        tip.hide(d)
                        d3.select(this)
                            .style('fill', originalColor);
                    })
                    .on("click", function (d) {
                        d3.selectAll("#state-text").remove();

                        var name = d.properties["NAME"];
                        var est2012 = d.properties["EST2012"];
                        var est = d.properties["EST"];
                        var growth = d.properties["GROWTH"];

                        g.append("text")
                            .attr("id", "state-text")
                            .attr("font-weight", "bold")
                            .attr("x", 180)
                            .attr("y", 100)
                            .text("County Name: " + name);

                        g.append("text")
                            .attr("id", "state-text")
                            .attr("x", 180)
                            .attr("y", 130)
                            .attr("fill", "red")
                            .text("2012 Estimation: " + est2012);

                        if (flag == 0) {
                            g.append("text")
                                .attr("id", "state-text")
                                .attr("x", 180)
                                .attr("y", 160)
                                .attr("fill", "green")
                                .text("2016 Estimation: " + est);
                        }
                        else {
                            g.append("text")
                                .attr("id", "state-text")
                                .attr("x", 180)
                                .attr("y", 160)
                                .attr("fill", "green")
                                .text("2013 Estimation: " + est);
                        }

                        g.append("text")
                            .attr("id", "state-text")
                            .attr("x", 180)
                            .attr("y", 190)
                            .attr("fill", "blue")
                            .text("Growth: " + growth);

                        /*createBarChart*/
                        d3.selectAll("#chartRect").remove();
                        d3.selectAll("#chartLabel").remove();
                        d3.selectAll("#chart").remove();

                        var chartWidth = 400;
                        var chartHeight = 300;

                        svg.append("rect")
                            .attr("id", "chart")
                            .attr("width", chartWidth)
                            .attr("height", chartHeight)
                            .attr("x", 80)
                            .attr("y", 270);

                        var dataset = [d.properties["EST2012"], d.properties["EST2013"], d.properties["EST2014"], d.properties["EST2015"], d.properties["EST2016"]];
                        var dataMax = Math.max(d.properties["EST2012"], d.properties["EST2013"], d.properties["EST2014"], d.properties["EST2015"], d.properties["EST2016"]);

                        var barPadding = 25;
                        var barWidth = (400 / dataset.length);

                        var barChart = svg.selectAll("#chartRect")
                            .data(dataset)
                            .enter()
                            .append("rect")
                            .attr("id", "chartRect")
                            .attr("x", 80)
                            .attr("y", function (d) {
                                return 570 - (d - (parseInt(d * 0.001) - 1) * 1000) / (dataMax - (parseInt(dataMax * 0.001) - 1) * 1000) * 150;
                            })
                            .attr("height", function (d) {
                                return (d - (parseInt(d * 0.001) - 1) * 1000) / (dataMax - (parseInt(dataMax * 0.001) - 1) * 1000) * 150;
                            })
                            .attr("width", barWidth - barPadding)
                            .attr('fill','#4286f4')
                            .attr("transform", function (d, i) {
                                var translate = [12.5 + barWidth * i, 0];
                                return "translate(" + translate + ")";
                            })

                        barChart = svg.selectAll("#chartLabel")
                            .data(dataset)
                            .enter()
                            .append("text")
                            .attr("id", "chartLabel")
                            .attr("x", 80)
                            .attr("y", function (d) {
                                return 570 - (d - (parseInt(d * 0.001) - 1) * 1000) / (dataMax - (parseInt(dataMax * 0.001) - 1) * 1000) * 150 - 5;
                            })
                            .attr("transform", function (d, i) {
                                var translate = [20 + barWidth * i, 0];
                                return "translate(" + translate + ")";
                            })
                            .text(function (d) {
                                return d;
                            })

                        var label = ["2012", "2013", "2014", "2015", "2016"];

                        barChart = svg.selectAll("svg")
                            .data(label)
                            .enter()
                            .append("text")
                            .attr("id", "chartLabel")
                            .attr("x", 80)
                            .attr("y", 585)
                            .attr("transform", function (d, i) {
                                var translate = [22.5 + barWidth * i, 0];
                                return "translate(" + translate + ")";
                            })
                            .text(function (d) {
                                return d;
                            })
                    })
                    .attr("d", path)

                g.append("path")
                    .datum(topojson.mesh(indiana, indiana.objects.cb_2015_indiana_county_20m, function (x, k) {
                        return x != k;
                    }))
                    .attr("id", "state-borders")
                    .attr("d", path);
            })
        }
    )
}

var flag = 0;

function changeButton1Color() {
    flag = 0;
    var x = document.getElementById("button1").style.background;

    if (x != "red") {
        document.getElementById("button1").style.background = "red";
        document.getElementById("button2").style.background = "black"
    }
}

function changeButton2Color() {
    flag = 1;
    var x = document.getElementById("button2").style.background;

    if (x != "red") {
        document.getElementById("button1").style.background = "black";
        document.getElementById("button2").style.background = "red";
    }
}