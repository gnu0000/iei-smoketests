
module.exports = {
  '@disabled': true,
  'Step 1: open adept and nav to main page' : OpenMainPage,
  'Step n: exercise the menu'               : ExercizeMenu,
  'Step n: navigate Markets menu'           : NavigateMarketsMenu,
  'Step n: navigate Enrollment Reports menu': NavigateEnrollmentMenu,
  'Step n: navigate Tools menu'             : NavigateToolsMenu,
  'Step n: finish up'                       : FinishUp
}


const MENU_PAUSE = 500;
const PAGE_PAUSE = 1000;
const MENU_ROOT  = `#ctl00_ctl00_body__MainMenu ul.rmRootGroup`;


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

function ExercizeMenu(client) {
  for (let i of [1, 2, 3]){
    ToggleMenu(client, i); // open menu
    ToggleMenu(client, i); // close menu
  }
}

// note: we end with Georgia because it puts us in a state
//   where the enrollment menu has all links available
//
function NavigateMarketsMenu(client) {
  for (let i of [1, 3, 4, 5, 2]){
    ToggleSubMenu(client, 1, i);
  }
}

function NavigateEnrollmentMenu(client) {
  ToggleSubSubMenu(client, 2, 1, 1);
  ToggleSubSubMenu(client, 2, 1, 2);
  ToggleSubMenu(client, 2, 2);
  ToggleSubMenu(client, 2, 3);
}

function NavigateToolsMenu(client) {
//  var toolMenus = [0, 7, 2, 0, 2, 2, 2, 0, 0, 0, 0];
//
//  for (let subIndex=0; subIndex<toolMenus.length; subIndex++){
//    let subSubCount = toolMenus[subIndex];
//    if (subSubCount == 0) {
//      ToggleSubMenu(client, 3, 1);
//    } else {
//      ToggleAllSubSubMenus(client, 3, subIndex+1, subSubCount, 3000);
//    }
//  }

    ToggleSubSubMenu(client, 3, 4, 1);
}

function FinishUp(client) {
  client
    .pause(1000)
    .end();
}


///////////////////////////////////////////////////////////////

function ToggleMenu(client, index) {
  return client
    .click(GetTopMenu(index)).pause(MENU_PAUSE)
}

function ToggleSubMenu(client, index, subIndex, pause = PAGE_PAUSE) {
  return client
    .click(GetTopMenu(index)).pause(MENU_PAUSE)
    .click(GetSubMenu(index, subIndex)).pause(pause)
}

function ToggleSubSubMenu(client, index, subIndex, subSubIndex, pause = PAGE_PAUSE) {
  return client
    .click(GetTopMenu(index)).pause(MENU_PAUSE)
    .click(GetSubMenu(index, subIndex)).pause(MENU_PAUSE)
    .click(GetSubSubMenu(index, subIndex, subSubIndex)).pause(pause)
}

function ToggleAllSubSubMenus(client, index, subIndex, subSubCount, pause = PAGE_PAUSE) {
  for (let subSubIndex=0; subSubIndex<subSubCount; subSubIndex++){
    ToggleSubSubMenu(client, index, subIndex, subSubIndex+1, pause);
  }
}


///////////////////////////////////////////////////////////////

function GetTopMenu(index) {
   return `${MENU_ROOT} > li.rmItem:nth-child(${index}) .rmLink .rmExpandDown`;
}

function GetSubMenu(index, subIndex) {
   return `${MENU_ROOT} > li.rmItem:nth-child(${index}) > .rmSlide > ul > li.rmItem:nth-child(${subIndex}) > .rmLink span`;
}

function GetSubSubMenu(index, subIndex, subSubIndex) {
   return `${MENU_ROOT} > li.rmItem:nth-child(${index}) > .rmSlide > ul > li.rmItem:nth-child(${subIndex}) > .rmSlide .rmItem:nth-child(${subSubIndex}) a span`;
}


///////////////////////////////////////////////////////////////
//
//function step1() {$(GetTopMenu(3)).trigger("click")         }
//function step2() {$(GetSubMenu(3, 2)).trigger("click")      }
//function step3() {$(GetSubSubMenu(3, 2, 2)).trigger("click")}

