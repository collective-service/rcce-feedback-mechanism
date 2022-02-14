let numberCountriesCFM = 0;
let regionsArr = ['All regions'],
    organisationsArr = ['All organizations'];
let countriesISO3Arr = [];
let emergenciesArr = ['COVID-19'];

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
