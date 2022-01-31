
function getDataTableData(data = filteredCfmData){
    var dt = [];
    data.forEach(element => {
        dt.push(
            [
                element['id'],
                element['Country'],
            // getFormattedDimension(element['dimension']), 
                element['Organisation Name'],
                element['Frequency'], 
                element['Channels'],
                element['Emergency'], 
                '<a href="'+element['Link']+'" target="blank"><i class="fa fa-external-link"></i></a>',
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
            {"targets": [7], "visible": false},{"targets": [8], "visible": false},{"targets": [9], "visible": false},
            {"targets": [10], "visible": false},{"targets": [11], "visible": false},{"targets": [12], "visible": false},
            {"targets": [13], "visible": false},{"targets": [14], "visible": false},{"targets": [15], "visible": false},
            {"targets": [16], "visible": false},{"targets": [16], "visible": false}
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
                                if(columnIdx >= 7){
                                    return hd[columnIdx-7];
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
                                    '<td>'+filtered[0]['Name']+'</td>'+
                                    '<td><strong>Start date</strong></td>'+
                                    '<td>'+filtered[0]['Start date']+'</td>'+
                                    '<td><strong># Feedback</strong></td>'+
                                    '<td>'+filtered[0]['# Feedbacks (last 6 months)']+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td><strong>Scale</strong></td>'+
                                    '<td>'+filtered[0]['Scale']+'</td>'+
                                    '<td><strong>National Coordination<strong></td>'+
                                    '<td>'+filtered[0]['National Coordination']+'</td>'+
                                    '<td><strong>Partners<strong></td>'+
                                    '<td>'+filtered[0]['Partners']+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td><strong>Status<s/trong></td>'+
                                    '<td>'+filtered[0]['Status']+'</td>'+
                                    '<td><strong>Interagency</strong></td>'+
                                    '<td>'+filtered[0]['Inter-agency']+'</td>'+
                                    '<td><strong>Keywords</strong></td>'+
                                    '<td>'+filtered[0]['Keyword']+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td><strong>Target</strong></td>'+
                                    '<td>'+filtered[0]['Target']+'</td>'+
                                    '<td><strong>Contact<strong></td>'+
                                    '<td>'+filtered[0]['Contact Email']+'</td>'+
                                    '<td><strong>Details<strong></td>'+
                                    '<td>'+filtered[0]['Details']+'</td>'+
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

// reset all filters and filter only clicked
function clickButton(){
    $('.btn').removeClass('active');
    var filter;
    var colSelected = this.value;
    if (['Active', 'Under Development', 'Inactive', 'Closed'].includes(colSelected)) {
        // status
        filter = cfmData.filter(function(d){ return d['Status'] == colSelected ;}) ;
    } else{
        // Emergency
        if(['COVID-19', 'Ebola'].includes(colSelected)){
            filter = cfmData.filter(function(d){ 
                var arr = getFormattedColumn(d['Emergency']);
                return arr.includes(colSelected) ;}) ;
        }else {
            filter = cfmData.filter(function(d){ 
                var arr = getFormattedColumn(d['Emergency']);
                return (!arr.includes('COVID-19')) && (!arr.includes('Ebola')) ;}) ;
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
    // filteredCfmData = getFilteredDataFromSelection();

    // filteredCfmData.forEach(element => {
    //     countriesISO3Arr.includes(element['ISO3']) ? '' : countriesISO3Arr.push(element['ISO3']);
    // });
    $('#orgSelect').val('all');
    updateDataTable(filter);
    updatePane(filter, select);
    // reset others filters

    // updateViz();
    // zoom to region 
    // if (select == 'all') {
    //     mapsvg.transition()
    //     .duration(750)
    //     .call(zoom.transform, d3.zoomIdentity);
    // }
    // zoomToRegion(select);
    // reset layers selection to all
    // $('#all').prop('checked', true);

  });

$('#reset-table').on('click', function(){
    $('#regionSelect').val('all');
    $('#orgSelect').val('all');
    generateDefaultDetailPane();
    // reset map selection
    mapsvg.select('g').selectAll('.hasStudy').attr('fill', mapFillColor);
    // if(countrySelectedFromMap){
    var dt = getDataTableData();
    $('#datatable').dataTable().fnClearTable();
    $('#datatable').dataTable().fnAddData(dt)
    // }
});