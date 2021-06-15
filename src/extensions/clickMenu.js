//
//  clickMenu.js
//  This file adds a Nightwatch Extension clickMenu()
//  The command is for navigating Adept's menu structure
//  This command uses indexes to access the menu
//
//  clickMenu(index0, index1, index2)
//
//  params:
//    index0 - the index of the top menu (ex 1 = Markets, 2 = Enrollment Reports, etc...
//    index1 - the index of the sub  menu (optional)
//    index2 - the index of the sub sub (optional)
//
//  examples:
//
//    client.clickMenu(1, 2)
//      In this exaample the "Markets" top level will be clicked, 
//      there will be a brief pause, and then the Markets->Georgia
//      will be clicked, then there will be a wait until the page
//      body becomes visible.
//
//    client.clickMenu(3, 5, 1)
//      This will succssively click:
//        Tools
//        Tools->Group Management
//        Tools->Group Management->Contract Editor
//     then there will be a wait until the page body becomes visible.


const MENU_ROOT  = '#ctl00_ctl00_body__MainMenu ul.rmRootGroup';
const MENU_PAUSE = 800;
const PAGE_WAIT  = 20000; // a few pages are slowww. max set at 20 sec

exports.command = function(index0, index1=0, index2=0) {
  //console.log(`@@@ called clickMenu(${index0}, ${index1}, ${index2})`)

  this.click(GetMenuItemSelector(index0)).pause(MENU_PAUSE);
  if (index1){
     this.click(GetMenuItemSelector(index0, index1)).pause(MENU_PAUSE);
  }
  if (index2){
    this.click(GetMenuItemSelector(index0, index1, index2)).pause(MENU_PAUSE);
  }
  return this
    .waitForElementVisible('body', PAGE_WAIT)
    .pause(1000)
};


function GetMenuItemSelector(index0, index1=0, index2=0){
  if (!index1){
    return `${MENU_ROOT} > li.rmItem:nth-child(${index0}) .rmLink .rmExpandDown`;
  }
  if (!index2){
    return `${MENU_ROOT} > li.rmItem:nth-child(${index0}) > .rmSlide > ul > li.rmItem:nth-child(${index1}) > .rmLink span`;
  }
  return `${MENU_ROOT} > li.rmItem:nth-child(${index0}) > .rmSlide > ul > li.rmItem:nth-child(${index1}) > .rmSlide .rmItem:nth-child(${index2}) a span`;
}
