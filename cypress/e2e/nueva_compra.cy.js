let localStorageBackup = {};

before(() => {
    cy.login();
    cy.wait(1000); // Esperar a que se cargue la sesión
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
    let importeTotal = '';

    cy.wait(1000); // Esperar a que la página cargue completamente antes de interactuar con los elementos
    cy.get('i.eva-plus-outline').click();
    cy.wait(1000);
    cy.get('span.subtitle-small div').eq(1).click();
    cy.wait(1000);
    cy.get('div.subtitle-small').eq(5).click();
    cy.wait(1000);
    cy.get('i.eva-chevron-down-outline').parent().click();
    cy.wait(1000);    
    cy.contains('div', 'Pegatina Nª1 Rocket League').click();
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
    cy.get('i.eva-arrow-ios-downward-outline').eq(0).click();
    cy.wait(1000);
    cy.get('div.q-item__label').contains('Pendiente').click();
    cy.wait(1000);
    cy.get('button[data-autofocus="true"]').contains('Confirmar').click();
    cy.wait(1000);

    // Realizamos el registro del Pago
    cy.visit('https://web-gestioncomercial.dev2.macamedia.com.ar/#/compras/comprobantes');
    cy.wait(1000); // Esperar a que la página cargue completamente antes de interactuar con los elementos
    cy.get('i.eva-credit-card-outline').eq(1).click();
    cy.wait(1000);
    cy.get('div.q-field__native').eq(0).click();
    cy.wait(1000);
    cy.get('div.q-manual-focusable div').eq(2).click();
    cy.wait(1000);
    cy.get('div.q-field__native').eq(1).click();
    cy.wait(1000);
    cy.contains('span', 'Efectivo').click();
    cy.wait(1000);
    cy.contains('span', ' Guardar ').click();
    cy.wait(1000);

    // Visitamos la página de Comprobantes Internos para generar la factura
    cy.visit('https://web-gestioncomercial.dev2.macamedia.com.ar/#/compras/comprobantes');
    cy.wait(1000); // Esperar a que la página cargue completamente antes de interactuar con los elementos
    cy.get('i.eva-file-text-outline').eq(2).click();
    cy.wait(1000);
    cy.get('input[data-autofocus="true"]').click();
    cy.wait(1000);
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    cy.get('input[data-autofocus="true"]').type(randomNumber.toString());
    cy.wait(1000);
    cy.get('div.q-field__native').eq(0).click();
    cy.wait(1000);
    cy.contains('span', 'B').click();
    cy.wait(1000);
    cy.get('input[aria-label="Importe total *"]').invoke('val').then((val) => {
        importeTotal = val;
        cy.log('Importe Total:', importeTotal);
        cy.get('input[aria-label="Subtotal *"]').type(importeTotal);
        cy.get('input[aria-label="Importe"]').eq(3).type(importeTotal);
    });
    cy.wait(1000);
    cy.get('input[aria-label="Importe de descuento *"]').type('0');
    cy.wait(1000);
    cy.get('div.q-field__label.no-pointer-events.absolute.ellipsis').contains('Moneda').click({force: true});
    cy.wait(1000);
    cy.contains('span', 'Pesos argentinos').click();
    cy.wait(1000);
    cy.get('div.q-field__label.no-pointer-events.absolute.ellipsis').contains('Porcentaje de IVA').click({force: true});
    cy.wait(1000);
    cy.contains('span', '21%').click();
    cy.wait(1000);
    cy.get('div.q-field__label.no-pointer-events.absolute.ellipsis').contains('Método de pago').click({ force: true });
    cy.wait(1000);
    cy.contains('span', 'Transferencia bancaria').click();
    cy.wait(1000);
    cy.get('div.subtitle').contains('Métodos de pago').parent().find('div.q-field__label.no-pointer-events.absolute.ellipsis').contains('Importe').click({ force: true });
    cy.wait(1000);    
    cy.get('i.eva-plus-outline').eq(1).click();
    cy.wait(1000);
    cy.contains('span', ' Guardar ').click();
    
    // Confirmar Recepción
    cy.wait(1000);
    cy.visit('https://web-gestioncomercial.dev2.macamedia.com.ar/#/compras/recepcion');
    cy.wait(1000);
    cy.get('button.text-positive i').eq(0).click();
    cy.wait(1000);
    cy.get('input[aria-label="N° de remito *"]').type(randomNumber.toString());
    cy.wait(1000);
    cy.get('div[role="listitem"] input').type(1);
    cy.wait(1000);
    cy.contains('span', ' Guardar ').click();
});