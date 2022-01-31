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

function generateOrgDropdown(){
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