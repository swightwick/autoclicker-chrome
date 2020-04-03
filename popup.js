// Inject the payload.js script into the current tab after the popout has loaded
window.addEventListener('load', function (evt) {
	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
		file: 'payload.js'
	});;
});

document.addEventListener('DOMContentLoaded', function() {
	// document.getElementById('status').textContent = "Extension loaded";
	var text;
	var keywordButton = document.getElementById('keywordSubmit');
	var keywordInput = document.getElementById('keyword');
	var output = document.getElementById('pagetitle');
    keywordButton.addEventListener('click', function () {
		var text = keywordInput.value;
        if (!text) {
            console.log('Invalid text provided');
            return;
		}
		output.innerHTML = 'Will search for: ' + text;
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {keyword: text}, function() {
			});
		});
	});	

	var goButton = document.getElementById('go');
    goButton.addEventListener('click', function () {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(tabs[0].id, {code: "findLink();"});
		});
		output.innerHTML = 'Listening for: ' + text;
	});	

	var stopButton = document.getElementById('stop');
    stopButton.addEventListener('click', function () {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(tabs[0].id, {code: "abort();"});
		});
		output.innerHTML = 'stopping';
	});	

});


