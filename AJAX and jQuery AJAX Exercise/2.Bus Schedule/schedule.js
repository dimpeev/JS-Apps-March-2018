function solve() {
    let res = (function() {
        const infoBox = $("#info .info");
        const departButton = $("#depart");
        const arriveButton = $("#arrive");
        let currentStopName = "";
        let nextStopId = "depot";

        let depart = function () {
            getBusStopInfo(nextStopId);
            departButton.attr("disabled", "disabled");
            arriveButton.removeAttr("disabled");
        };

        let arrive = function () {
            updateInfo(`Arriving at ${currentStopName}`);
            departButton.removeAttr("disabled");
            arriveButton.attr("disabled", "disabled");
        };

        function updateInfo(message) {
            infoBox.text(message);
        }

        function getBusStopInfo(id) {
            $.ajax({
                method: "GET",
                url: `https://judgetests.firebaseio.com/schedule/${id}.json`,
                success: (data) => {
                    currentStopName = data["name"];
                    nextStopId = data["next"];
                    updateInfo(`Next stop ${currentStopName}`);
                },
                error: () => {
                    updateInfo("Error");
                }
            })
        }

        return {
            depart,
            arrive
        }
    }());

    return {
        depart: res.depart,
        arrive: res.arrive
    }
}

let result = solve();