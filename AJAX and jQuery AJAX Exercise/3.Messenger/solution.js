function attachEvents() {
    (function() {
        let dbUrl = "https://testapp-30196.firebaseio.com/messenger";
        $("#submit").click(submitMessage);
        $("#refresh").click(refreshMessages);
        let author = $("#author");
        let content = $("#content");
        let textArea = $("#messages");

        function submitMessage() {
            let message = {
                author: author.val(),
                content: content.val(),
                timestamp: Date.now()
            };
            $.ajax({
                method: "POST",
                url: dbUrl + ".json",
                data: JSON.stringify(message),
            })

        }

        function refreshMessages() {
            $.ajax({
                method: "GET",
                url: dbUrl + ".json",
                success: updateMessages
            })
        }

        function updateMessages(messages) {
            textArea.empty();
            let allMessages = [];
            for (let id in messages) {
                allMessages.push(messages[id]);
            }
            allMessages = allMessages.sort((a, b) => a["timestamp"] - b["timestamp"]).map((message) => `${message["author"]}: ${message["content"]}`);
            textArea.text(allMessages.join("\n"));
        }
    }())
}