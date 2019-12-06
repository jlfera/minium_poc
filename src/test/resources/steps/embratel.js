
// TESTES DEFAULT DO TEMPLATE
Given(/^I'm at "([^"]*)"$/, function (url) {
  browser.get(url);
});

When(/^Busca no Sebrae (.*)$/, function (query) {
  var button    = $("#btnBusca");
  var searchbox = $(".search");
  
  searchbox.fill(query);
  button.click();
});

/////////////////////////////////////////////////////////////////////////////
//Testes Sites

Then(/^Site is ok$/, function () {
  // OK
  // Header
  var header = base.find(".header");
  expect(header.find(".list-menu-item").withText("A Embratel")).to.exist();
  expect(header.find(".list-menu-item").withText("Consultor")).to.exist();
  expect(header.find(".list-menu-item").withText("Blog")).to.exist();
  // Content
  var content = base.find(".main-content");
  expect(content.find(".sectionComponent")).to.have.size(7);
  // Footer
  var footer = base.find("#main-footer");
  expect(footer.find(".container-cliente").containingText("ESPAÇO CLIENTE")).to.exist();
});


When(/^I click on the header option "([^"]*)"$/, function(arg1) {
  var header = base.find(".header");
  header.find(".list-menu-item").withText(arg1).click();
});

Then(/^I can see the title "([^"]*)"$/, function(arg1) {
  expect(base.find(".main-title").containingText(arg1)).to.exist();
});

Then(/^Open (\w+) on menu Mobilidade$/, function(optionLabel) {
  var optionLink = $("#nav-menu > div.row > div.container > div.row > ul.nav-global-list > li.nav-global-item:nth-child(2) > ul.nav-submenu > li.nav-submenu-item > ul.submenu-item-col > li > a").withText(optionLabel);
  expect(optionLink).to.exist();
  expect(optionLink).to.have.size(1);
  browser.get(config.HOME_URL + optionLink.attr("href"));
}); 
