

//init the sample and feature objects
const usdaData = 'usda_survey.json';
features = []


let submit = d3.select("#submitButton");
let stats=d3.select("stats");

//Fetch the JSON data and console log it
//#######################################
fetch(usdaData)
    .then((response) => response.json())
    .then(function (jsonData) {

        //console.log('usdaData:',Object.keys(jsonData));

        dataSize = Object.keys(jsonData.Value).length;
        
        for (var i = 0; i < dataSize; i++) {
            features.push({
                'value': jsonData.Value[i],
                'year': jsonData.year[i],
                'commodity_desc': jsonData.commodity_desc[i],
                'state_alpha': jsonData.state_alpha[i],
                'statisticcat_desc': jsonData.statisticcat_desc[i],
                'short_desc': jsonData.short_desc[i],
            });

        }

       updateNewFeatures(years=[2000,2020],['CA','KS', 'MN', 'NE', 'NC', 'TX', 'WI', 'IL', 'IN', 'IA'],['CORN'],'vegetables','area');

       

    });

//################      Functions    #########################
function updateNewFeatures (years,state,produce, groups,statistic){//(years=[2000,2022],state=['CA', 'KS', 'MN', 'NE', 'NC', 'TX', 'WI', 'IL', 'IN', 'IA'],produce=['APPLES'], groups='vegetables',statistic='area'){
    sample=[];

    sample=features.filter(function(obj){
     
        if (produce.indexOf(obj.commodity_desc)== -1)
            return false;
        else if (state.indexOf(obj.state_alpha)== -1)
            return false;
        else if (obj.year>=years[0] && obj.year<years[1])
            return true;
        else
            return false;

    });

    console.log('sample:',sample);
    states_barChart(sample);
    yearly_barChart(sample);
    return sample;
}


//--------------States Bar Chart-------------------------------
function states_barChart(sample) {
   // Trace for the State Data
let trace1 = {
    x: sample.map(row => row.state_alpha),
    y: sample.map(row => row.value),
    type: "bar"
  };

// Data trace array
let traceData = [trace1];

// Apply the group barmode to the layout
let layout = {
    
    xaxis: {
        title: {
            text: 'States'
        }
    },
    yaxis: {
        title: {
            text: 'Area Operated(Acers)'
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
        y: sample.map(row => row.value),
        type: "bar",

       
    };

    // Data trace array
    let traceData = [trace1];

    // Apply the group barmode to the layout
    let layout = {

        //hoverinfo: 'none',
        opacity: 0.5,
         
    yaxis: {
            title: {
                text: 'Area Operated(Acers)'
            }
        },
        title: "Yearly Summary"
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("yearlyBar", traceData, layout);
}

 //-----------------------------------------------------------------
 //------------------ Bubble chars -----------------------------
/*  function bubbleChart(sample) {
    

    //set bubble chart values/layout
    var x_values = sample.map(item => item.commodity_desc);
    var y_values = graphData.map(item => item.sample_values);
    var markerSize = graphData.map(item => Math.floor(item.sample_values/1.5));
    var markerColors=graphData.map(item => item.otu_ids);
    var textValues=graphData.map(item => item.otu_labels);

    
    let trace1 = {
        x: x_values,
        y: y_values,
        mode: 'markers',
        text:textValues,
        marker:{
            size: markerSize,
            color:markerColors,
            opacity:0.6,
        }
    };

    let layout = {
        height: 450,
        width: 800,
        xaxis: {
            title: {
                text: 'OTU ID'
            }
        }

    };

    var traceData = [trace1];
    Plotly.newPlot("bubble", traceData, layout);
} */
//-------------------------------------------------

//update after each submission
  submit.on("click", function() {
       
        
      var stateValues = [];
      d3.select('select') .selectAll("option:checked").each(function () { 
                stateValues.push(this.value) 
      });
      console.log('state values::',stateValues);



        var group=d3.select('input[name="group"]:checked').property("value");
        
        
        var produce=(d3.select('input[name="produce"]').property("value"));
        if (produce.indexOf(',')== -1)
            produce=[produce.toUpperCase()];
        else{
            produceList=[];
            produce=produce.toUpperCase().split(',');
        }
         
        //var stats=d3.select('input[name="stats"]:checked').property("value"); 
        //console.log('stats_radioButton:',stats);
        console.log('group_radioButton:',group);
        console.log('produce:',produce);
       
        

      var years = d3.select('input[name="year"]').property("value");
      if (years.indexOf('-') == -1) {
          start_year = parseInt(years);
          end_year = start_year + 1;
          console.log('start_year', start_year);
          console.log('end_year', end_year);
      }
      else {
          start_year = parseInt(years.split('-')[0]);
          end_year = parseInt(years.split('-')[1]);
          console.log('start_year', start_year);
          console.log('end_year', end_year);
      }   
       
        updateNewFeatures([start_year,end_year],stateValues,produce, 'fruits','area');
      });
    

//#######################################


