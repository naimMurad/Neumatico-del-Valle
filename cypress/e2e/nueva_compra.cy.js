let localStorageBackup = {};

before(() => {
    cy.login();
    cy.wait(800); // Esperar a que se cargue la sesión
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
    cy.wait(800); // Esperar a que la página cargue completamente antes de interactuar con los elementos
    cy.get('i.eva-plus-outline').click();
    cy.wait(800);
    cy.get('span.subtitle-small div').eq(1).click();
    cy.wait(800);
    cy.get('div.subtitle-small').eq(5).click();
    cy.wait(800);
    cy.get('i.eva-chevron-down-outline').parent().click();
    cy.wait(800);
    cy.get('input[type="search"]').type('Prueba de Movimiento 1');
    cy.wait(800);
    cy.get('div[role="option"] div').eq(0).click({ force: true });
    cy.wait(800);
    cy.get('button.q-mt-md i').click();
    cy.wait(800);    
    cy.contains('span', ' Finalizar ').click();
    cy.wait(800);
    cy.get('i.eva-chevron-left-outline').parent().click();
    cy.wait(800);
    cy.get('i.eva-email-outline').eq(0).click();
    cy.wait(800);
    cy.get('div.no-custom-style div').eq(2).click();
    cy.wait(800);
    cy.get('i.eva-arrow-ios-downward-outline').eq(0).click();
    cy.wait(800);
    cy.get('div.no-custom-style div').eq(3).click();
    cy.wait(800);
    cy.get('button[data-autofocus="true"]').contains('Confirmar').click();
    cy.wait(800);
    cy.get('i.eva-arrow-ios-downward-outline').eq(0).click();
    cy.wait(800);
    cy.get('div.q-item__label').contains('Pendiente').click();
    cy.wait(800);
    cy.get('button[data-autofocus="true"]').contains('Confirmar').click();
    cy.wait(800);

    // Visitamos la página de Comprobantes Internos
    cy.visit('https://web-gestioncomercial.dev2.macamedia.com.ar/#/compras/comprobantes');
    cy.wait(800); // Esperar a que la página cargue completamente antes de interactuar con los elementos
    cy.get('button.text-primary i').eq(1).click();
    cy.wait(800);
    cy.get('input[data-autofocus="true"]').click();
    cy.wait(800);
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    cy.get('input[data-autofocus="true"]').type(randomNumber.toString());
    cy.wait(800);
    cy.get('div.q-field__native').eq(0).click();
    cy.wait(800);
    cy.contains('span', 'B').click();
    cy.wait(800);
    const randomThreeDigitNumber = Math.floor(100 + Math.random() * 900);
    cy.get('input[aria-label="Subtotal *"]').type(randomThreeDigitNumber.toString());
    cy.wait(800);
    cy.get('input[aria-label="Importe de descuento *"]').type('0');
    cy.wait(800);
    cy.get('div.q-field__label.no-pointer-events.absolute.ellipsis').contains('Moneda').click({force: true});
    cy.wait(800);
    cy.contains('span', 'Pesos argentinos').click();
    cy.wait(800);
    cy.get('div.q-field__label.no-pointer-events.absolute.ellipsis').contains('Porcentaje de IVA').click({force: true});
    cy.wait(800);
    cy.contains('span', '21%').click();
    cy.wait(800);
    cy.get('div.q-field__label.no-pointer-events.absolute.ellipsis').contains('Método de pago').click({ force: true });
    cy.wait(800);
    cy.contains('span', 'Transferencia bancaria').click();
    cy.wait(800);
    cy.get('div.subtitle').contains('Métodos de pago').parent().find('div.q-field__label.no-pointer-events.absolute.ellipsis').contains('Importe').click({ force: true });
    cy.wait(800);
    cy.get('input[aria-label="Importe"]').eq(3).type(randomThreeDigitNumber.toString());
    cy.wait(800);
    cy.get('i.eva-plus-outline').eq(1).click();
    cy.wait(800);
    cy.contains('span', ' Guardar ').click();    
});