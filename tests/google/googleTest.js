var sessionID = null;
    
module.exports = {
  
  after : function(browser) {
    updateStatus(sessionID, "error", "error once again");
  },

  "Demo test Google" : function (browser) {
    browser
      .session(function(session) { sessionID = session.sessionID, console.log(session.sessionID) })
      .url("http://www.google.com")
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'nightwatch')
      .waitForElementVisible('button[name=btnG]', 1000)
      .click('button[name=btnG]')
      .pause(1000)
      .assert.containsText('#main', 'The Night Watch 111')
      .end();  
  }
};

function updateStatus(sessionId, newStatus, message) {
    var baseUrl = "https://yogeshpatil2:1qscJEiXnMdazFwW4ft3@www.browserstack.com";
    var sessUpdateUrl = baseUrl + "/automate/sessions/" + sessionId + ".json";
    var newData = "\"{\"status\":\"" + newStatus + "\", \"reason\":\"" + message + "\"}";

    var request = require("request");
    request({uri: sessUpdateUrl, method:"PUT", form:{"status": newStatus,"reason": message}});
};
