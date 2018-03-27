function attachEvents() {
    const url = "https://testapp-30196.firebaseio.com/phonebook";
    const person = $("#person");
    const phone = $("#phone");

    //Load contacts
    $("#btnLoad").click(loadContacts);
    function loadContacts() {
        $.ajax({
            method: "GET",
            url: url + ".json",
            success: renderContacts
        });

        function renderContacts(contacts) {
            let phonebook = $("#phonebook");
            phonebook.empty();
            for (let id in contacts) {
                let li = $(`<li>${contacts[id]["person"]}: ${contacts[id]["phone"]} </li>`);
                let button = $("<button>[Delete]</button>").click(() => {
                    deleteContact.bind(button)(id);
                });
                button.appendTo(li);
                li.appendTo(phonebook);
            }

            function deleteContact(id) {
                $.ajax({
                    method: "DELETE",
                    url: url + `/${id}` +".json",
                    success: () => { this.parent().remove() }
                });
            }
        }
    }

    //Add contact
    $("#btnCreate").click(createContact);
    function createContact() {
        let contact = {
            person: person.val(),
            phone: phone.val()
        };
        $.ajax({
            method: "POST",
            url: url + ".json",
            data: JSON.stringify(contact)
        });
        person.val("");
        phone.val("");
    }
}