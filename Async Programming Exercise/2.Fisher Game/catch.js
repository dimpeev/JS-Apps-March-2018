function attachEvents() {
    const URL = "https://baas.kinvey.com/appdata/kid_r1J8D-q5f/biggestCatches/";
    const USERNAME = "admin";
    const PASSWORD = "password";
    const BASE_64 = btoa(USERNAME + ":" + PASSWORD);
    const headers = {
        "Authorization": "Basic " + BASE_64,
        "Content-type": "application/json"
    };

    $($(".load")[0]).click(loadRecord);
    $($(".add")[0]).click(addRecord);

    function updateRecord() {
        let id = $(this).parent().attr("data-id");

        let angler = $($(this).parent().children(".angler")[0]);
        let weight = $($(this).parent().children(".weight")[0]);
        let species = $($(this).parent().children(".species")[0]);
        let location = $($(this).parent().children(".location")[0]);
        let bait = $($(this).parent().children(".bait")[0]);
        let captureTime = $($(this).parent().children(".captureTime")[0]);

        let record = {
            "angler": angler.val(),
            "weight": Number(weight.val()),
            "species": species.val(),
            "location": location.val(),
            "bait": bait.val(),
            "captureTime": Number(captureTime.val())
        };

        $.ajax({
            method: "PUT",
            url: URL + id,
            headers: headers,
            data: JSON.stringify(record)
        }).catch(() => {
            loadRecord();
            }
        );

    }

    function deleteRecord() {
        let id = $(this).parent().attr("data-id");

        $.ajax({
            method: "DELETE",
            url: URL + id,
            headers: headers,
        }).then(() => {
            $(this).parent().remove();
        }).catch(() => {
            console.log("Delete error");
        });
    }

    function loadRecord() {
        const mainDiv = $("#catches");
        mainDiv.empty();
        $.ajax({
            method: "GET",
            url: URL,
            headers: headers
        }).then(function (catches) {
            for (let c of catches) {
                let catchDiv = $(`<div class="catch" data-id="${c._id}"></div>`);
                let angler = $(`<label>Angler</label><input type="text" class="angler" value="${(c.angler)}"/>`);
                let weight = $(`<label>Weight</label><input type="number" class="weight" value="${Number((c.weight))}"/>`);
                let species = $(`<label>Species</label><input type="text" class="species" value="${(c.species)}"/>`);
                let location = $(`<label>Location</label><input type="text" class="location" value="${(c.location)}"/>`);
                let bait = $(`<label>Bait</label><input type="text" class="bait" value="${(c.bait)}"/>`);
                let captureTime = $(`<label>Capture Time</label><input type="number" class="captureTime" value="${Number(c.captureTime)}"/>`);
                let updateButton = $("<button class=\"update\">Update</button>").click(updateRecord);
                let deleteButton = $("<button class=\"delete\">Delete</button>").click(deleteRecord);

                angler.appendTo(catchDiv);
                weight.appendTo(catchDiv);
                species.appendTo(catchDiv);
                location.appendTo(catchDiv);
                bait.appendTo(catchDiv);
                captureTime.appendTo(catchDiv);
                updateButton.appendTo(catchDiv);
                deleteButton.appendTo(catchDiv);
                catchDiv.appendTo(mainDiv);
            }
        }).catch(function () {
            console.log("Load error");
        });
    }

    function addRecord() {
        let angler = $($("#addForm .angler")[0]);
        let weight = $($("#addForm .weight")[0]);
        let species = $($("#addForm .species")[0]);
        let location = $($("#addForm .location")[0]);
        let bait = $($("#addForm .bait")[0]);
        let captureTime = $($("#addForm .captureTime")[0]);

        let record = {
            "angler": angler.val(),
            "weight": Number(weight.val()),
            "species": species.val(),
            "location": location.val(),
            "bait": bait.val(),
            "captureTime": Number(captureTime.val())
        };

        $.ajax({
            method: "POST",
            url: URL,
            headers: headers,
            data: JSON.stringify(record)
        }).catch(function () {
            console.log("Add error");
        });

        angler.val("");
        weight.val("");
        species.val("");
        location.val("");
        bait.val("");
        captureTime.val("");
    }
}