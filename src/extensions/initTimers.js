//
//  initTimers.js
//  This file adds a Nightwatch Extension initTimers()
//  this command sets up a timerLog file.
//  this command is optional. If not used, no log is created
//
//  initTimers(logFile, append=false)
//  
//  params:
//    logFile - the name of the logFile
//    append  - An optional param. set to true to append instead of overwrite
//
//  example:
//    client
//      .initTimers("AdeptCrawlerTimeLog.txt", true)
//      .startTimer("main")
//      .url('http://google.com')
//      .waitForElementPresent('body', 1000)
//      .endTimer('main')

var fs = require('fs');

exports.command = function(timerLog, append=false){

  let options = append ? {flags: 'a'} : {};
  this.timerStream = fs.createWriteStream(timerLog, options);
  this.timerStream.write(
    `----------------------------------------------\n` +
    `  Timer log started at ${(new Date()).toLocaleString()}\n` +
    `----------------------------------------------\n`
  );
  return this.pause(100);
};

