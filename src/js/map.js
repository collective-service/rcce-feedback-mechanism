// map js
let isMobile = $(window).width()<767 ? true : false;
let countriesArr = [];
let g, mapsvg, projection, width, height, zoom, path;
let viewportWidth = window.innerWidth;
let currentZoom = 1;
let mapClicked = false;
let selectedCountryFromMap = "all";
let countrySelectedFromMap = false;
let mapFillColor = '#204669',//'#C2DACA',//'#2F9C67', 
    mapInactive = '#fff',//'#DBDEE6',//'#f1f1ee',//'#C2C4C6',
    mapActive = '#2F9C67',
    hoverColor = '#2F9C67';//'#78B794';

function initiateMap() {
    width = viewportWidth;
    // height = (isMobile) ? 400 : 500;
    height = 500;
    var mapScale = (isMobile) ? width/3.5 : width/10.6;
    var mapCenter = (isMobile) ? [12, 12] : [25, 25];

    projection = d3.geoMercator()
        .center(mapCenter)
        .scale(mapScale)
        .translate([width / 2.9, height / 1.6]);

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
        .attr("height", "100%")
        // .attr("fill", "#99daea");
        .attr("fill", "#ccd4d8");

    //map tooltips
    var maptip = d3.select('#map').append('div').attr('class', 'd3-tip map-tip hidden');

    g = mapsvg.append("g").attr('id', 'countries')
            .selectAll("path")
            .data(geomData.features)
            .enter()
            .append("path")
            .attr('d',path)
            .attr('id', function(d){ 
                return d.properties.countryIso3Code; 
            })
            .attr('class', function(d){
              var className = (countriesISO3Arr.includes(d.properties.ISO_A3)) ? 'hasStudy' : 'inactive';
              return className;
            })
            .attr('fill', function(d){
              return countriesISO3Arr.includes(d.properties.ISO_A3) ? mapFillColor : mapInactive ;
            })
            .attr('stroke-width', .2)
            .attr('stroke', '#ccc');

    mapsvg.transition()
    .duration(750)
    .call(zoom.transform, d3.zoomIdentity);

    // choroplethMap();

    //zoom controls
    d3.select("#zoom_in").on("click", function() {
        zoom.scaleBy(mapsvg.transition().duration(500), 1.5);
    }); 
    d3.select("#zoom_out").on("click", function() {
        zoom.scaleBy(mapsvg.transition().duration(500), 0.5);
    });
    
    var tipPays = d3.select('#countries').selectAll('path') 
    g.filter('.hasStudy')
    .on("mousemove", function(d){ 
        if ( !$(this).hasClass('clicked')) {
            $(this).attr('fill', hoverColor);
        }
        if (!mapClicked) {
            // generateCountrytDetailPane(d.properties.ISO_A3, d.properties.NAME);
        }
        var mouse = d3.mouse(mapsvg.node()).map( function(d) { return parseInt(d); } );
        maptip
            .classed('hidden', false)
            .attr('style', 'left:'+(mouse[0])+'px; top:'+(mouse[1]+25)+'px')
            .html(d.properties.NAME);
        
    })
    .on("mouseout", function(d) { 
        if ( !$(this).hasClass('clicked')) {
            $(this).attr('fill', mapFillColor);
        }
        if (!mapClicked) {
            // generateDefaultDetailPane();
        }
        maptip.classed('hidden', true);
    })
    .on("click", function(d){
        mapClicked = true;
        selectedCountryFromMap = d.properties.NAME ;
        mapsvg.select('g').selectAll('.hasStudy').attr('fill', mapFillColor);

        $(this).attr('fill', hoverColor);
        $(this).addClass('clicked');
        var countryData = filteredCfmData.filter(function(val){
            return d.properties.ISO_A3 == val['ISO3'] ;
        });
        updateDataTable(countryData);
        // desactivate org and reg filters
        
        // generateOverviewclicked(d.properties.ISO_A3, d.properties.NAME);
        // $('.btn').removeClass('active');
        // $('#all').toggleClass('active');
        // $('#regionSelect').val('all');
        
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