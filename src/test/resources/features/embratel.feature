# language: en
# ------------------------------------------------------------------------------
Feature: Search results

  Scenario: Mostrar Home Embratel
    Given I'm at "https://www.embratel.com.br/"
    Then Site is ok

  Scenario: Busca no Portal Sebrae
    Given I'm at "https://www.sebrae.com.br/sites/PortalSebrae"
    When Busca no Sebrae Nota Fiscal

  Scenario Outline: Abrir links do header
    Given I'm at "https://www.embratel.com.br/"
    When I click on the header option "A Embratel"
    Then I can see the title "A Embratel"

    Examples: 
      | option         |
      | A Embratel     |
      | Consultor      |
      | Espaço Cliente |
