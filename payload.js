// send the page title as a chrome message
var siteLink = 'abcde'
var scrapedLinks = [];
var _repeat;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	  if (request.keyword)
		siteLink = request.keyword;
	}
);

function findLink(){

  _repeat = repeat;
  var repeat = setInterval(function() {

    var links = document.getElementsByClassName('anchor-3Z-8Bb');
    for(var i=0; i<links.length; i++) {
      scrapedLinks.push(links[i].href);
    }

    var foundLink = scrapedLinks.find(a =>a.includes(siteLink));

    if (foundLink) {
      console.log('Found link! - ' + foundLink)
      window.open(foundLink, 'windowname');
      clearInterval(repeat);
      chrome.runtime.sendMessage(foundLink);
    }
    else {
      console.log('Listening for link...' + siteLink)
      chrome.runtime.sendMessage("not found");
    }
  }, 100);
  return;
}

function abort()
{
	clearInterval(_repeat);
}





/// discord selector .button-3To2tQ