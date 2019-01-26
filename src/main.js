const postMessage = messagePayload => {
  if (!messagePayload.keyword) {
    return;
  }

  chrome.tabs.query({active: true, currentWindow: true}, tabs => chrome.tabs.sendMessage(tabs[0].id, messagePayload));
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const keywordInput = document.getElementById('keyword-input');
  const isRegexCheckbox = document.getElementById('regex-enabled');

  container.addEventListener('click', ({target}) => {
    const payload = {
      keyword: keywordInput.value,
      isCollapse: target.id === 'collapse-btn',
      isRegex: isRegexCheckbox.checked
    };

    postMessage(payload);
  });
});
