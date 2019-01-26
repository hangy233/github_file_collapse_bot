console.log('collapse bot injected');

chrome.runtime.onMessage.addListener(
  ({keyword, isCollapse, isRegex}) => {
    if (!keyword) {
      return;
    }

    let domList;

    if (isRegex) {
      domList = [].slice.call(document.querySelectorAll('.file-header'))
        .filter(node => new RegExp(keyword).test(node.dataset.path))
        .map(node => node.querySelector(`button[aria-expanded=${isCollapse ? 'true' : 'false'}]`));
    } else {
      domList = document.querySelectorAll(`.file-header[data-path*="${keyword}"] button[aria-expanded=${isCollapse ? 'true' : 'false'}]`);
    }

    domList.forEach(dom => dom && dom.click());

    // Note: Returning true is required here!
    // ref: http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
    return true; 
  }
);
