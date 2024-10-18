let getToken = document.getElementById('getToken');
let copied = document.getElementById('copied');
let tokenInput = document.getElementById('tokenInput');
let copyTokenButton = document.getElementById('copyToken');
let copySection = document.getElementById('copySection');

chrome.runtime.onMessage.addListener(changeToken);
chrome.runtime.sendMessage({text: "popup opened"});

getToken.addEventListener('click', async () => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.update(tabs[0].id, { url: "https://discord.com/login" });
    });
});

function changeToken(token) {
    if(token.token) {
        tokenInput.value = token.token.replace(/['"]+/g, '');
        document.getElementById('shownToken').style.display = "block";
        document.getElementById('token').style.display = "none";
        toClipboard(tokenInput.value);
        copySection.style.display = "block"; // Show the copy button section
    }
}

function toClipboard(text) {
    var copyFrom = tokenInput;
    copyFrom.disabled = false;
    copyFrom.focus();
    copyFrom.select();
    document.execCommand('copy');
    console.log("Copied: ", tokenInput.value);
    copyFrom.disabled = true;
    copied.innerHTML = "Copied!";
    setTimeout(() => {
        copied.innerHTML = "Get Discord Token";
    }, 2000);
}

// Event listener for the new "Copy Token" button
copyTokenButton.addEventListener('click', () => {
    toClipboard(tokenInput.value);
});
