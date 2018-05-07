// run_at: document_idle
chrome.storage.local.get('sites', function(result) {
  for (let site in result.sites) {
    let enabledSites = result.sites;
    if (enabledSites[site] == false)
      continue;
    if (INJECTION[site] == undefined)
      continue;

    if (INJECTION[site].url.test(document.location.host)) {
      var script = document.createElement('script');
      script.textContent = INJECTION[site].code;
      (document.head||document.documentElement).appendChild(script);
      script.parentNode.removeChild(script);
      break;
    }
  }
});

const INJECTION = {
  oglobo: {
    url: /oglobo\.globo\.com/,
    code: 'paywallAtivo = false;'
  },
  theeconomist: {
    url : /www\.economist\.com/,
    code: 'document.cookie = "ec_limit=allow";'
  },
  foreignpolicy: {
    url: /foreignpolicy\.com/,
    code: `
      document.getElementById("paywall_bg").remove();
      document.body.classList.remove("overlay-no-scroll");
      document.body.style.overflow = "visible";
      document.documentElement.classList.remove("overlay-no-scroll");
    `
  },
  folhadespaulo: {
    url: /folha.uol.com.br/,
    code: `
      omtrClickUOL = function(){};function showText() {
        $("#bt-read-more-content").next().show();
        $("#bt-read-more-content").next().show().prev().remove();
      }
      setTimeout(showText, 100);
    `
  },
  financialtimes: {
    url: /ft.com/,
    code: `
      document.cookie = "";
      localStorage.clear();
      sessionStorage.clear();
      indexedDB.deleteDatabase("next-flags");
      indexedDB.deleteDatabase("next:ads");'
    `
  },
  veja: {
    url: /veja.abril.com.br/,
    code: `
      document.querySelector('.content-blocked').classList
        .remove('content-blocked');
      document.querySelector('.callpaywall').remove();
    `
  }
};
