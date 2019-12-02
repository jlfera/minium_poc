# language: en
# ------------------------------------------------------------------------------
Feature: Search results

  Scenario: Mostrar Home Embratel
    Given I'm at https://www.embratel.com.br/
    Then Site is ok

  Scenario: Busca no Portal Sebrae
    Given I'm at https://www.sebrae.com.br/sites/PortalSebrae
    When Busca no Sebrae Nota Fiscal

  Scenario: Abrir Embratel & Clicar A Embratel
    Given I'm at https://www.embratel.com.br/
    Then Open Internet A Embratel
