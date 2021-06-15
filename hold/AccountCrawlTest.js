//
// AccountCrawlTest.js  -- A smoke test for Adept
//
// This test script follows the account menu links in Adept


module.exports = {
  '@disabled': true,
  'Crawl Accounts': CrawlAccounts
}

const MENU_ROOT    = '#ctl00_ctl00_body__MainMenu ul.rmRootGroup';
const ACCOUNT_MENU = 2;
const MENU_PAUSE   = 800;
const PAGE_WAIT    = 20000; // a few pages are slowww. max set at 20 sec


async function CrawlAccounts(client){
  let startTime = new Date();

  await CrawlAccount(client, "6766016297", "GA old");
  await CrawlAccount(client, "5127323236", "GA new");

  await CrawlAccount(client, "4704426406", "NJ Old");
  await CrawlAccount(client, "5031898510", "NJ New");

  await CrawlAccount(client, "6623808489", "FL Old");
  await CrawlAccount(client, "3956976842", "FL New");

  await CrawlAccount(client, "8460141725", "TX IEI Old");
  await CrawlAccount(client, "8425180330", "TX IEI New");

  await CrawlAccount(client, "8446205525", "TX VE Old");
  await CrawlAccount(client, "7604250250", "TX VE New");

  client.pause(1000).end();
  Log (`All Accounts complete in ${Duration(startTime)} seconds`);
}


async function CrawlAccount(client, account, type){
  Log(`Crawling a ${type} account (${account})`);

  let startTime = new Date();
  OpenMainPage(client);
  FindAccount(client, account);
  await CrawlAccountMenu(client);

  Log (`Account crawl for account ${account} complete in ${Duration(startTime)} seconds`);
}


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


function FindAccount(client, account){
  client
    .setValue("input#ctl00_ctl00_body__QuickSearchBox_Input", account)
    .keys("\uE007")
    .waitForElementVisible('body')
    .waitForElementVisible('div#AccountInformation_Div')
    .pause(1000)
}


async function CrawlAccountMenu(client){
  let linkCount = await GetMenuLinkCount(client, ACCOUNT_MENU);

  for (let i=1; i<=linkCount; i++){
    let subLinkCount = await GetMenuLinkCount(client, ACCOUNT_MENU, i);
    if (!subLinkCount) {
      client
        .pause(2000)
        .clickMenu(ACCOUNT_MENU, i)
        .pause(2000)
        .back()
        .waitForElementVisible('body', PAGE_WAIT);
    } else {
      for (let j=1; j<=subLinkCount; j++){
        client
          .clickMenu(ACCOUNT_MENU, i, j)
          .back()
          .waitForElementVisible('body', PAGE_WAIT);
      }
    }
  }
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

function Duration(startTime){
  return ((new Date()) - startTime) / 1000;
}


// console.log with a prefix.
// This allows you to extract your output using grep
//
function Log(msg){
  console.log(`### ${msg}`);
}
