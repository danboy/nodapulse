var elements = document.getElementsByTagName('*');

function removeLogo(replacementWord, logoStyle){
  if(document.location.host.indexOf('dapulse') > -1) {
    document.getElementsByClassName('logo router')[0].style=logoStyle;
    document.getElementsByClassName('logo router')[0].innerHTML=replacementWord;
  }
}

function checkTitle(replacementWord){
  if(document.title.indexOf('dapulse') > -1){
    document.title = replacementWord;
  }
}

chrome.storage.sync.get({
  replacementWord: 'tasks',
  logoStyle: "color:#000;font-weight: 600;text-align:center;font-size: 1.2rem;line-height: 3rem;"
}, function(items) {
  removeLogo(items.replacementWord, items.logoStyle);
  setTimeout(function(){checkTitle(items.replacementWord)}, 1000);
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    var prevNode = {nodeType: 2};
    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];
      //nodeType 3 is text, 2 is attribute
      if (node.nodeType === 3 && prevNode.nodeType !== 2) {
        var text = node.nodeValue;
        var replacedText = text.replace(/dapulse/gi, items.replacementWord);
        if (replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
        }
      }
      prevNode = node;
    }
  }
});
