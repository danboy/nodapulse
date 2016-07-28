// Saves options to chrome.storage
function save_options() {
  var replacementWord = document.getElementById('replacementWord').value;
  var logoStyle = document.getElementById('logoStyle').value;
  chrome.storage.sync.set({
    replacementWord: replacementWord,
    logoStyle: logoStyle
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    replacementWord: 'tasks',
    logoStyle: "color:#000;font-weight: 600;text-align:center;font-size: 1.2rem;line-height: 3rem;"
  }, function(items) {
    document.getElementById('replacementWord').value = items.replacementWord;
    document.getElementById('logoStyle').value = items.logoStyle;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
