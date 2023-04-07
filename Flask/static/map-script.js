let stateURL = 'https://d3js.org/us-10m.v1.json'
let commodityURL = 'http://127.0.0.1:5000/commodity-map'

var stateData
var commodityData

var svg = d3.select("svg");
var path = d3.geoPath();

let tooltip = d3.select('#tooltip');

let drawMap = () => {
  svg.append("g")
    .attr("class", "states")
    .selectAll("path")
    .data(stateData)
    .enter()
    .append("path")
    .attr("d", path)
    .attr('fill', (stateDataItem) => {
      let id = Number(stateDataItem['id'])
      let state = commodityData.find((item) => {
          return Number(item['State ANSI']) === id
      })
      if(typeof state !== 'undefined'){
          let percentage =parseFloat(String(state['Value']).replace(/,/g, ''))
          if((percentage <= 1000)){
            return 'darkred'
          }else if(percentage <= 10000){
              return 'tomato'
          }else if(percentage <= 25000){
              return 'orange'
          }else if(percentage <= 50000){
              return 'lightgreen'
          }else{
              return 'limegreen'
          }
      }else{
          return 'blue'
      }
  })
  .attr('data-fips', (stateDataItem) => {
    return Number(stateDataItem['id'])
  })
  .attr('data-commodity', (stateDataItem) => {
    let id = Number(stateDataItem['id'])
    let state = commodityData.find((item) => {
      return Number(item['State ANSI']) === id
    })
    if(typeof state !== 'undefined'){
      let percentage = parseFloat(String(state['Value']).replace(/,/g, ''))
      return percentage
    }else{
      return 'UNDEFINED'
    }
  })
  .on('mouseover', (stateDataItem) => {
    console.log('on mouseover')
    console.log(stateDataItem.target.getAttribute('data-fips'))
      let id = Number(stateDataItem.target.getAttribute('data-fips'))
      console.log(id)
      let state = commodityData.find((item) => {
        return Number(item['State ANSI']) === id
      })
      console.log(state)
      
      if(typeof state !== 'undefined'){
        tooltip.text(state['State'] + '  -  ' + state['Value'] + ' operations' )
      }else{tooltip.text('Undefined')}

      tooltip.transition()
          .style('visibility', 'visible')
  })
  .on('mouseout', (stateDataItem) => {
      tooltip.transition()
          .style('visibility', 'hidden')
  })

  svg.append("path")
    .attr("class", "state-borders")
    .attr("d", path(statelineData));
};

d3.json(stateURL).then(
  (us, error) => {
    if(error){
      console.log(error)
    }else{
      stateData = topojson.feature(us, us.objects.states).features
      statelineData = topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })
      console.log(stateData)
      console.log(statelineData)

      d3.json(commodityURL).then(
        (us, error) => {
          if(error){
            console.log(error)
          }else{
            commodityData = us
            console.log(commodityData)
            drawMap()
          }
        }
      )
    }
  }
)