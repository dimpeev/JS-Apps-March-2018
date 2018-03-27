function attachEvents() {
    const SPECIAL_SYMBOLS = {
        "Sunny": "&#x2600;",
        "Partly sunny": "&#x26C5;",
        "Overcast": "&#x2601",
        "Rain": "&#x2614;",
        "Degrees": "&#176;",
    };
    let location = $("#location");

    $("#submit").click(getForecast);
    async function getForecast() {
        try{
            let location =  await getLocation();
            let currentForecast = await getCurrentForecast(location.code);
            let threeDayForecast = await getThreeDayForecast(location.code);
            display(currentForecast, threeDayForecast);
        }
        catch(err) {
            $("#forecast").fadeOut(500);
        }
    }

    async function getLocation() {
        return new Promise(function(resolve, reject) {
            $.ajax({
                method: "GET",
                url: "https://judgetests.firebaseio.com/locations.json"
            }).then(function(locations) {
                let selectedLocation = locations.filter(loc => loc.name === location.val());
                if(selectedLocation.length !== 1) {
                    reject("City not found.");
                }
                resolve(selectedLocation[0]);
            }).catch(function() {
                reject("No connection to the server.");
            });
        })
    }

    async function getCurrentForecast(code) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                method: "GET",
                url: `https://judgetests.firebaseio.com/forecast/today/${code}.json`
            }).then(function(forecast) {
                resolve(forecast);
            }).catch(function() {
                reject("No connection to the server.");
            });
        })
    }

    async function getThreeDayForecast(code) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                method: "GET",
                url: `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`
            }).then(function(forecast) {
                resolve(forecast);
            }).catch(function() {
                reject("No connection to the server.");
            });
        })
    }

    function display(currentForecast, threeDayForecast) {
        let current = $("#current");
        let upcomming = $("#upcoming");
        current.empty();
        upcomming.empty();

        current.append($("<div class='label'>Current conditions</div>"));
        upcomming.append($("<div class='label'>Three-day forecast</div>"));

        current.append($(`<span class="condition symbol">${SPECIAL_SYMBOLS[currentForecast.forecast.condition]}</span>`));
        current.append($($("<span>").addClass("condition"))
            .append($(`<span class="forecast-data">${currentForecast.name}</span>`))
            .append($(`<span class="forecast-data">${currentForecast.forecast.low + SPECIAL_SYMBOLS["Degrees"] + "/" + currentForecast.forecast.high + SPECIAL_SYMBOLS["Degrees"]}</span>`))
            .append($(`<span class="forecast-data">${currentForecast.forecast.condition}</span>`)));

        for (let forecast of threeDayForecast.forecast) {
            upcomming.append($($("<span>").addClass("upcoming"))
                .append($(`<span class="symbol">${SPECIAL_SYMBOLS[forecast.condition]}</span>`))
                .append($(`<span class="forecast-data">${forecast.low + SPECIAL_SYMBOLS["Degrees"] + "/" + forecast.high + SPECIAL_SYMBOLS["Degrees"]}</span>`))
                .append($(`<span class="forecast-data">${forecast.condition}</span>`)));
        }

        $("#forecast").fadeIn(500);
    }
}