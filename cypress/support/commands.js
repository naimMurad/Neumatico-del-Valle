Cypress.Commands.add('login', () => {
    cy.log('Ejecutando comando: cargar_parametros');

    const credenciales = {
        username: 'Naim Murad',
        password: '1234'
    };

    cy.visit('https://web-gestioncomercial.dev2.macamedia.com.ar/#/login');
    cy.wait(1000);
    cy.get('[placeholder="Usuario"]').type(credenciales.username);
    cy.get('[placeholder="Contraseña"]').type(credenciales.password);
    cy.wait(1000);
    cy.get('button[type="button"]:contains("Ingresar")').click();

    cy.log('Comando: login completado');
});