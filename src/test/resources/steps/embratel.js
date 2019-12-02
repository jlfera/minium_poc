
// TESTES DEFAULT DO TEMPLATE
Given(/^I'm at (.*)$/, function (url) {
  browser.get(url);
});



When(/^Busca no Sebrae (.*)$/, function (query) {
  var button    = $("#btnBusca");
  var searchbox = $(".search");
  
  searchbox.fill(query);
  button.click();
});

/////////////////////////////////////////////////////////////////////////////
//Embratel

Then(/^Site is ok$/, function () {
  // OK
});


Then(/^Open (\w+) A Embratel$/, function(optionLabel) {
  var optionLink = $("a").withAttr("title", "A Embratel");
  browser.get(config.HOME_URL + optionLink.attr("href"));
}); 

Then(/^Open (\w+) on menu Mobilidade$/, function(optionLabel) {
  var optionLink = $("#nav-menu > div.row > div.container > div.row > ul.nav-global-list > li.nav-global-item:nth-child(2) > ul.nav-submenu > li.nav-submenu-item > ul.submenu-item-col > li > a").withText(optionLabel);
  expect(optionLink).to.exist();
  expect(optionLink).to.have.size(1);
  browser.get(config.HOME_URL + optionLink.attr("href"));
}); 
