//
// MenuTest.js  -- A smoke test for Adept
//
// This test script follows the links in the adept menu


module.exports = {
  'Step 1: open adept and nav to main page'   : OpenMainPage,
  'Step 2: navigate Markets menu'             : NavigateMarketsMenu,
//  'Step 3: navigate Enrollment Reports menu'  : NavigateEnrollmentMenu,
//  'Step 4: navigate Tools menu'             : NavigateToolsMenu,
//  'Step 5: navigate problematic Tools menu' : NavigateProblematicToolsMenu,
//  'TestZZZ'                                   : TestZZZ,
  'Step 5: finish up'                         : FinishUp
}

const MENU_ROOT  = '#ctl00_ctl00_body__MainMenu ul.rmRootGroup';

const MARKETS_MENU    = 1;
const ENROLLMENT_MENU = 2;
const TOOLS_MENU      = 3;

const MENU_PAUSE = 500;
const PAGE_PAUSE = 2000;


function OpenMainPage(client) {
  client
    .url('http://adept.int.gainesville.infiniteenergy.com/')
    .waitForElementVisible('body', PAGE_PAUSE)
    .assert.title('Adept 2')
    .assert.visible('a#ctl00_ctl00_body_AdeptLink')
    .click('a#ctl00_ctl00_body_AdeptLink')
    .waitForElementVisible('body', PAGE_PAUSE)
    .assert.title('Adept')
}

// note: we end with Georgia because it puts us in a state
//   where the enrollment menu has all links available
//
function NavigateMarketsMenu(client) {
  ClickMenuLink(client, "Markets", "Search All Markets");
  client.back();
  ClickMenuLink(client, "Markets", "Georgia"   );
  client.back();
  ClickMenuLink(client, "Markets", "North East");
  client.back();
  ClickMenuLink(client, "Markets", "Texas");
  client.back();
  ClickMenuLink(client, "Markets", "Florida"   );
  client.back();

}


function NavigateMarketsMenu(client) {
  NavigateMarket(client, "Search All Markets", true);
  NavigateMarket(client, "Georgia"           , true);
  NavigateMarket(client, "North East"        , true);
  NavigateMarket(client, "Texas"             , true);
  NavigateMarket(client, "Florida"           , true);
}

function NavigateMarket(client, marketLinkText){
  ClickMenuLink(client, "Markets", marketLinkText);
  NavigateEnrollments(client);
  client.back();
}

function NavigateEnrollments(client){
//  NavigateEnrollment(client, "Prospect"                );
  NavigateEnrollment(client, "Enrollment Submission"   );
  NavigateEnrollment(client, "Third Party Verification");
}

function NavigateEnrollment(client, enrollmentLinkText){
  ClickMenuLink(client, "Enrollment Reports", enrollmentLinkText);
  client.back();
}






function FinishUp(client) {
  client.pause(1000).end();
}


function ClickMenuLink(client, menu0, menu1="", menu2="", wait=true){
  client.useXpath();

  client.click(XPathTo(menu0)).pause(MENU_PAUSE);

  if (menu1 !="")
    client.click(XPathTo(menu1)).pause(MENU_PAUSE);

  if (menu2 !="")
    client.click(XPathTo(menu2)).pause(MENU_PAUSE);

  if (wait){
    client.useCss().waitForElementVisible('body', PAGE_PAUSE);
  }  
}


function XPathTo(name){
   return `//*[contains(text(), "${name}")]`
}