//
//  startTimer.js
//  This file adds a Nightwatch Extension startTimer()
//  this command is to start a timer
//
//  startTimer(name)
//  
//  params:
//    name - the name of the timer. You can have as many as you want
//
//  example:
//    client
//      .startTimer("main")
//      .url('http://google.com')
//      .waitForElementPresent('body', 1000)
//      .endTimer('main')

exports.command = function(name){
  this.timers = this.timers || {};
  this.timers[name] = new Date();
  return this.pause(100);
};

