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

