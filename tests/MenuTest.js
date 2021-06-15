//   `
// MenuTest.js  -- A smoke test for Adept
//
// This test script follows the links in the adept menu

module.exports = {
  '@disabled': false,
  'Step 1: Start up'                        : StartUp,
  'Step 2: open adept and nav to main page' : OpenMainPage,
  'Step 3: Test Markets and enrollments'    : DoMarketsAndEnrollments,
  'Step 4: Test Tools'                      : DoToolsMenu,
  'Step 5: Finish up'                       : FinishUp
}

const PAGE_WAIT  = 10000; // a few pages are slowww. max set at 10 sec


// todo: look into nightwatch startup/end functionality
//
function StartUp(client){
  client
    .initTimers('menuTestLog.txt', true)
    .startTimer('menu test')
}


function OpenMainPage(client){
  client
    .url('http://adept.int.gainesville.infiniteenergy.com/')
    .waitForElementVisible('body', PAGE_WAIT)
    .assert.title('Adept 2')
    .assert.visible('a#ctl00_ctl00_body_AdeptLink')
    .click('a#ctl00_ctl00_body_AdeptLink')
    .waitForElementVisible('body', PAGE_WAIT)
    .assert.title('Adept')
}


function DoMarketsAndEnrollments(client){
  let markets = [
    "Search All Markets",
    "Georgia",           
    "North East",        
    "Texas",             
    "Florida"           
  ];
  markets.map((m) => DoMarketAndEnrollments(client, m));
}


function DoMarketAndEnrollments(client, market){
  client
    .startTimer('markets and enrollments for ${market}')
    .clickMenuX(client, "Markets", market);
  let hasVerification = HasVerification(market);
  DoEnrollments(client, hasVerification);
  client
    .back()
    .endTimer('markets and enrollments for ${market}');
}


function DoEnrollments(client, hasVerification){
  client
    .clickMenuX(client, "Enrollment Reports", "Prospect", "Commercial" )
    .clickMenuX(client, "Enrollment Reports", "Prospect", "Residential")
    .clickMenuX(client, "Enrollment Reports", "Enrollment Submission"  )

  if (hasVerification){
    client.clickMenuX(client, "Enrollment Reports", "Third Party Verification");
  }
}


// note: "Mass Account Management" excluded from the crawl
function DoToolsMenu(client){
  let paths = [
    ["Callback Page"                                           ],
    ["Correspondence Management", "Correspondence Manager"     ],
    ["Correspondence Management", "Document Pull Request"      ],
    ["CGS/CSA"                                                 ],
    ["Group Management"         , "Contract Editor"            ],
    ["Group Management"         , "Group Association"          ],
    ["LDC"                      , "Associate Editor"           ],
    ["LDC"                      , "LDC Service Location Editor"],
    ["Marketing Admin"          , "Add-On Service Admin"       ],
    ["Marketing Admin"          , "Advertising Admin"          ],
    ["Payment Management"                                      ],
    ["Product Offering Management"                             ],
    ["Product Offering Management 2"                           ],
    ["Scrub Lead Address"                                      ]
  ];
  client.startTimer('tools menu');
  for (let path of paths){
    client.clickMenuX(client, "Tools", ...path);
    OpenMainPage(client);
  }
  client.endTimer('tools menu');
}


function FinishUp(client){
  client
    .endTimer('menu test')
    .pause(1000)
    .end();
}


function HasVerification(market){
  return !market.match(/Texas|Florida/i);
}


function Log(msg){
  console.log(`### ${msg}`);
}
