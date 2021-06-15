
module.exports = {
  '@disabled': true,

  'demo test google' : function (client) {
    client
      .initTimers('timerLog.txt', true)
      .startTimer('global')
      .startTimer('test1')
      .url('http://google.com')
      .waitForElementPresent('body', 1000)
      .endTimer('test1')
  },

  'part two' : function(client) {
    client
      .startTimer('test2')
      .setValue('input[type=text]', ['nightwatch', client.Keys.ENTER])
      .pause(1000)
      .assert.containsText('#main', 'Night Watch')
      .endTimer('test2')
      .endTimer('global', 'All tests completed in')
      .end();
  }
};