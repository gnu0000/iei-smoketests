//
// MenuCrawlTest.js  -- A smoke test for Adept
//
// This test script follows the menu links in Adept


module.exports = {
  '@disabled': true,
  'Step 1: open adept and nav to main page' : OpenMainPage,
  'Step 2: Debug: dump menu size counts'    : DumpMenuSizes,
  'Step 3: Crawl Markets & Enrollment Links': CrawlMarketsAndEnrollments,
  'Step 4: Crawl Tools menu'                : CrawlToolsMenu,
  'Step 5: finish up'                       : FinishUp
}

const MENU_ROOT  = '#ctl00_ctl00_body__MainMenu ul.rmRootGroup';

const MARKETS_MENU    = 1;
const ENROLLMENT_MENU = 2;
const TOOLS_MENU      = 3;

const MENU_PAUSE = 800;
const PAGE_WAIT  = 10000; // a few pages are slowww. max set at 20 sec


function OpenMainPage(client) {
  client
    .url('http://adept.int.gainesville.infiniteenergy.com/')
    .waitForElementVisible('body', PAGE_WAIT)
    .assert.title('Adept 2')
    .assert.visible('a#ctl00_ctl00_body_AdeptLink')
    .click('a#ctl00_ctl00_body_AdeptLink')
    .waitForElementVisible('body', PAGE_WAIT)
    .assert.title('Adept')
}


async function CrawlMarketsAndEnrollments(client){
  let marketLinkCount = await GetMenuLinkCount(client, MARKETS_MENU);

  for (let i=1; i<=marketLinkCount; i++){
    client.clickMenu(MARKETS_MENU, i);

    let enrollmentLinkCount = await GetMenuLinkCount(client, ENROLLMENT_MENU);
    for (let j=1; j<=enrollmentLinkCount; j++){
      let subLinkCount = await GetMenuLinkCount(client, ENROLLMENT_MENU, j);
      if (!subLinkCount) {
        client
          .clickMenu(ENROLLMENT_MENU, j)
          .pause(2000)
      } else {
        for (let k=1; k<=subLinkCount; k++){
          client.clickMenu(ENROLLMENT_MENU, j, k);
        }
      }
    }
  }
}


async function CrawlToolsMenu(client) {
  OpenMainPage(client);

  let linkCount = await GetMenuLinkCount(client, TOOLS_MENU);
  Log(`crawling ${linkCount} Tools menu items`);

  for (let i=1; i<=linkCount; i++){
    if (i == 2) {
      Log (`Skipping Tools->"Mass Account Management" for now.`);
      continue;
    }
    let subLinkCount = await GetMenuLinkCount(client, TOOLS_MENU, i);
    if (!subLinkCount) {
      client
        .clickMenu(TOOLS_MENU, i)
        .back()
        .waitForElementVisible('body', PAGE_WAIT);
    } else {
      for (let j=1; j<=subLinkCount; j++){
        client
          .clickMenu(TOOLS_MENU, i, j)
          .back()
          .waitForElementVisible('body', PAGE_WAIT);
      }
    }
  }
}


function FinishUp(client) {
  client
    .pause(5000)
    .end();
}


// This is for debugging, it shows that we are 
// getting the menu/submenu/subsubmenu counts correctly
//
async function DumpMenuSizes(client){
  let count0 = await GetMenuLinkCount(client);
  Log(`Menu sizes:`);
  Log(` [${count0}]`);

  for (let i=1; i<=count0; i++){
    let count1 = await GetMenuLinkCount(client, i);
    Log(`    [${count1}]`);

    for (let j=1; j<=count1; j++){
      let count2 = await GetMenuLinkCount(client, i, j);
      Log(`       [${count2}]`);
    }
  }
  return count0;
}


///////////////////////////////////////////////////////////////
//
// Helpers
//

async function GetMenuLinkCount(client, index0=0, index1=0){
  let selector = GetMenuCountSelector(index0, index1);

  return new Promise((resolve) => {
    client.elements('css selector', selector, (result) => {
      return resolve(result.value.length);
    });
  });
}


function GetMenuCountSelector(index0=0, index1=0){
  if (!index0)
    return `${MENU_ROOT} > li`;
  if (!index1)
    return `${MENU_ROOT} > li.rmItem:nth-child(${index0}) > .rmSlide > ul > li`

  return `${MENU_ROOT} > li.rmItem:nth-child(${index0}) > .rmSlide > ul > li.rmItem:nth-child(${index1}) > .rmSlide > ul > li`;
}


// console.log with a prefix. 
// This allows you to extract your output using grep
//
function Log(msg){
  console.log(`### ${msg}`);
}
