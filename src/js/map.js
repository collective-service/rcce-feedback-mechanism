let g, mapsvg, projection, width, height, zoom, path;
let currentZoom = 1;

let countrySelectedFromMap = false;
let mapFillColor = '#9EC8AE', 
    mapInactive = '#fff',//'#f1f1ee',//'#C2C4C6',
    mapActive = '#2F9C67',
    hoverColor = '#78B794';

function initiateMap() {
    width = $('#map').width();
    height = 500;
    var mapScale = width/7.8;
    var mapCenter = [25, 25];

    projection = d3.geoMercator()
        .center(mapCenter)
        .scale(mapScale)
        .translate([width / 2, height / 1.9]);

    path = d3.geoPath().projection(projection);

    zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", zoomed);


    mapsvg = d3.select('#map').append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(zoom)
        .on("wheel.zoom", null)
        .on("dblclick.zoom", null);
    
    mapsvg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%");
    //map tooltips
    var maptip = d3.select('#map').append('div').attr('class', 'd3-tip map-tip hidden');

    g = mapsvg.append("g").attr('id', 'countries')
            .selectAll("path")
            .data(geomData.features)
            .enter()
            .append("path")
            .attr('d',path)
            .attr('id', function(d){ 
                return d.properties.ISO_A3; 
            })
            .attr('class', function(d){
              var className = (countriesISO3Arr.includes(d.properties.ISO_A3)) ? 'hasCFM' : 'inactive';
              return className;
          });
    // cercles 
    // var centroids = mapsvg.append("g")
    //       .attr("class", "centroids")
    //       .selectAll("centroid")
    //       .data(locations)
    //       .enter()
    //         .append("g")
    //         // .append("centroid")
    //         .append("circle")
    //         .attr('id', function(d){ 
    //           return d["ISO_A3"]; 
    //         })
    //         .attr('class', function(d){
    //           var className = (countriesISO3Arr.includes(d["ISO_A3"])) ? 'hasCFM' : 'inactive';
    //           return className;
    //       })
    //       .attr("transform", function(d){ return "translate(" + projection([d.X, d.Y]) + ")"; });
    mapsvg.transition()
    .duration(750)
    .call(zoom.transform, d3.zoomIdentity);

    choroplethMap();

    //zoom controls
    d3.select("#zoom_in").on("click", function() {
        zoom.scaleBy(mapsvg.transition().duration(500), 1.5);
    }); 
    d3.select("#zoom_out").on("click", function() {
        zoom.scaleBy(mapsvg.transition().duration(500), 0.5);
    });
            
    
    // var tipPays = d3.select('#countries').selectAll('path') 
    g.filter('.hasCFM')
    .on("mousemove", function(d){ 
      var countryCfmData = filteredCfmData.filter(c => c['ISO3'] == d.properties.ISO_A3);
      if (countryCfmData.length != 0) {
        var content = '<h5>' + d.properties.NAME_LONG + '</h5>';
        var numActive = 0, 
            numInactive = 0, 
            numPipeline = 0;
        countryCfmData.forEach(element => {
          element['Status'] == 'Active' ? numActive++ :
          element['Status'] == 'Inactive' ? numInactive++ :
          element['Status'] == 'Pipeline' ? numPipeline++ : null;
        });
        content += '<div>' +
              '<div><label><i class="fa fa-circle fa-sm" style="color:#2F9C67;"></i> Active: '+numActive+'</label></div>' +
              '<div><label><i class="fa fa-circle fa-sm" style="color:#9EC8AE;"></i> Pipeline: '+numPipeline+'</label></div>' +
              '<div><label><i class="fa fa-circle fa-sm" style="color:#E9F1EA;"></i> Inactive: '+numInactive+'</label></div>' +
              '</div>';

        showMapTooltip(d, maptip, content);
      }
    //   showMapTooltip(d, maptip, "Qu'est ce qui se passe?");
    })
    .on("mouseout", function(d) { 
      hideMapTooltip(maptip); 
    })
    .on("click", function(d){
      // $('.purpose > span > label').text("( " +d.properties.NAME+" )");
      var data = filteredCfmData.filter(function(p) { return p['ISO3'] == d.properties.ISO_A3 ; });
      var dt = getDataTableData(data);
      $('#datatable').dataTable().fnClearTable();
      $('#datatable').dataTable().fnAddData(dt);
      countrySelectedFromMap = true;
    })

} //initiateMap

function showMapTooltip(d, maptip, text){
var mouse = d3.mouse(mapsvg.node()).map( function(d) { return parseInt(d); } );
maptip
    .classed('hidden', false)
    .attr('style', 'left:'+(mouse[0]+20)+'px;top:'+(mouse[1]+20)+'px')
    .html(text)
}

function hideMapTooltip(maptip) {
    maptip.classed('hidden', true) 
}

// zoom on buttons click
function zoomed(){
    const {transform} = d3.event;
    currentZoom = transform.k;

    if (!isNaN(transform.k)) {
        g.attr("transform", transform);
        g.attr("stroke-width", 1 / transform.k);

    }
}

// zoom on region select
function zoomToRegion(region){
    var isInRegion = true;
    if (region=="All regions"){ //reset map zoom
      mapsvg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
    }
    else{
      // get a country code from the region
      var oneCountry = getFirstCountryOfRegion(region);
      geomData.features.forEach(function(c){
        if (c.properties.ISO_A3 == oneCountry){
          var offsetX = 0;//(isMobile) ? 0 : 50;
          var offsetY = 0;//(isMobile) ? 0 : 25;
          const [[x0, y0], [x1, y1]] = path.bounds(c);
          // d3.event.stopPropagation();
          mapsvg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity
              .translate(width / 2, height / 2)
              .scale(Math.min(3, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
              .translate(-(x0 + x1) / 2 + offsetX, -(y0 + y1) / 2 - offsetY),
            // d3.mouse(mapsvg.node())
          );
        }
      });
    }
  }


// return a country belonging a given region
function getFirstCountryOfRegion(region){
  var country = "";
  region == 'ESAR' ? country = 'BDI' :
  region == 'WCAR' ? country = 'TCD' :
  region == 'AP' ? country = 'MYS' :
  region == 'LAC' ? country = 'COL' :
  region == 'MENA' ? country = 'YEM' :
  region == 'EURO' ? country = 'TUR' : '';
  return country;
} //getFirstCountryOfRegion