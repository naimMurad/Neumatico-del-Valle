let localStorageBackup = {};

before(() => {
    cy.login();
    cy.wait(2000); // Esperar a que se cargue la sesión
    cy.window().then((win) => {
        localStorageBackup = { ...win.localStorage };
    });
});

beforeEach(() => {
    cy.visit('https://web-gestioncomercial.dev2.macamedia.com.ar/#/presupuestos');
    cy.window().then((win) => {
        Object.entries(localStorageBackup).forEach(([key, value]) => {
            win.localStorage.setItem(key, value);
        });
    });
});

it('Debe crear un nuevo presupuesto', () => {
    cy.wait(1000); // Esperar a que la página cargue completamente antes de interactuar con los elementos
    cy.get('i.eva-plus-outline').click();
    cy.wait(1000);
    cy.get('span.subtitle-small div').eq(1).click();
    cy.wait(1000);
    cy.get('div.subtitle-small').eq(1).click();
    cy.wait(1000);
    cy.get('i.eva-chevron-down-outline').parent().click();
    cy.wait(1000);
    cy.get('input[type="search"]').type('Prueba-1');
    cy.wait(1000);
    cy.get('div[role="option"] div').eq(0).click({ force: true });
    cy.wait(1000);
    cy.get('button.q-mt-md i').click();
    cy.wait(1000);
    cy.get('span.cursor-pointer').eq(2).click();
    cy.wait(1000);
    cy.contains('div', 'Cuenta corriente').click();
    cy.wait(1000);
    cy.get('div.q-ml-xl i').click();
    cy.wait(1000);
    cy.contains('span', ' Finalizar ').click();
    cy.wait(1000);
    cy.get('i.eva-email-outline').eq(0).click();
    cy.wait(1000);
    cy.reload();
    cy.wait(2000);
    cy.get('i.eva-plus-outline').should('be.visible');
    cy.wait(1000);
    cy.get('button.text-positive i').eq(0).click();
    cy.wait(1000);
    cy.get('input[data-autofocus="true"]').type('23/05/2025');
    cy.wait(1000);
    cy.contains('span', ' Guardar ').click();
});