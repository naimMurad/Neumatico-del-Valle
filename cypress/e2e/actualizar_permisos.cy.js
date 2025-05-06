let localStorageBackup = {};

before(() => {
    cy.login();
    cy.wait(2000); // Esperar a que se cargue la sesión
    cy.window().then((win) => {
        localStorageBackup = { ...win.localStorage };
    });
});

beforeEach(() => {
    cy.visit('https://web-gestioncomercial.dev2.macamedia.com.ar/#/configuracion/roles');
    cy.window().then((win) => {
        Object.entries(localStorageBackup).forEach(([key, value]) => {
            win.localStorage.setItem(key, value);
        });
    });
});

it('Debe activar los permisos necesarios', () => {
    cy.wait(1000); // Esperar a que la página cargue completamente antes de interactuar con los elementos
    cy.contains('span', 'Operador')
      .parent()
      .parent()
      .find('button .q-icon.notranslate.material-icons')
      .click();
    cy.wait(1000); // Esperar a que la página cargue completamente antes de interactuar con los elementos
    
    cy.get('.q-expansion-item.q-expansion-item--collapsed')
    .each(($collapsedItem) => {
      cy.wrap($collapsedItem)
      .find('.q-item__label')
      .first()
      .click({ force: true });
    });
  
  // Espera un breve momento (ajusta el tiempo si es necesario)
  cy.wait(500);
  
  // Intenta activar los checkboxes inactivos
  cy.get('[role="checkbox"][aria-checked="false"]')
    .each(($checkbox) => {
      cy.wrap($checkbox).click();
    });
});