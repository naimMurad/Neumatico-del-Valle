describe('Automatización de login', () => {
    beforeEach(() => {
        // Visitar la página web antes de cada prueba
        cy.visit('https://web-gestioncomercial.dev2.macamedia.com.ar/#/login');
        });

        it('Ingreso de credenciales de login', () => {
        // Parámetros de login
        const credenciales = {
            username: 'superadmin1', // Reemplaza con el usuario deseado
            password: '1234' // Reemplaza con la contraseña deseada
        };
        // Esperar a que la página cargue completamente antes de interactuar con los elementos
        cy.wait(1000); // Ajusta el tiempo según sea necesario
        // Llenar los campos de usuario y contraseña

        cy.get('[placeholder="Usuario"]').type(credenciales.username); // Verifica que este selector coincida con el campo de usuario
        cy.get('[placeholder="Contraseña"]').type(credenciales.password); // Verifica que este selector coincida con el campo de contraseña
        cy.wait(1000); // Ajusta el tiempo según sea necesario        
        cy.get('button[type="button"]:contains("Ingresar")').click(); // Selector más específico para el botón de login
        });
});