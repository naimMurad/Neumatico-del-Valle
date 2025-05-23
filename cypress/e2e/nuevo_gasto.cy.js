let localStorageBackup = {};

before(() => {
    cy.login();
    cy.wait(2000); // Esperar a que se cargue la sesión
    cy.window().then((win) => {
        localStorageBackup = { ...win.localStorage };
    });
});

beforeEach(() => {
    cy.visit('https://web-gestioncomercial.dev2.macamedia.com.ar/?#/gastos');
    cy.window().then((win) => {
        Object.entries(localStorageBackup).forEach(([key, value]) => {
            win.localStorage.setItem(key, value);
        });
    });
});

it('Debe crear un nuevo gasto', () => {
    cy.wait(1000); // Esperar a que la página cargue completamente antes de interactuar con los elementos
    cy.get('i.eva-plus-outline').click();
    cy.wait(1000);
    cy.get('input[data-autofocus="true"]').type('23/05/2025');
    cy.wait(1000);
    cy.get('div.q-field__native').eq(0).click();
    cy.wait(1000);
    cy.get('div[role="option"] div').eq(2).click({ force: true });
    cy.wait(1000);
    cy.get('div.q-field__native').eq(1).click();
    cy.wait(1000);
    cy.contains('span', 'Impuestos').click();
    cy.wait(1000);
    cy.get('div.q-field__native').eq(2).click();
    cy.wait(1000);
    cy.contains('span', 'Administración').click();
    cy.wait(1000);
    cy.get('div.q-field__native').eq(3).click();
    cy.wait(1000);
    cy.contains('span', 'Efectivo').click();
    cy.wait(1000);
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    cy.get('input[aria-label="Importe *"]').type(randomNumber.toString());
    cy.wait(1000);
    // Genero también una factura
    cy.get('input[aria-label="N° de factura"]').type('123456');
    cy.wait(1000);
    cy.get('input[aria-label="Importe neto"]').type(randomNumber.toString());
    cy.wait(1000);
    cy.get('input[aria-label="Percepción IVA"]').type((randomNumber * 0.21).toString());
    cy.wait(1000);
    cy.get('input[aria-label="Ingresos brutos"]').type('0');
    cy.wait(1000);
    cy.get('input[aria-label="IVA"]').type('21');
    cy.wait(1000);
    cy.contains('span', ' Guardar ').click();   
});