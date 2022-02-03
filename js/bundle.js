// window.$ = window.jQuery = require('jquery');
let numberCountriesCFM = 0;
let regionsArr = ['All regions'],
    organisationsArr = ['All organizations'];
let countriesISO3Arr = [];
let emergenciesArr = ['COVID-19', 'Ebola', 'Dengue'];

function choroplethMap(){
    mapsvg.selectAll('path').each( function(element, index) {
        // console.log(element)
        d3.select(this).transition().duration(500).attr('fill', function(d){
            //var filtered = filteredCfmData.filter(pt => pt['ISO3']== d.properties.ISO_A3);
            return '#ccc';
        });
    });
}

function generateDefaultDetailPane(){
    var orgNums = organisationsArr.length - 1;
    $('.details > h6').text('global overwiew');
    $('#globalStats').html('');
    $('#globalStats')
        .append(
            '<div class="row">'+
                '<div class="col-sm-4 key-figure">'+
                    '<div class="num" id="totalCfms">'+cfmData.length+'</div>'+
                    '<h5># feedback mechanisms</h5>'+
                '</div>'+
                '<div class="col-sm-4 key-figure">'+
                    '<div class="num" id="countriesCFM">'+countriesISO3Arr.length+'</div>'+
                    '<h5># countries</h5>'+
                '</div>'+
                '<div class="col-sm-4 key-figure">'+
                    '<div class="num" id="orgsCFM">'+orgNums+'</div>'+
                    '<h5># organizations</h5>'+
                '</div>'+
            '</div>'
        );
    $('#overview').addClass('hidden');
    $('#globalStats').removeClass('hidden');
} // generateDefaultDetailPane

function updatePane(data, title){
    var arrCountries = [],
        arrOrgs = [];
    data.forEach(element => {
        arrCountries.includes(element['Country']) ? '' : arrCountries.push(element['Country']);
        arrOrgs.includes(element['Organisation Name']) ? '' : arrOrgs.push(element['Organisation Name']);
    });
    title == "emergency-other" ? title = "Other emergency" : null;
    $('.details > h6').text(title);
    $('#totalCfms').text(data.length);
    $('#countriesCFM').text(arrCountries.length);
    $('#orgsCFM').text(arrOrgs.length);
}

function slugify(texte){
    return texte.toLowerCase()
             .replace(/[^\w ]+/g, '')
             .replace(/ +/g, '-');
}
//return the unique values of given col name
function getColumnUniqueValues(){
    var values = [];
    for (let index = 0; index < arguments.length; index++) {
        var arr = [];
        values.push(arr);
    }
    for (let index = 0; index < arguments.length; index++) {
        var col = arguments[index];
        var arr = [];
        filteredCfmData.forEach(element => {
            arr.includes(element[col]) ? '' : arr.push(element[col]);
        });
        values[index] = arr;
    }

    return values;
}//getColumnUniqueValues

function generateRegionDropdown(){
    var options = "";
    for (let index = 0; index < regionsArr.length; index++) {
        const element = regionsArr[index];
        index == 0 ? options += '<option value="all" selected>' + element + '</option>'  : 
            options += '<option value="' + element + '">' + element + '</option>';
    }
    $('#regionSelect').append(options);
    $('#all').toggleClass('active');

} //generateRegionDropdown

// generate or update the organisation dropdown select
function generateOrgDropdown(data){
    var orgArr = ['All organizations'];
    if(data != undefined) {  
        data.forEach(element => {
            orgArr.includes(element['Organisation Name']) ? '' : orgArr.push(element['Organisation Name']);
        });
    } else {
        orgArr = organisationsArr;
    }
    $('#orgSelect').html('');
    var options = "";
    for (let index = 0; index < orgArr.length; index++) {
        const element = orgArr[index];
        index == 0 ? options += '<option value="all" selected>' + element + '</option>'  : 
            options += '<option value="' + element + '">' + element + '</option>';
    }
    $('#orgSelect').append(options);
    // $('#all').toggleClass('active');

} //generateRegionDropdown


function generateEmergencyTag(){
    var options = "";
    for (let index = 0; index < organisationsArr.length; index++) {
        const element = organisationsArr[index];
        index == 0 ? options += '<option value="all" selected>' + element + '</option>'  : 
            options += '<option value="' + element + '">' + element + '</option>';
    }
    $('#orgSelect').append(options);
    $('#all').toggleClass('active');

} //generateRegionDropdown

// let purposeArr = ['Perception', 'Rumors', 'Questions'],
//     purposeOtherArr = ['suggestions', 'Complaints', 'Accountability'],
//     emergencyArr = ['COVID-19', 'Ebola', 'Dengue'],
//     emergencyOtheArr = ['Protection', 'Migrant', 'Refugeees'];
// // colors 
// let ifrcPink_1 = '#D90368', ifrcPink_2 = '#E27093', ifrcPink_3 = '#E996AD', ifrcPink_4 = '#F0BDC9', ifrcPink_5 = '#FAE7EA';
// let ifrcGreen_1 = '#2F9C67', ifrcGreen_2 = '#78B794', ifrcGreen_3 = '#9EC8AE', ifrcGreen_4 = '#C2DACA', ifrcGreen_5 = '#E9F1EA';
// let ifrcBlue_1 = '#204669', ifrcBlue_2 = '#546B89', ifrcBlue_3 = '#798BA5', ifrcBlue_4 = '#A6B0C3', ifrcBlue_5 = '#DBDEE6';
// let ifrcYellow = '#FCCF9E';
// let mapActiveColor = '#2F9C67',
//     mapInactiveColor = '#C2DACA',//'#d1021a',
//     mapPipelineColor = '#78B794';

// var mapColorRangeDefault = [ifrcBlue_3, ifrcBlue_2, ifrcBlue_1];
// // let mapInactive = '#a6d8e8';

// let numberCountriesCFM = 0;
// let regionsArr = ['All regions'],
//     organisationsArr = ['All organizations'];
// let countriesISO3Arr = [];

// let statusChart ;

// let datatable;

// let focusCovid = ['COVID-19', 'COVID-19, Volcano', 'COVID-19, Accountability'],
//     focusMigrant = ['Migrant'],
//     focusOther = ['Protection'];

// var sort_value = function (d1, d2) {
//     if (d1.value > d2.value) return -1;
//     if (d1.value < d2.value) return 1;
//     return 0;
// }

// // get and set # countries with CFM
// function setCountriesAndOrgCFM(){
//     var arrCountries = [],
//         arrOrgs = [];
//     countriesISO3Arr = [];
//     filteredCfmData.forEach(element => {
//         arrCountries.includes(element['Country']) ? '' : arrCountries.push(element['Country']);
//         arrOrgs.includes(element['Organisation Name']) ? '' : arrOrgs.push(element['Organisation Name']);
//         // regionsArr.includes(element['Region']) ? '' : regionsArr.push(element['Region']);
//         countriesISO3Arr.includes(element['ISO3']) ? '' : countriesISO3Arr.push(element['ISO3']);
//     });
//     $('#totalCfms').text(filteredCfmData.length);
//     $('#countriesCFM').text(arrCountries.length);
//     $('#orgsCFM').text(arrOrgs.length);
// } //setCountriesAndOrgCFM

// // populate regions selections via the data
// function regionSelectionDropdown(){
//     var options = "",
//         orgOptions = "";
//     cfmData.forEach(element => {
//         regionsArr.includes(element['Region']) ? '' : regionsArr.push(element['Region']);
//         organisationsArr.includes(element['Organisation Name']) ? '' : organisationsArr.push(element['Organisation Name']);
//     });
//     for (let index = 0; index < regionsArr.length; index++) {
//         const element = regionsArr[index];
//         index == 0 ? options += '<option value="all" selected>' + element + '</option>'  : 
//             options += '<option value="' + element + '">' + element + '</option>';
//     }
//     for (let index = 0; index < organisationsArr.length; index++) {
//         const element = organisationsArr[index];
//         index == 0 ? orgOptions += '<option value="all" selected>' + element + '</option>'  : 
//         orgOptions += '<option value="' + element + '">' + element + '</option>';
//     }
//     $('#regionSelect').append(options);
//     $('#regionSelect').multipleSelect();

//     $('#orgSelect').append(orgOptions);
//     $('#orgSelect').multipleSelect({
//         filter: true
//     });
// }//regionSelectionDropdown

// // returns a formatted array with purposes/emergencies 
// function getFormattedColumn(item, column){
//     var items = [] ;
//     var arr = item.split(",");
//     var trimedArr = arr.map(x => x.trim());
//     for (let index = 0; index < trimedArr.length; index++) { //remove empty elements
//         if (trimedArr[index]) {
//             items.push(trimedArr[index])
//         }
//     }
//     var formatedPurposes = "";
//     items.forEach(d => {
//         var className = d.toLowerCase();
//         var arrPurpose = ['perception', 'rumors', 'questions'];
//         var arrFocus = ['covid-19', 'ebola'];
//         if (column == 'Purpose') {
//             arrPurpose.includes(className) ? '' : className = 'purpose-other';
//         } else{
//             arrFocus.includes(className) ? '' : className = 'emergency-other';
//         }
        
//         formatedPurposes +='<label class="alert tag-'+className+'">'+d+'</label>';
//     });
//     return formatedPurposes;
// } // getFormattedColumn

// function getDataTableData(data = filteredCfmData){
//     var dtData = [];
//     data.forEach(element => {
//         var cfmstatusColor = ifrcGreen_1;
//         // element['Status'] == "Inactive" ? cfmstatusColor =  ifrcGreen_5 : 
//         // element['Status'] == "Pipeline" ? cfmstatusColor =  ifrcGreen_3 : null;
//         dtData.push([
//                     // '<i class="fa fa-circle fa-md" style="color:'+cfmstatusColor+';"></i>',
//                     '',
//                     element['Country'], 
//                     element['Organisation Name'],  
//                     getFormattedColumn(element['Purpose'], 'Purpose'),
//                     getFormattedColumn(element['Emergency'], 'Emergency'),
//                     element['Link'] != "" ? '<a href="'+element['Link']+'" target="blank"><i class="fa fa-external-link"></i></a>' : "-",
//                     element['id']
//         ]);
//     });

//     return dtData;
// }

// // generate data table
// function generateDataTable(){
//     var dtData = getDataTableData();
//     datatable = $('#datatable').DataTable({
//         data : dtData,
//         "columns": [
//             {   "width": "1%",  
//                 "className": 'details-control', 
//                 "orderable": false,
//                 "data": null,
//                 "defaultContent": '<i class="fa fa-plus-circle"></i>',  
//             },
//             // {"width": "1%","orderable": false},
//             {"width": "15%"},
//             {"width": "20%", "orderable": false},
//             {"width": "45%", "orderable": false},
//             {"width": "50%", "orderable": false},
//             {"width": "1%", "orderable": false}
//             // {"width": "1%", "orderable": false}
//         ],
//         "columnDefs": [
//             {
//                 "className": "dt-head-left",
//                 "targets": "_all"
//             },
//             {
//                 "defaultContent": "-",
//                 "targets": "_all"
//             },
//             {"targets": [6], "visible": false, "orderable": false}
//         ],
//         "pageLength": 10,
//         "bLengthChange": false,
//         "pagingType": "simple_numbers",
//         "order":[[1, 'asc']], 
//         "dom": "lrtp"
//     });

//     $('#datatable tbody').on('click', 'td.details-control', function(){
//         var tr = $(this).closest('tr');
//         var row = datatable.row(tr);

//         if(row.child.isShown()){
//             row.child.hide();
//             tr.removeClass('shown');
//             tr.css('background-color', '#fff');
//             tr.find('td.details-control i').removeClass('fa-minus-circle');
//             tr.find('td.details-control i').addClass('fa-plus-circle');
//         }
//         else {
//             row.child(format(row.data())).show();
//             tr.addClass('shown');
//             tr.css('background-color', '#f5f5f5');
//             $('#cfmDetails').parent('td').css('border-top', 0);
//             // $('#cfmDetails').parent('td').css('padding-top', 0);
//             $('#cfmDetails').parent('td').css('padding', 0);
//             $('#cfmDetails').parent('td').css('background-color', '#f5f5f5');
//             tr.find('td.details-control i').removeClass('fa-plus-circle');
//             tr.find('td.details-control i').addClass('fa-minus-circle');

//         }
//     });
// } //generateDataTable


// function format(arr){
//     var detailsData = cfmData.filter(function(d){ return d['id'] == arr[arr.length -1]});
    
//     var table  = '<table id="cfmDetails" class="tabDetail">'+
//                         '<tr>'+
//                             '<td>&nbsp;</td>'+
//                             '<td>&nbsp;</td>'+
//                             '<td>&nbsp;</td>'+
//                             '<td>'+
//                                 '<table>'+
//                                     '<tbody>'+
//                                         '<tr>'+
//                                             '<td>NAME</td>'+
//                                             '<td>name</td>'+
//                                             '<td>CONTACT</td>'+
//                                             '<td>contact</td>'+
//                                         '</tr>'+
//                                         '<tr>'+
//                                             '<td>COLLECTIVE TOOLS</td>'+
//                                             '<td>collective_tools</td>'+
//                                             '<td>OTHER FOCUS</td>'+
//                                             '<td>other_focus</td>'+
//                                         '</tr>'+
//                                         '<tr>'+
//                                             '<td>SCALE</td>'+
//                                             '<td>scale</td>'+
//                                             '<td>START DATE</td>'+
//                                             '<td>start_date</td>'+
//                                         '</tr>'+
//                                         '<tr>'+
//                                             '<td># FEEDBACK</td>'+
//                                             '<td>feedback</td>'+
//                                             '<td>CHANNEL DETAILS</td>'+
//                                             '<td>channel_details</td>'+
//                                             '<td>PARTNERS</td>'+
//                                             '<td>partners</td>'+
//                                         '</tr>'+
//                                     '</tbody>'+
//                                 '</table>'+
//                             '</td>'+
//                             '<td>&nbsp;</td>'+
//                         '</tr>'
//                  '</table>';
//     return table;
// }

// function generateBarChart(){
//     var data = d3.nest() 
//         .key(function(d) { return d['Status']; })
//         .rollup(function(d) { return d.length ;})
//         .entries(filteredCfmData).sort(sort_value);
//     var arrX = ['x'],
//         arrY = ['Status'];
//     data.forEach(element => {
//         arrX.includes(element.key) ? '' : arrX.push(element.key);
//         arrY.includes(element.key) ? '' : arrY.push(element.value);
//     });
//     var chart = c3.generate({
//         bindto: '#statusChart',
//         size: { height: 100 },
//         // padding: {right: 10, left: 180},
//         data: {
//             x: 'x',
//             columns: [arrX, arrY],
//             type: 'bar'
//         },
//         bar: {
//             width: 10
//         },
//         color: {
//             pattern: [ifrcGreen_2]
//         },
//         axis: {
//             rotated : true,
//           x: {
//               type : 'category',
//               tick: {               
//                 outer: false,
//                 multiline: false,
//                 fit: true,}
//           },
//           y: {
//             tick: {
//                 outer: false,
//                 format: d3.format('d'),
//                 count: 3
//             }
//           } 
//         },
//         // grid: {
//         //      y: {
//         //          show: true
//         //      }
//         // },
//         legend: {
//             show: false
//         },
//         tooltip: {
//             format: {
//                 value: function(value){
//                     return d3.format('d')(value)
//                 }
//             }
//         }
//     }); 
//     return chart;
// } //generateBarChart 

// // return mapActiveColor, mapInactiveColor or mapPipelineColor based on the corresponding status
// function getColorFromStatus(status, cercle = false) {
//     if (cercle){
//         mapActiveColor = ifrcGreen_1,
//         mapPipelineColor = ifrcYellow,
//         mapInactiveColor = 'grey';
//     }
//     var st = status.trim().toLowerCase();
//     var clr = mapInactive;
//     st == 'active' ? clr = mapActiveColor : 
//     st == 'inactive' ? clr = mapInactiveColor :
//     st == 'pipeline' ? clr = mapPipelineColor : null;
//     return clr;
// } //getColorFromStatus 

// // get country CFM color
// function getRightCountryCFMColor(data, cercle = false){
//     if (cercle){
//         mapActiveColor = ifrcGreen_1,
//         mapPipelineColor = ifrcYellow,
//         mapInactiveColor = 'grey';
//     }
//     var color ;
//     if (data.length == 0) {
//         color = mapInactive;//getColorFromStatus(data['Status']);
//     } else if(data.length > 0) {
//         var colors = [];
//         for (let index = 0; index < data.length; index++) {
//             var c = getColorFromStatus(data[index]['Status'], cercle  = cercle);
//             colors.includes(c) ? '' : colors.push(c);            
//         }
//         colors.includes(mapActiveColor) ? color = mapActiveColor :
//         colors.includes(mapPipelineColor) ? color = mapPipelineColor :
//         colors.includes(mapInactiveColor) ? color = mapInactiveColor : null;
        
//     }
//     return color;
// }
// // choropleth map
// function choroplethMap(focusArea = "all"){
//     mapsvg.selectAll('path').each( function(element, index) {
//         // console.log(element)
//         d3.select(this).transition().duration(500).attr('fill', function(d){
//             var filtered = filteredCfmData.filter(pt => pt['ISO3']== d.properties.ISO_A3);
//             return getRightCountryCFMColor(filtered);
//         });
//     });
//     // cercle
//     // mapsvg.selectAll('circle').each( function(element, index) {
//     //     // console.log(element)
//     //     d3.select(this).transition().duration(500).attr("r", 3).attr('fill', function(d){
//     //         var filtered = filteredCfmData.filter(pt => pt['ISO3']== d['ISO_A3']);
//     //         // console.log(filtered)
//     //         return getRightCountryCFMColor(filtered, true);
//     //     });
//     // });
// }

// // update viz based on filtered and selections
// function updateViz() {
//     setCountriesAndOrgCFM();
//     choroplethMap();
//     var data = d3.nest() 
//         .key(function(d) { return d['Status']; })
//         .rollup(function(d) { return d.length ;})
//         .entries(filteredCfmData).sort(sort_value);
//     var arrX = ['x'],
//         arrY = ['Status'];
//     data.forEach(element => {
//         arrX.includes(element.key) ? '' : arrX.push(element.key);
//         arrY.includes(element.key) ? '' : arrY.push(element.value);
//     });
//     // statusChart.load({columns: [arrX, arrY], unload: true });

//     // update datatable
//     var dt = getDataTableData();
//     $('#datatable').dataTable().fnClearTable();
//     $('#datatable').dataTable().fnAddData(dt);

//     // reset CFM purpose text
//     // $('.purpose > span > label').text("(Select Country)");
// } //updateViz

// //filter 
// function purposeByItem(item, arr) {
// 	var included = false;
// 	for (var i=0; i<arr.length; i++) {
// 	  if (item.includes(arr[i])) {
// 	    included = true;
// 	    break;
// 	  }
// 	}
// 	return included;
// }

// function clickButton(){
//     var val = this.value;
//     var colName = (['Perception', 'Rumors', 'Questions', 'purpose-other'].includes(val)) ? 'Purpose' : 
//                 (['COVID-19', 'Ebola', 'emergency-other'].includes(val)) ? 'Emergency' : "";
//     var filteredData = filteredCfmData.filter(function(d){
//         if (colName == 'Purpose') {
//             if (val != 'purpose-other') {
//                 return d['Purpose'].includes(val);
//             } else {
//                 return (d['Purpose'].includes('Suggestions') || d['Purpose'].includes('Complaints') || d['Purpose'].includes('Accountability'));
//             }
//         } else if (colName == 'Emergency') {
//             if (val == 'COVID-19' || val == 'Ebola') {
//                 return d['Emergency'].includes(val);
//             } else {
//                 // return (d['Emergency'].includes('Migrant') || d['Emergency'].includes('Protection') || d['Emergency'].includes('Refugees'));
//                 return (d['Emergency'].includes(['Migrant']) || d['Emergency'].includes(['Refugees']) || d['Emergency'].includes(['Volcano']) || d['Emergency'].includes(['Dengue']) || d['Emergency'].includes(['Protection']) || d['Emergency'].includes(['Youth']));
//             }
//         }
//     });

//     // // update datatable
//     var dt = getDataTableData(filteredData);
//     $('#datatable').dataTable().fnClearTable();
//     $('#datatable').dataTable().fnAddData(dt);
// }// clickButton

// var buttons = document.getElementsByClassName("filter");
// for (var i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener("click", clickButton);        
// }

// function getFilteredDataFromSelection(){
//     var regionSelected = $('#regionSelect').val();
//     var orgSelected = $('#orgSelect').val();
//     if ((regionSelected == "all") && (orgSelected == "all")) {        
//         // reset map zoom to global
//         mapsvg.transition()
//         .duration(750)
//         .call(zoom.transform, d3.zoomIdentity);
//         return cfmData;
//     } else if((regionSelected != "all") && (orgSelected != "all")){
//         return cfmData.filter(function(d){
//             return ((d['Region'] == regionSelected) && (d['Organisation Name'] == orgSelected));
//         }) 
//     } else {
//         var columnOfInterest = "",
//             valueOfInterest = "";
//         if (regionSelected != 'all') {
//             columnOfInterest = 'Region';
//             valueOfInterest = regionSelected;
//         } else {
//             columnOfInterest = 'Organisation Name';
//             valueOfInterest = orgSelected;
//         }
//         return cfmData.filter(function(d){
//             return d[columnOfInterest] == valueOfInterest;
//         })
//     }
// } //getFilteredDataFromSelection
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
// get status formatted in tags
function getFormattedStatus(item){
    var items = [] ;
    var arr = item.split(",");
    var trimedArr = arr.map(x => x.trim());
    for (let index = 0; index < trimedArr.length; index++) { //remove empty elements
        if (trimedArr[index]) {
            items.push(trimedArr[index]);
        }
    }
    var formatedDims = "";
    items.forEach(element => {
        var className = slugify(element);
        formatedDims +='<label class="alert tag-'+className+'">'+element+'</label>';
    });
    return formatedDims;
}//getFormattedStatus

function getDataTableData(data = filteredCfmData){
    var dt = [];
    data.forEach(element => {
        dt.push(
            [
                element['id'],
                element['Organisation Name'],
                element['Country'],
                getFormattedStatus(element['Status']), 
                element['Frequency'], 
                element['Channels'],
                element['Emergency'], 
                element['Link'] != '' ? '<a href="'+element['Link']+'" target="blank"><i class="fa fa-external-link"></i></a>' : null,
                //hidden
                element['Name'], element['Scale'], element['# Feedbacks (last 6 months)'], element['Target'],
                element['Details'], element['Keyword'], element['National Coordination'], element['Inter-agency'],
                element['Partners'], element['Contact email'], element['Status']
            ]);
    });
    return dt;
} //getDataTableData

// generate data table
function generateDataTable(){
    var dtData = getDataTableData();
    datatable = $('#datatable').DataTable({
        data : dtData,
        "columns": [
            {
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": '<i class="fa fa-plus-circle"></i>',
                "width": "1%"
            },
            {"width": "10%"},
            {"width": "15%"},
            {"width": "10%"},
            {"width": "5%"},
            {"width": "25%"},
            {"width": "15%"},
            {"width": "1%"}
        ],
        "columnDefs": [
            {
                "className": "dt-head-left",
                "targets": "_all"
            },
            {
                "defaultContent": "-",
                "targets": "_all"
            },
            {"targets": [8], "visible": false},{"targets": [9], "visible": false},{"targets": [10], "visible": false},
            {"targets": [11], "visible": false},{"targets": [12], "visible": false},{"targets": [13], "visible": false},
            {"targets": [14], "visible": false},{"targets": [15], "visible": false},{"targets": [16], "visible": false},
            {"targets": [18], "visible": false},{"targets": [17], "visible": false}
            // { "searchable" : true, "targets": "_all"},
            // {"type": "myDate","targets": 4}
        ],
        "pageLength": 20,
        "bLengthChange": false,
        "pagingType": "simple_numbers",
        "order":[[1, 'asc']],
        "dom": "Blrtp",
        "buttons": {
            "buttons": [
                {
                    extend: 'excelHtml5',
                    "className": "exportData",
                    exportOptions:{
                        page: ':all',
                        format:{
                            header: function(data, columnIdx){
                                var hd = ['Name', 'Scale', '# Feedbacks (last 6 months)', 'Target', 'Details','Keyword','National Coordination','Inter-agency','Partners', 'Contact email', 'Status'];
                                if(columnIdx >= 8){
                                    return hd[columnIdx-8];
                                }else {
                                    return data;
                                }
                            }
                        }
                    }
                }
            ]
        }
    });

    $('#datatable tbody').on('click', 'td.details-control', function(){
        var tr = $(this).closest('tr');
        var row = datatable.row(tr);
        if(row.child.isShown()){
            row.child.hide();
            tr.removeClass('shown');
            tr.css('background-color', '#fff');
            tr.find('td.details-control i').removeClass('fa-minus-circle');
            tr.find('td.details-control i').addClass('fa-plus-circle');
        }
        else {
            row.child(format(row.data())).show();
            tr.addClass('shown');
            tr.css('background-color', '#f5f5f5');
            $('#cfmDetails').parent('td').css('border-top', 0);
            $('#cfmDetails').parent('td').css('padding', 0);
            $('#cfmDetails').parent('td').css('background-color', '#f5f5f5');
            tr.find('td.details-control i').removeClass('fa-plus-circle');
            tr.find('td.details-control i').addClass('fa-minus-circle');
    
        }
    });
} //generateDataTable

$("#exportTable").on("click", function() {
    // datatable.button( '.buttons-excel' ).trigger();
    console.log("downloading...")
    $(".buttons-excel").trigger("click");
});

function format(arr){
    filtered = cfmData.filter(function(d){ return d['id']==arr[0]; });
    return '<table class="tabDetail" id="cfmDetails" >'+
                '<tr>'+
                    '<td>&nbsp;</td>'+
                    '<td>&nbsp;</td>'+
                    '<td>&nbsp;</td>'+
                    '<td>'+
                        '<table>'+
                            '<tbody>'+
                                '<tr>'+
                                    '<td><strong>Name</strong></td>'+
                                    '<td colspan="2">'+filtered[0]['Name']+'</td>'+
                                    '<td><strong>Start date</strong></td>'+
                                    '<td colspan="2">'+filtered[0]['Start date']+'</td>'+
                                    '<td><strong># Feedback</strong></td>'+
                                    '<td colspan="2">'+filtered[0]['# Feedbacks (last 6 months)']+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td><strong>Scale</strong></td>'+
                                    '<td colspan="2">'+filtered[0]['Scale']+'</td>'+
                                    '<td><strong>National Coordination<strong></td>'+
                                    '<td colspan="2">'+filtered[0]['National Coordination']+'</td>'+
                                    '<td><strong>Partners<strong></td>'+
                                    '<td colspan="2">'+filtered[0]['Partners']+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td><strong>Status<s/trong></td>'+
                                    '<td colspan="2">'+filtered[0]['Status']+'</td>'+
                                    '<td><strong>Interagency</strong></td>'+
                                    '<td colspan="2">'+filtered[0]['Inter-agency']+'</td>'+
                                    '<td><strong>Keywords</strong></td>'+
                                    '<td colspan="2">'+filtered[0]['Keyword']+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td><strong>Target</strong></td>'+
                                    '<td colspan="2">'+filtered[0]['Target']+'</td>'+
                                    '<td><strong>Contact<strong></td>'+
                                    '<td colspan="2">'+filtered[0]['Contact Email']+'</td>'+
                                    '<td><strong>Details<strong></td>'+
                                    '<td colspan="2">'+filtered[0]['Details']+'</td>'+
                            '</tr>'+
                            '</tbody>'+
                        '</table>'+
                    '</td>'+
                    '<td>&nbsp;</td>'+
                '</tr>'+
            '</table>'
}//format

function updateDataTable(data = cfmData){
    var dt = getDataTableData(data);
    $('#datatable').dataTable().fnClearTable();
    $('#datatable').dataTable().fnAddData(dt);

} //updateDataTable

function getFilteredDataFromDropdown(){
    var org = $('#orgSelect').val();
    var region = $('#regionSelect').val();
    var data;
    if(org != "all" && region != "all") {
        data = filteredCfmData.filter(function(d){
            return (d['Region'] == region) && (d['Organisation Name'] == org);
        })
    }
    else {
        org == "all" ? data = filteredCfmData.filter(function(d){ return d['Region'] == region ;}) :
        region == "all" ? data = filteredCfmData.filter(function(d){ return d['Organisation Name'] == org ;}) : '';
    }
    return data;
}//getFilteredDataFromDropdown

// returns a formatted array with purposes/emergencies 
function getFormattedColumn(item){
    var items = [] ;
    var arr = item.split(",");
    var trimedArr = arr.map(x => x.trim());
    for (let index = 0; index < trimedArr.length; index++) { //remove empty elements
        if (trimedArr[index]) {
            items.push(trimedArr[index])
        }
    }
    return items;
} // getFormattedColumn

var buttons = document.getElementsByClassName("filter");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', clickButton);   
}


function findOneEmergency(emergenciesArrTest, arr) {
    return arr.some(function (v) {
        return emergenciesArrTest.indexOf(v) >= 0;
    });
};

// reset all filters and filter only clicked
function clickButton(){
    $('.btn').removeClass('active');
    var filter;
    var colSelected = this.value;
    if (['Active', 'Development', 'Inactive', 'Closed'].includes(colSelected)) {
        // status
        filter = cfmData.filter(function(d){ return d['Status'] == colSelected ;}) ;
    } else{
        // Emergency
        if(emergenciesArr.includes(colSelected)){
            filter = cfmData.filter(function(d){ 
                var arr = getFormattedColumn(d['Emergency']);
                return arr.includes(colSelected) ;}) ;
        }else {
            filter = cfmData.filter(function(d){ 
                var arr = getFormattedColumn(d['Emergency']);
                return !findOneEmergency(emergenciesArr, arr); }) ;
        }
    }    
    
    updateDataTable(filter);
    $('#orgSelect').val('all');
    $('#regionSelect').val('all');
    updateDataTable(filter);
    updatePane(filter, colSelected);

}//clickButton

$('#orgSelect').on('change', function(d){
    var select = $('#orgSelect').val();
    var filter = cfmData;
    select != "all" ? filter = cfmData.filter(function(d){ return d['Organisation Name'] == select ; }): null;
    
    $('#regionSelect').val('all');
    updateDataTable(filter);
    updatePane(filter, select);
});

$('#regionSelect').on('change', function(e){
    var select = $('#regionSelect').val();
    var filter = filteredCfmData;
    
    select != "all" ? filter = filteredCfmData.filter(function(d){ return d['Region'] == select ; }) : null;

    // $('#orgSelect').val('all');
    generateOrgDropdown(filter);

    updateDataTable(filter);
    updatePane(filter, select);

  });

$('#reset-table').on('click', function(){
    $('#regionSelect').val('all');
    generateOrgDropdown();
    generateDefaultDetailPane();
    // reset map selection
    mapsvg.select('g').selectAll('.hasStudy').attr('fill', mapFillColor);
    // if(countrySelectedFromMap){
    var dt = getDataTableData();
    $('#datatable').dataTable().fnClearTable();
    $('#datatable').dataTable().fnAddData(dt)
    // }
});
//v1.0 
let geodataUrl = 'data/wld.json';
let cfmDataUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbPRrmlDfV3WzI-5QizI2ig2AoJo84KS7pSQtXkUiV5BD3s4uxpXqW8rK2sHmNjP2yCavO1XasLyCe/pub?gid=126026288&single=true&output=csv';

let geomData,
    cfmData,
    filteredCfmData;


$( document ).ready(function(){
    function getData(){
        Promise.all([
            d3.json(geodataUrl),
            d3.csv(cfmDataUrl)
        ]).then(function(data){
            geomData = topojson.feature(data[0], data[0].objects.worldtopo12022020);
            var id = 0;
            data[1].forEach(element => {
                element['id'] = id + 1;
                id = id + 1 +Math.floor(Math.random() * 10);
            });
            cfmData = data[1];
            filteredCfmData = data[1];
            var colUniqueValues = getColumnUniqueValues('Country', 'ISO3', 'Region', 'Organisation Name');
            countriesArr = colUniqueValues[0],
            countriesISO3Arr = colUniqueValues[1],
            regionsArr.push(...colUniqueValues[2]),
            organisationsArr.push(...colUniqueValues[3]);
            // var arrEmerg = colUniqueValues[4];
            // arrEmerg.forEach(item => {
            //     var arr = item.split(",");
            //     var trimedArr = arr.map(x => x.trim());
            //     var items = [];
            //     for (let index = 0; index < trimedArr.length; index++) { //remove empty elements
            //         if (trimedArr[index]) {
            //             items.push(trimedArr[index])
            //         }
            //     }
            //     items.forEach(element => {
            //         emergenciesArr.includes(element) ? '' : emergenciesArr.push(element);
            //     });
            // });
            // console.log(emergenciesArr)

            generateDefaultDetailPane();
            generateRegionDropdown();
            generateOrgDropdown();
            initiateMap();
            generateDataTable();
            //remove loader and show vis
            $('.loader').hide();
            $('#main').css('opacity', 1);
        }); // then
    } // getData

    getData();
});

