function getInfo() {
    let stopId = $("#stopId").val();
    $.ajax({
        method: "GET",
        url: `https://judgetests.firebaseio.com/businfo/${stopId}.json `,
        success: onSuccess,
        error: onError
    });

    function onSuccess(busStop) {
        let busList = $("#buses");
        busList.empty();
        $("#stopName").text(busStop["name"]);
        for (let busId in busStop["buses"]) {
            $(`<li>Bus ${busId} arrives in ${busStop["buses"][busId]} minutes</li>`).appendTo(busList);
        }
    }

    function onError(error) {
        let busList = $("#buses");
        busList.empty();
        $("#stopName").text("Error");
    }
}