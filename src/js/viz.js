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

