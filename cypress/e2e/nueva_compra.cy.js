let localStorageBackup = {};

before(() => {
    cy.login();
    cy.wait(2000); // Esperar a que se cargue la sesión
    cy.window().then((win) => {
        localStorageBackup = { ...win.localStorage };
    });
});

beforeEach(() => {
    cy.visit('https://web-gestioncomercial.dev2.macamedia.com.ar/#/compras/lista');
    cy.window().then((win) => {
        Object.entries(localStorageBackup).forEach(([key, value]) => {
            win.localStorage.setItem(key, value);
        });
    });
});

it('Debe crear una órden de compra', () => {
    cy.wait(1000); // Esperar a que la página cargue completamente antes de interactuar con los elementos
    cy.get('i.eva-plus-outline').click();
    cy.wait(1000);
    cy.get('span.subtitle-small div').eq(1).click();
    cy.wait(1000);
    cy.get('div.subtitle-small').eq(5).click();
    cy.wait(1000);
    cy.get('i.eva-chevron-down-outline').parent().click();
    cy.wait(1000);
    cy.get('input[type="search"]').type('Prueba de Movimiento 1');
    cy.wait(1000);
    cy.get('div[role="option"] div').eq(0).click({ force: true });
    cy.wait(1000);
    cy.get('button.q-mt-md i').click();
    cy.wait(1000);    
    cy.contains('span', ' Finalizar ').click();
    cy.wait(1000);
    cy.get('i.eva-chevron-left-outline').parent().click();
    cy.wait(1000);
    cy.get('i.eva-email-outline').eq(0).click();
    cy.wait(1000);
    cy.get('div.no-custom-style div').eq(2).click();
    cy.wait(1000);
    cy.get('i.eva-arrow-ios-downward-outline').eq(0).click();
    cy.wait(1000);
    cy.get('div.no-custom-style div').eq(3).click();
    cy.wait(1000);
    cy.get('button[data-autofocus="true"]').contains('Confirmar').click();
    cy.wait(1000);
});