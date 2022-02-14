// window.$ = window.jQuery = require('jquery');
let numberCountriesCFM = 0;
let regionsArr = ['All regions'],
    organisationsArr = [];
let countriesISO3Arr = [];
let emergenciesArr = [];

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

function updatePane(data){
    var arrCountries = [],
        arrOrgs = [];
    data.forEach(element => {
        arrCountries.includes(element['Country']) ? '' : arrCountries.push(element['Country']);
        arrOrgs.includes(element['Organisation Name']) ? '' : arrOrgs.push(element['Organisation Name']);
    });
    var title = "Selection(s)";
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
    var orgArr = [];
    if(data != undefined) {  
        data.forEach(element => {
            orgArr.includes(element['Organisation Name']) ? '' : orgArr.push(element['Organisation Name']);
        });
    } else {
        orgArr = organisationsArr;
    }
    orgArr.sort();
    orgArr.unshift("All organisations");
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


function generateEmergencyTags(){
    var labels = "";
    for (let index = 0; index < emergenciesArr.length; index++) {
        const element = emergenciesArr[index];
        const idy = (['COVID-19', 'Epidemics'].includes(element) ? element : "other")
        labels +='<label><button type="button" class="btn btn-secondary emergency" id="'+idy+'" value="'+element+'">'+element+'</button></label>';
    }
    $('.emergencyFilter').append(labels);
    var buttonsEmergency = document.getElementsByClassName("emergency");
    for (var i = 0; i < buttonsEmergency.length; i++) {
        buttonsEmergency[i].addEventListener('click', emergencyFilterclick);   
    }

} //function generateEmergencyTags(){

function getSubValues(lookUp, nestedArr){
    var arrKey = [],
        arrValues = [];
    nestedArr.forEach(element => {
        element.key == lookUp ? arrKey = element.values : null;
    });
    if(arrKey != []){
        arrKey.forEach(element => {
            arrValues.push(element.key)
        });
    }
    return arrValues;
}//getSubValues

function getEmergencyCategory(lookUp){
    var emer ;
    emergencyData.forEach(element => {
        var arr = element.values;
        // for (let index = 0; arr < arr.length; index++) {
        //     const item = arr[index];
        //     console.log(item)
        //     item.key == lookUp ? emer = element.key : null;
        //     break;
        // }
        arr.forEach(item => {
            item.key == lookUp ? emer = element.key : null;
        });
    });
    return emer;
}//getEmergencyCategory

function clearnChannels(channel){
    channel = channel.replace(",", "")
    // var items = [] ;
    // var arr = channel.split(",");
    // var trimedArr = arr.map(x => x.trim());
    // for (let index = 0; index < trimedArr.length; index++) { //remove empty elements
    //     if (trimedArr[index]) {
    //         items.push(trimedArr[index]);
    //     }
    // }
    // console.log(items)
}


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

function getEmergenciesTagged(item){
    var items = getFormattedColumn(item);
    var formattedEmergencies = "";
    items.forEach(element => {
        var className = "tag-";
        if (element == "COVID-19") {
            className += "COVID-19";
        } else {
            var cat = getEmergencyCategory(element);
            cat != "Epidemics" ? className += "other" : className += cat;
        }
        formattedEmergencies +='<label class="alert alert-emergency '+className+'">'+element+'</label>';
    });
    return formattedEmergencies;
}//getEmergenciesTagged

function getDataTableData(data = filteredCfmData){
    var dt = [];
    data.forEach(element => {
        dt.push(
            [
                element['id'],
                element['Organisation Name'],
                element['Country'],
                getFormattedStatus(element['Status']), 
                getEmergenciesTagged(element['Emergency']),
                element['Frequency'], 
                element['Channels'], 
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
            {"width": "8%"},
            {"width": "5%"},
            {"width": "10%"},
            {"width": "5%"},
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
        "pageLength": 10,
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
    $(".buttons-excel").trigger("click");
});

function format(arr){
    console.log(arr)
    filtered = cfmData.filter(function(d){ return d['id']==arr[0]; });
    console.log(filtered)
    return '<table class="tabDetail" id="cfmDetails" >'+
                '<tr>'+
                    '<td>&nbsp;</td>'+
                    '<td>&nbsp;</td>'+
                    '<td>&nbsp;</td>'+
                    '<td>&nbsp;</td>'+
                    '<td>&nbsp;</td>'+
                    '<td>&nbsp;</td>'+
                    '<td>'+
                        '<table style="width:100%;">'+
                            // '<tbody>'+
                            // '<thead>'+
                            //     '<tr>'+
                            //         '<th>Details</th>'+
                            //         '<th></th>'+
                            //         '<th></th>'+
                            //         '<th></th>'+
                            //         '<th></th>'+
                            //         '<th></th>'+
                            //     '</tr>'+
                            // '</thead>'+
                                '<tbody>'+
                                    '<tr>'+
                                        '<td><strong>Name</strong></td>'+
                                        '<td>'+filtered[0]['Name']+'</td>'+
                                        '<td><strong>Start date</strong></td>'+
                                        '<td>'+filtered[0]['Start date']+'</td>'+
                                        '<td><strong>National Coordination</strong></td>'+
                                        '<td>'+filtered[0]['National Coordination']+'</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td><strong>#Feedback</strong></td>'+
                                        '<td>'+filtered[0]['# Feedbacks (last 6 months)']+'</td>'+
                                        '<td><strong>Scale<s/trong></td>'+
                                        '<td>'+filtered[0]['Scale']+'</td>'+
                                        '<td><strong>Interagency</strong></td>'+
                                        '<td>'+filtered[0]['Inter-agency']+'</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td><strong>Target</strong></td>'+
                                        '<td colspan="3">'+filtered[0]['Target']+'</td>'+
                                        '<td><strong>Partners</strong></td>'+
                                        '<td>'+filtered[0]['Partners']+'</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td><strong>Description</strong></td>'+
                                        '<td colspan="3">'+filtered[0]['Details']+'</td>'+
                                        '<td colspan="2" rowspan="2"></td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td><strong>Actions</strong></td>'+
                                        '<td colspan="3"></td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td><strong>Keywords</strong></td>'+
                                        '<td colspan="3">'+filtered[0]['Keyword']+'</td>'+
                                        '<td colspan="2"></td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td><strong>Contact</strong></td>'+
                                        '<td>'+filtered[0]['Contact name']+'</td>'+
                                        '<td>'+filtered[0]['Contact email']+'</td>'+
                                        '<td></td>'+
                                        '<td>button</td>'+
                                        '<td></td>'+
                                    '</tr>'+
                                // '</tbody>'+
                            // '</table>'+
                            //     '<tr>'+
                            //         '<td><strong>Name</strong></td>'+
                            //         '<td colspan="2">'+filtered[0]['Name']+'</td>'+
                            //         '<td><strong>Start date</strong></td>'+
                            //         '<td colspan="2">'+filtered[0]['Start date']+'</td>'+
                            //         '<td><strong># Feedback</strong></td>'+
                            //         '<td colspan="2">'+filtered[0]['# Feedbacks (last 6 months)']+'</td>'+
                            //     '</tr>'+
                            //     '<tr>'+
                            //         '<td><strong>Scale</strong></td>'+
                            //         '<td colspan="2">'+filtered[0]['Scale']+'</td>'+
                            //         '<td><strong>National Coordination<strong></td>'+
                            //         '<td colspan="2">'+filtered[0]['National Coordination']+'</td>'+
                            //         '<td><strong>Partners<strong></td>'+
                            //         '<td colspan="2">'+filtered[0]['Partners']+'</td>'+
                            //     '</tr>'+
                            //     '<tr>'+
                            //         '<td><strong>Status<s/trong></td>'+
                            //         '<td colspan="2">'+filtered[0]['Status']+'</td>'+
                            //         '<td><strong>Interagency</strong></td>'+
                            //         '<td colspan="2">'+filtered[0]['Inter-agency']+'</td>'+
                            //         '<td><strong>Keywords</strong></td>'+
                            //         '<td colspan="2">'+filtered[0]['Keyword']+'</td>'+
                            //     '</tr>'+
                            //     '<tr>'+
                            //         '<td><strong>Target</strong></td>'+
                            //         '<td colspan="2">'+filtered[0]['Target']+'</td>'+
                            //         '<td><strong>Contact<strong></td>'+
                            //         '<td colspan="2">'+filtered[0]['Contact email']+'</td>'+
                            //         '<td><strong>Details<strong></td>'+
                            //         '<td colspan="2">'+filtered[0]['Details']+'</td>'+
                            // '</tr>'+
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

function getFilteredDataFromDropdown(inputData){
    var org = $('#orgSelect').val();
    var region = $('#regionSelect').val();
    var data = (inputData == undefined) ? filteredCfmData : inputData;
    if(org != "all" && region != "all") {
        data = filteredCfmData.filter(function(d){
            return (d['Region'] == region) && (d['Organisation Name'] == org);
        })
    }
    else {
        org == "all" ? data = data.filter(function(d){ return d['Region'] == region ;}) :
        region == "all" ? data = data.filter(function(d){ return d['Organisation Name'] == org ;}) : '';
    }
    return data;
}//getFilteredDataFromDropdown

// get result data from status and emergency filters
function getFilteredDataFromTags(inputData){
    var statusTag = "all", 
        emergencyFilter = "all";
    var data = (inputData == undefined) ? filteredCfmData : inputData;
    for (var i = 0; i < buttonsTags.length; i++) {
        if ($(buttonsTags[i]).hasClass('active')) {
            statusTag = $(buttonsTags[i]).val();
        }
    }
    for (var i = 0; i < buttonsEmergency.length; i++) {
        if ($(buttonsEmergency[i]).hasClass('active')) {
            emergencyFilter = $(buttonsEmergency[i]).val();
        }
    }

    if(statusTag !="all"){
        data = data.filter(function(d){ return d['Status'] == statusTag; });
    }
    if(emergencyFilter != "all"){
        var dt;
        // Emergency
        if(emergenciesArr.includes(emergencyFilter)){
            dt = data.filter(function(d){ 
                var arr = getFormattedColumn(d['Emergency']);
                return arr.includes(emergencyFilter) ;}) ;
        }else {
            dt = data.filter(function(d){ 
                var arr = getFormattedColumn(d['Emergency']);
                return !findOneEmergency(emergenciesArr, arr); }) ;
        }
        data = dt;
    }
    return data;
}//getFilteredDataFromTags

// returns a formatted array with purposes/emergencies 
function getFormattedColumn(item){
    var items = [] ;
    var arr = item.split(",");
    var trimedArr = arr.map(x => x.trim());
    for (let index = 0; index < trimedArr.length; index++) { //remove empty elements
        if (trimedArr[index]) {
            items.push(trimedArr[index]);
        }
    }
    return items;
} // getFormattedColumn

var buttonsTags = document.getElementsByClassName("filter");
for (var i = 0; i < buttonsTags.length; i++) {
    buttonsTags[i].addEventListener('click', statusFilterClick);   
}

var buttonsEmergency = document.getElementsByClassName("emergency");

function findOneEmergency(emergenciesArrTest, arr) {
    return arr.some(function (v) {
        return emergenciesArrTest.indexOf(v) >= 0;
    });
};

function applyAllFilters(){
    var statusTag = $('#statusSelect').val();
    emergencyFilter = "all";
    var org = $('#orgSelect').val();
    var region = $('#regionSelect').val();
    var data = filteredCfmData;
    for (var i = 0; i < buttonsTags.length; i++) {
        if ($(buttonsTags[i]).hasClass('active')) {
            statusTag = $(buttonsTags[i]).val();
        }
    }
    for (var i = 0; i < buttonsEmergency.length; i++) {
        if ($(buttonsEmergency[i]).hasClass('active')) {
            emergencyFilter = $(buttonsEmergency[i]).val();
        }
    }

    if(statusTag != "all") {
        data = data.filter(function(d){ return d['Status'] == statusTag; });
    }
    if(region != "all") {
        data = data.filter(function(d){ return d['Region'] == region; });
    }
    if(org != "all") {
        data = data.filter(function(d){ return d['Organisation Name'] == org; });
    }
    if(emergencyFilter != "all"){
        if(emergencyFilter == "COVID-19"){
            data = data.filter(function(d){ 
                var arr = getFormattedColumn(d['Emergency']);
                return arr.includes(emergencyFilter) ;}) ;
        }else {
            var emergencies = getSubValues(emergencyFilter, emergencyData);
            data = data.filter(function(d){
                var arr = getFormattedColumn(d['Emergency']);
                return findOneEmergency(emergencies, arr);
            })
        }
    }
    return data;
}

function emergencyFilterclick(){
    $('.emergency').removeClass('active');
    $(this).toggleClass('active');
    var filter = applyAllFilters();
    updateDataTable(filter); 
    updatePane(filter);
}//emergencyFilterclick

// reset all filters and filter only clicked
function statusFilterClick(){
    $('.filter').removeClass('active');
    $(this).toggleClass('active');
    var filter = applyAllFilters();

    updateDataTable(filter);
    updatePane(filter);
}//statusFilterClick

$('#statusSelect').on('change', function(d){
    var filter = applyAllFilters();
    updateDataTable(filter);
    updatePane(filter);
});

$('#orgSelect').on('change', function(d){
    var filter = applyAllFilters();
    updateDataTable(filter);
    updatePane(filter);
});

$('#regionSelect').on('change', function(e){
    var filter = applyAllFilters();
    updateDataTable(filter);
    updatePane(filter);
  });

$('#reset-table').on('click', function(){
    $('.emergency').removeClass('active');
    $('.filter').removeClass('active');
    
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
let emergencyURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbPRrmlDfV3WzI-5QizI2ig2AoJo84KS7pSQtXkUiV5BD3s4uxpXqW8rK2sHmNjP2yCavO1XasLyCe/pub?gid=1569772209&single=true&output=csv';
let geomData,
    cfmData,
    filteredCfmData,
    emergencyData;

$( document ).ready(function(){
    function getData(){
        Promise.all([
            d3.json(geodataUrl),
            d3.csv(cfmDataUrl),
            d3.csv(emergencyURL)
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
            //Emergency processing
            emergencyData = d3.nest()
                    .key(function(d){ return d['Category'];})
                    .key(function(d){ return d['Emergencies'];})
                    .rollup(function(v){ return d3.sum(v, function(d){ return d.lenght; })})
                    .entries(data[2]);
            emergencyData.forEach(element => {
                emergenciesArr.push(element.key);
            });

            generateEmergencyTags();
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

