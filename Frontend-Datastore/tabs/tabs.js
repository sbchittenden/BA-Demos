const tabLabels = document.querySelectorAll('.tab-label');
const tabContents = document.querySelectorAll('.tab-content');
const tabContainer = document.querySelector('.tabs-container');

tabContainer.addEventListener('click', activateTab, false);

if (!sessionStorage.getItem('activeTab')) {
  initiateTabs();
} else {
  reloadTabs();
}

function activateTab(e) {
  if (e.target.dataset.labelFor) {
    let tabID = parseInt(e.target.dataset.labelFor);
    sessionStorage.setItem('activeTab', tabID);
    for (let x = 0; x < tabContents.length; x++) {
      tabLabels[x].className = 'tab-label';
      tabContents[x].className = 'tab-content';
    }
    tabLabels[tabID].classList.add('is-current');
    tabContents[tabID].classList.add('is-visible');
  }
}

function initiateTabs() {
  sessionStorage.setItem('activeTab', 0);
  reloadTabs();
}

function reloadTabs() {
  let tabID = parseInt(sessionStorage.getItem('activeTab'));
  for (let x = 0; x < tabContents.length; x++) {
    tabLabels[x].className = 'tab-label';
    tabContents[x].className = 'tab-content';
  }
  tabLabels[tabID].classList.add('is-current');
  tabContents[tabID].classList.add('is-visible');
}
