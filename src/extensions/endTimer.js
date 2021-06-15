//
//  endTimer.js
//  This file adds a Nightwatch Extension endTimer()
//  this command is to end a timer and print the timer duration.
//
//  endTimer(name)
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

var fs = require('fs');

exports.command = function(name, message=""){
  this.timers = this.timers || {};
  let startTime = this.timers[name];

  if (!startTime){
    console.log(`@@@ Cant find timer '${name}'`);
    return this.pause(100);
  }
  let duration = ((new Date()) - startTime) / 1000;
  let logMessage = message ? 
    `${message} ${duration} seconds}` : 
    `Timer ${name} completed in ${duration} seconds`;

  console.log(`@@@ ${logMessage}`);
  if (this.timerStream){
    this.timerStream.write(logMessage + "\n");
  }
  return this.pause(100);
};

