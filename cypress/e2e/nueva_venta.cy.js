let localStorageBackup = {};

before(() => {
    cy.login();
    cy.wait(2000); // Esperar a que se cargue la sesión
    cy.window().then((win) => {
        localStorageBackup = { ...win.localStorage };
    });
});

beforeEach(() => {
    cy.visit('https://web-gestioncomercial.dev2.macamedia.com.ar/#/ventas/lista');
    cy.window().then((win) => {
        Object.entries(localStorageBackup).forEach(([key, value]) => {
            win.localStorage.setItem(key, value);
        });
    });
});

it('Debe crear una órden de venta', () => {
    cy.wait(1000); // Esperar a que la página cargue completamente antes de interactuar con los elementos
    cy.get('i.q-icon.eva.eva-plus-outline[aria-hidden="true"]').parent().click();
    cy.wait(1000);
    cy.get('i.eva-arrow-ios-downward-outline').eq(2).click();
    cy.wait(1000);
    cy.get('.q-item__label.subtitle-small').eq(1).click();
    cy.wait(1000);
    cy.get('i.eva-chevron-down-outline').parent().click();
    cy.wait(1000);
    cy.get('input[type="search"]').type('Prueba-1');
    cy.wait(1000);
    cy.get('.q-item__label').contains('Prueba-1').click();
    cy.wait(1000);
    cy.get('label.q-field--focused input').clear().type('5');
    cy.wait(1000);
    cy.get('button.q-mt-md i').click();
    cy.wait(1000);
    cy.get('span.cursor-pointer i').eq(2).click();
    cy.wait(1000);
    cy.contains('div', 'Efectivo Santiago').click();
    cy.wait(1000);
    cy.get('div.q-ml-xl i').click();
    cy.wait(1000);
    cy.contains('span', ' Confirmar ').click();
    cy.wait(1000);
    cy.get('span.block').eq(1).click();
    cy.wait(1000);

    //Visitamos la página de Comprobantes Internos
    cy.visit('https://web-gestioncomercial.dev2.macamedia.com.ar/#/ventas/comprobantes');
    cy.wait(1000); // Esperar a que la página cargue completamente antes de interactuar con los elementos
    cy.get('i.eva-chevron-left-outline').parent().click();
    cy.wait(1000);
    cy.get('i.eva-credit-card-outline').eq(1).click();
    cy.wait(1000);
    cy.get('div.q-field__native').eq(0).click();
    cy.wait(1000);
    cy.get('div.q-manual-focusable div').eq(2).click();
    cy.wait(1000);
    cy.get('div.q-field__native').eq(1).click();
    cy.wait(1000);
    cy.contains('span', 'Santiago del Estero').click();
    cy.wait(1000);
    cy.get('i.eva-arrow-ios-downward-outline').parent().click();
    cy.wait(1000);
    cy.get('div.subtitle-small').eq(3).click();
    cy.wait(1000);
    cy.get('i.eva-radio-button-off-outline').parent().click();
    cy.wait(1000);
    cy.contains('span', ' Guardar ').click();

    // Facturamos la venta
    cy.wait(1000);
    cy.get('button.text-positive span').eq(1).click();
    cy.wait(1000);
    cy.get('div.q-field__native').eq(0).click();
    cy.wait(1000);
    cy.get('.q-item__label').contains('B').click();
    cy.wait(1000);
    cy.get('div.q-field__native').eq(1).click();
    cy.wait(1000);
    cy.contains('span', 'Pago al contado').click();
    cy.wait(1000);
    cy.get('input[type="search"]').type('Leandro Bravo');
    cy.wait(1000);
    cy.get('.q-item__label').contains('Leandro Bravo').click();
    cy.wait(1000);
    cy.contains('span', ' Facturar ').click();    
});