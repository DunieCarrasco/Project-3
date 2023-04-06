//init the sample and feature objects

url='http://127.0.0.1:5000/send';
features = [];
colorCodes = [];

let submit = d3.select("#submitButton");
let clearSelection= d3.select("#clearSelection");
let clearPlots=d3.select("#clearPlots");


//######## Fetch the json Data###########
d3.json(url).then(function (jsonData){
    console.log('fetching data..');
    console.log('data is:',jsonData);
    console.log('usdaData Features:',Object.keys(jsonData));

     dataSize = Object.keys(jsonData.Value).length;

     for (var i = 0; i < dataSize; i++) {
         features.push({
             'value_harvested': jsonData.Value_Harvested[i],
             'value_planted': jsonData.Value_Planted[i],
             'value_bearing': jsonData.Value_Bearing[i],
             'value': jsonData.Value[i],
             'year': jsonData.year[i],
             'commodity_desc': jsonData.commodity_desc[i],
             'state_alpha': jsonData.state_alpha[i],
             'statisticcat_desc': jsonData.statisticcat_desc[i],
             'short_desc': jsonData.short_desc[i],
             'group_desc': jsonData.group_desc[i],
         });

     }
     colorCodes = generateRandomHexCode();

});

//######################################


//--------------------------------------
function submitData(){
        
    var stateValues = [];
    d3.select('#states').selectAll("option:checked").each(function () {
        stateValues.push(this.value)
    });
    console.log('state values::', stateValues);

    var produce = [];
    var vegAndGrains = [];
    var fruits = [];
    var years = [];
    d3.select('#VegAndGrain').selectAll("option:checked").each(function () {
        vegAndGrains.push(this.value)
    });
    console.log('vegAndGrains values::', vegAndGrains);

    d3.select('#fruits').selectAll("option:checked").each(function () {
        fruits.push(this.value)
    });
    console.log('fruits values:', fruits);


    produce = vegAndGrains.concat(fruits);


    d3.select('#years').selectAll("option:checked").each(function () {
        years.push(this.value)
    });
    console.log('years values::', years);

    years = years.map(item => parseInt(item));
    console.log('int years values::', years);

    updateNewFeatures(years, stateValues, produce);
}
//--------------- Clear Selections ---------------
function clearDropDowns(){
    window.location.reload(); 
}
//-----------------Clear Plots-----------------
function clearAllPlots(){
    
    Plotly.purge('statesBar');
    Plotly.purge('yearlyBar');
       
    var chart = d3.select('#myChart');
    chart.remove();
    d3.select('#chartReport').append('canvas').attr("id", "myChart");
    
    var chart2 = d3.select('#pieChart');
    chart2.remove();
    d3.select('#pieReport').append('canvas').attr("id", "pieChart");
}
//---------------------------------------------


//################  Functions    ########
function updateNewFeatures(years, state, produce) {

    sample = [];

    sample = features.filter(function (obj) {

        if (produce.indexOf(obj.commodity_desc) == -1)
            return false;
        else if (state.indexOf(obj.state_alpha) == -1)
            return false;
        //else if (obj.year>=years[0] && obj.year<years[1])
        else if (years.indexOf(obj.year) == -1)
            return false;
        else
            return true;

    });

    console.log('sample:', sample);

    if(d3.select("#yearlySummary").property("checked")){
        yearly_barChart(sample);
    }
    if(d3.select("#statesSummary").property("checked")){
        states_barChart(sample);
    }
    if(d3.select("#produceSummary").property("checked")){
        chartProduce(sample);
        //pieChart(sample);
    } 
    if(d3.select("#producePie").property("checked")){
        //pieChart(sample);
        doughnutChart(sample);
    } 
}
//---------------Make random color code---------------
function generateRandomHexCode() {
    hexColorCodes = [];
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
    for (i = 0; i < 40; i++) {
        let hexCode = "#"

        while (hexCode.length < 7) {
            hexCode += digits[Math.round(Math.random() * digits.length)]
        }

        hexColorCodes.push(hexCode);
    }
    return hexColorCodes;
}
//--------------States Bar Chart-------------------------------
function states_barChart(sample_org) {
    // Trace for the State Data

    sample=sample_org.sort((first,second)=>second.value_planted-first.value_planted);
    

    let trace1 = {
        x: sample.map(row => row.state_alpha),
        y: sample.map(row => row.value_harvested),
        type: "bar",
        name: 'Harvested',
        hoverinfo: 'y',
        //orientation: 'h',

    };

    let trace2 = {
        x: sample.map(row => row.state_alpha),
        y: sample.map(row => (row.value_planted + row.value_bearing)),
        type: "bar",
        name: 'Planted',
        hoverinfo: 'y',
        //orientation: 'h',
    };

    // Data trace array
    let traceData = [trace1, trace2];

    // Apply the group barmode to the layout
    let layout = {
        height: 550,
        width: 700,
        yaxis: {
            title: {
                text: 'Area Operated(Acres)'
            }
        },
        xaxis: {
            title: {
                text: 'States'
            }
        },
        title: "States Summary"
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("statesBar", traceData, layout);
}

//-----------------------------------------------------------------
//--------------Years Bar Chart-------------------------------
function yearly_barChart(sample) {
    // Trace for the State Data
    let trace1 = {
        x: sample.map(row => row.year),
        y: sample.map(row => row.value_harvested),
        type: "bar",
        name: 'Harvested',
        // marker: {
        //     color: '#B8A2C8',

        // }
    };

    let trace2 = {
        x: sample.map(row => row.year),
        y: sample.map(row => (row.value_planted + row.value_bearing)),
        type: "bar",
        name: 'Planted',

    };

    // Data trace array
    let traceData = [trace1, trace2];

    // Apply the group barmode to the layout
    let layout = {
        height: 550,
        width: 700,
        barmode: 'stack',
        //hoverinfo: 'none',
        opacity: 0.5,

        xaxis: {
            title: {
                text: 'Area Operated(Acres)'
            }
        },
        yaxis: {
            title: {
                text: 'Years'
            }
        },
        title: "Yearly Summary"
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("yearlyBar", traceData, layout);
}

//-----------------------------------------------------------------

//------------------------------------------------------------
function chartProduce(sample) {
    var x = sample.map(row => row.commodity_desc);
    var x_values = x.filter((value, index, array) => array.indexOf(value) === index);
    console.log('x_values:', x_values);

    var y;
    var y_values = [];
    var total_y = 0;

    var z;
    var z_values = [];
    var total_z = 0;

    for (var i = 0; i < x_values.length; i++) {
        y = sample.filter(row => row.commodity_desc == x_values[i]);
        total_y = 0;
        for (var j = 0; j < y.length; j++) {
            total_y += y[j].value_harvested;
        }
        y_values.push(total_y);

        z = sample.filter(row => row.commodity_desc == x_values[i]);
        total_z = 0;
        for (var j = 0; j < z.length; j++) {
            total_z += z[j].value_planted + z[j].value_bearing;
        }
        z_values.push(total_z);


    }
    console.log('y_values:', y_values);
    console.log('z_values:', z_values);


    var chart = d3.select('#myChart');
    chart.remove();
    d3.select('#chartReport').append('canvas').attr("id", "myChart");


    const ctx = document.getElementById('myChart');


    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: x_values,
            datasets: [{
                label: 'Acres Harvested',
                data: y_values,
                borderWidth: 1
            }, {
                label: 'Acres Planted',
                data: z_values,
                borderWidth: 1
            }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Produce Summary'
                },
                customCanvasBackgroundColor: {
                    color: 'lightGreen',
                }
            },

            scales: {
                y: {
                    beginAtZero: true
                },

            }
        }




    });

}
//------------------ Bubble chars -----------------------------
function bubbleChart(sample) {

    var x = sample.map(row => row.commodity_desc);
    var x_values = x.filter((value, index, array) => array.indexOf(value) === index);
    console.log('x_values:', x_values);

    var y_values = [];
    var total = 0;

    for (var i = 0; i < x_values.length; i++) {
        y = sample.filter(row => row.commodity_desc == x_values[i]);
        total = 0;
        for (var j = 0; j < y.length; j++) {
            total += y[j].value_harvested;
        }
        y_values.push(total);
    }
    console.log('y_values:', y_values);

    var markerSize = [];
    markerSize = y_values.map(function (val) {
        var c = Math.floor(val / 800);
        if (c > 100)
            return 130;
        else
            return c;
    });


    colors = colorCodes.slice(0, y.length);//y_values.map(val => Math.floor(val /40));
    console.log('marker size:', markerSize);


    let trace1 = {
        x: x_values,
        y: y_values,
        //type:'bar',
        mode: 'lines+markers',
        //text: textValues,
        marker: {
            size: 8,
            color: colors,
            opacity: 0.6,
        }
    };

    let layout = {
        height: 450,
        width: 800,
        xaxis: {
            title: {
                text: ''
            }
        },
        yaxis: {
            title: {
                text: 'Area Operated (Acres)'
            }
        }

    };

    var traceData = [trace1];
    Plotly.newPlot("commodityChart", traceData, layout);
}
//-------------------------------------------------
//------------------ Pie chars -----------------------------
function pieChart(sample) {

    var x = sample.map(row => row.commodity_desc);
    var x_values = x.filter((value, index, array) => array.indexOf(value) === index);
    console.log('x_values:', x_values);

    var y_values = [];
    var total = 0;

    for (var i = 0; i < x_values.length; i++) {
        y = sample.filter(row => row.commodity_desc == x_values[i]);
        total = 0;
        for (var j = 0; j < y.length; j++) {
            total += y[j].value_harvested;
        }
        y_values.push(total);
    }
    console.log('y_values:', y_values);

    var markerSize = [];
    markerSize = y_values.map(function (val) {
        var c = Math.floor(val / 800);
        if (c > 100)
            return 130;
        else
            return c;
    });


    colors = colorCodes.slice(0, y.length);//y_values.map(val => Math.floor(val /40));
    console.log('marker size:', markerSize);


    let trace1 = {
        x: x_values,
        y: y_values,
        //type:'bar',
        mode: 'lines+markers',
        //text: textValues,
        marker: {
            size: 8,
            color: colors,
            opacity: 0.6,
        }
    };

    let layout = {
        height: 450,
        width: 800,
        xaxis: {
            title: {
                text: ''
            }
        },
        yaxis: {
            title: {
                text: 'Area Operated (Acres)'
            }
        }

    };

    var traceData = [{
        values: y_values,
        labels: x_values,
        type: 'pie'
      }];
    //var traceData = [trace1];
    Plotly.newPlot("commodityChart", traceData, layout);
}

//-----------------------------------------------

//------------Doughnut Chart-------------------------------
function doughnutChart(sample) {
    var x = sample.map(row => row.commodity_desc);
    var x_values = x.filter((value, index, array) => array.indexOf(value) === index);
    console.log('x_values:', x_values);

    var y;
    var y_values = [];
    var total_y = 0;

    

    for (var i = 0; i < x_values.length; i++) {
        y = sample.filter(row => row.commodity_desc == x_values[i]);
        total_y = 0;
        for (var j = 0; j < y.length; j++) {
            total_y += y[j].value_harvested;
        }
        y_values.push(total_y);

    }
    console.log('y_values:', y_values);


    var chart = d3.select('#pieChart');
    chart.remove();
    d3.select('#pieReport').append('canvas').attr("id", "pieChart");


    const ctx = document.getElementById('pieChart');


    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: x_values,
            datasets: [{
                label: 'Acres Harvested',
                data: y_values,
                borderWidth: 1
            }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Produce Summary'
                },
                customCanvasBackgroundColor: {
                    color: 'lightGreen',
                }
            },

            scales: {
                y: {
                    beginAtZero: true
                },

            }
        }




    });

}

//-------------------------------------------
