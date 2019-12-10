# language: en
# ------------------------------------------------------------------------------
Feature: Embratel Demo

  Scenario: Mostrar Home page Embratel
    Given I'm at "https://www.embratel.com.br/"
    Then I can see the Embratel homepage

  Scenario Outline: Abrir links do header
    Given I'm at "https://www.embratel.com.br/"
    When I click on the header option "<option>"
    Then I can see the title "<option>"

    Examples: 
      | option         |
      | A Embratel     |
      | Consultor      |
      | Espaço Cliente |

  Scenario: Preencho o formulário
    Given I'm at "https://www.embratel.com.br/"
    When I click on the header option "Consultor"
    And I fill the form with:
      | Nome Completo                  | Minium Vilt                |
      | Telefone com DDD               | 11 1234-56                 |
      | Razão social da Empresa        | abcd                       |
      | E-mail                         | minium.team@vilt-group.com |
      | CPF ou CNPJ                    | 34.345.345/5345-6          |
      | Horário para contato (período) | 19h - 22h                  |
    Then I check that the form has the values:
      | Nome Completo                  | Minium Vilt                |
      | Telefone com DDD               | 11 1234-56                 |
      | Razão social da Empresa        | abcd                       |
      | E-mail                         | minium.team@vilt-group.com |
      | CPF ou CNPJ                    | 34.345.345/5345-6          |
      | Horário para contato (período) | 19h - 22h                  |

  Scenario: Limpo o formulário preenchido
    Given I'm at "https://www.embratel.com.br/"
    When I click on the header option "Consultor"
    And I fill the form with:
      | Nome Completo                  | Minium Vilt                |
      | Telefone com DDD               | 11 1234-56                 |
      | Razão social da Empresa        | abcd                       |
      | E-mail                         | minium.team@vilt-group.com |
      | CPF ou CNPJ                    | 34.345.345/5345-6          |
      | Horário para contato (período) | 19h - 22h                  |
    And I click on the button "Limpar"
    Then I check that the form has no values

  Scenario: Busca no Google
    Given I'm at "https://www.google.com"
    When I search for "Embratel"
    Then A link for "Embratel" is displayed
