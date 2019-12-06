var scenario;

Before(function (s) {
  scenario = s;
});

After(function (s) {
  scenario.embed(browser.screenshot().asBytes(), "image/png");
});