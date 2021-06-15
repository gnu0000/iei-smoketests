//
//  clickMenuX.js
//  This file adds a Nightwatch Extension clickMenuX()
//  the command is for navigating Adept's menu structure
//  This command uses Link names to access the menu
//
//  clickMenuX(menu0, menu1, menu2)
//
//  params:
//    menu0 - the text of the top menu (ex "Markets", "Enrollment Reports", etc...)
//    menu1 - the text of the sub  menu (optional)
//    menu2 - the text of the sub sub (optional)
//
//  examples:
//    client.clickMenuX("Markets", "Georgia")
//      In this exaample the "Markets" top level will be clicked, 
//      there will be a brief pause, and then the Markets->Georgia
//      will be clicked, then there will be a wait until the page
//      body becomes visible.
//
//    client.clickMenuX("Tools", "Group Management", "Contract Editor")
//      This will succssively click:
//        Tools
//        Tools->Group Management
//        Tools->Group Management->Contract Editor
//     then there will be a wait until the page body becomes visible.



const MENU_ROOT  = '//*[@id="ctl00_ctl00_body__MainMenu"]';
const MENU_PAUSE = 550;
const PAGE_WAIT  = 20000; // a few pages are slowww. max set at 20 sec

exports.command = function(client, menu0, menu1="", menu2=""){
  client
    .useXpath()
    .click(XPathTo(menu0))
    .pause(MENU_PAUSE);

  if (menu1 !=""){
    client.click(XPathTo(menu1)).pause(MENU_PAUSE);
  }
  if (menu2 !=""){
    client.click(XPathTo(menu2)).pause(MENU_PAUSE);
  }
  client
    .useCss()
    .waitForElementVisible('body', PAGE_WAIT);
};


function XPathTo(name){
  return `${MENU_ROOT}//*[contains(text(), "${name}")]`
}
