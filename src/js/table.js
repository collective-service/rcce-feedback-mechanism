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
    var statusTag = "all", 
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