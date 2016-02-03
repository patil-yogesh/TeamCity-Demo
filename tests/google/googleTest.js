var sessionId = null;

module.exports = {
    before: function (browser) {
        browser
                .session(function (session) {
                    sessionId = session.sessionId;
                    console.log("before test suite SeID : " + session.sessionId);
                });
    },
    after: function (browser) {
        /*updateStatus(sessionId, "error", "error once again");*/
        browser.end();
    },
    "Demo test Google": function (browser) {
        var data = browser.globals;

        browser
                .url(data.url)
                .waitForElementVisible('body', 1000)
                .setValue('input[type=text]', 'nightwatch')
                .waitForElementVisible('button[name=btnG]', 1000)
                .click('button[name=btnG]')
                .pause(1000)
                .assert.containsText('#main', 'The Night Watch')
                .end();
    }
};

function updateStatus(sessionId, newStatus, message) {
    var baseUrl = "https://yogeshpatil2:1qscJEiXnMdazFwW4ft3@www.browserstack.com";
    var sessUpdateUrl = baseUrl + "/automate/sessions/" + sessionId + ".json";

    var request = require("request");
    request({uri: sessUpdateUrl, method: "PUT", form: {"status": newStatus, "reason": message}});
}
