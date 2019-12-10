
function specialFill(fld, value) {
  fld.apply(function(value) { $(this).val(value); }, [ value ]);
}


Given(/^I'm at "([^"]*)"$/, function (url) {
  browser.get(url);
});

Then(/^Site is ok$/, function () {
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
  expect(base.find(".main-title, .main-section-title").containingText(arg1)).to.exist();
});

When(/^I fill the form with:$/, function(datatable) {
  var formVals = datatable.rowsHash();
  var mainArea = base.find(".iframe").frames();
  
  for (var fldName in formVals) {
    var value = String(formVals[fldName]);
    
    var label = mainArea.find("#r_txt1, #r_txt2, label").containingText(fldName);
    
    if (fldName === "Telefone com DDD") {
      var valArray = value.split(" ");
      var fldSelect = mainArea.find("select").below(label).first();
      var fldInput = mainArea.find("input").below(label).first();
      
      fldSelect.select(valArray[0]);
      specialFill(fldInput, valArray[1]);
    } else if (fldName === "Horário para contato (período)") {
      var fldInputs = mainArea.find(".questionario").find("label");
      var input = fldInputs.withText(value).find("input");
      input.check();
    } else {
      var fld = mainArea.find("input, select").below(label).first();
      
      if (fldName === "CPF ou CNPJ") {
        specialFill(fld, value);
      } else {
        fld.fill(value);
      }
    }
  }
});

Then(/^I check that the form has the values:$/, function(datatable) {
  var formVals = datatable.rowsHash();
  var mainArea = base.find(".iframe").frames();
  
  for (var fldName in formVals) {
    var value = String(formVals[fldName]);
    
    var label = mainArea.find("#r_txt1, #r_txt2, label").containingText(fldName);
    
    if (fldName === "Telefone com DDD") {
      var valArray = value.split(" ");
      var fldSelect = mainArea.find("select").below(label).first();
      var fldInput = mainArea.find("input").below(label).first();
      
      expect(String(fldSelect.waitForExistence().val())).to.be(valArray[0]);
      expect(String(fldInput.waitForExistence().val())).to.be(valArray[1]);
      
    } else if (fldName === "Horário para contato (período)") {
      var fldInputs = mainArea.find(".questionario").find("label");
      var input = fldInputs.withText(value).find("input:checked");
      expect(input).to.have.size(1);
    } else {
      var fld = mainArea.find("input, select").below(label).first();
      expect(String(fld.waitForExistence().val())).to.be(value);
    }
  }
});

When(/^I click on the button "([^"]*)"$/, function(arg1) {
  var frame = base.find(".iframe").frames();
  frame.find("button").withValue(arg1).click();
});

Then(/^I check that the form has no values$/, function() {
  var inputs = ["Nome Completo", "Telefone com DDD", "Razão social da Empresa", "E-mail", "CPF ou CNPJ", "Horário para contato (período)"];
  var mainArea = base.find(".iframe").frames();

  for (var input in inputs) {
    var textLabel = inputs[input];
    var label = mainArea.find("#r_txt1, #r_txt2, label").containingText(textLabel);
    
    if (textLabel === "Telefone com DDD") {
      var fldSelect = mainArea.find("select").below(label).first();
      var fldInput = mainArea.find("input").below(label).first();
      
      expect(String(fldSelect.waitForExistence().val())).to.be("");
      expect(String(fldInput.waitForExistence().val())).to.be("");
      
    } else if (textLabel === "Horário para contato (período)") {
      var fldInputs = mainArea.find(".questionario").find("label");
      var checkboxes = fldInputs.find("input:checked");
      expect(checkboxes).to.have.size(0);
    } else {
      var fld = mainArea.find("input, select").below(label).first();
      expect(String(fld.waitForExistence().val())).to.be("");
    }
  }
});

When(/^I search for "([^"]*)"$/, function(arg1) {
  var input = base.find("input").withName("q");
  input.fill(arg1);
  
  var button = base.find("input").withName("btnK");
  button.click();
});

Then(/^A link for "([^"]*)" is displayed$/, function (query) {
  var links = $("a");
  var linkUrls = config.searches[query];

  expect(linkUrls).not.to.be.empty();

  linkUrls.forEach(function (linkUrl) {
    console.log(linkUrl);
    var link = links.withAttr("data-href", linkUrl).add(links.withAttr("href", linkUrl));
    expect(link).to.exist();
  });
});
