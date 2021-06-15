//
// AccountTest.js  -- A smoke test for Adept
//
// This test script follows the account menu links in Adept

module.exports = {
  '@disabled': false,
  'Step 1: Start up'      : StartUp,
  'Step 2: Test Accounts' : DoAccounts,
  'Step 3: Finish up'     : FinishUp
}

const PAGE_WAIT  = 10000; // a few pages are slowww. max set at 10 sec


// todo: look into nightwatch startup/end functionality
//
function StartUp(client){
  client
    .initTimers('accountTestLog.txt', true)
    .startTimer('account test')
}


function DoAccounts(client){
  let accounts = [
    ["6766016297", "GA old"    ],
    ["5127323236", "GA new"    ],
    ["4704426406", "NJ Old"    ],
    ["5031898510", "NJ New"    ],
    ["6623808489", "FL Old"    ],
    ["3956976842", "FL New"    ],
    ["8460141725", "TX IEI Old"],
    ["8425180330", "TX IEI New"],
    ["8446205525", "TX VE Old" ],
    ["7604250250", "TX VE New" ]
  ];
  for (let acctInfo of accounts){
    DoAccount(client, ...acctInfo);
  }
}


function DoAccount(client, account, type){
  client.startTimer(`account test ${account}`);
  OpenMainPage(client);
  FindAccount(client, account);
  DoAccountMenu(client);
  client.endTimer(`account test ${account}`);
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
    .waitForElementVisible('body', PAGE_WAIT)
    .waitForElementVisible('div#AccountInformation_Div')
    .pause(1000)
}


function DoAccountMenu(client){
  let paths = [
    ["Home"                              ],
    ["Activity", "Account Activity"      ],
    ["Activity", "Add-On Services"       ],
    ["Activity", "Budget Billing Manager"],
    ["Activity", "Correspondence"        ],
    ["Activity", "Delinquency"           ],
    ["Activity", "Deposit Manager"       ],
    ["Activity", "LDC Activity"          ],
    ["Activity", "Usage"                 ],
    ["Info",     "Contact"               ],
    ["Info",     "Contract"              ],
    ["Info",     "Exemptions"            ],
    ["Info",     "Customer Name"         ],
    ["Info",     "Rates"                 ],
    ["Info",     "Service Address"       ],
    ["Info",     "UCB Info"              ],
    ["Notes"                             ],
    ["Payments"                          ],
    ["Customer Survey"                   ]
  ];

  for (let path of paths){
    client
      .clickMenuX(client, "Account", ...path)
      .back()
      .waitForElementVisible('body');
  }
}


function FinishUp(client){
  client
    .endTimer('account test')
    .pause(100)
    .end();
}


function Log(msg){
  console.log(`### ${msg}`);
}
