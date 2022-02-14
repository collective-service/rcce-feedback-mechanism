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

