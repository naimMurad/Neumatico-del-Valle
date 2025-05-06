describe('Example Test Suite', () => {
    it('should pass a simple test', () => {
        expect(true).to.equal(true);
    });

    it('should visit the example page', () => {
        cy.visit('https://example.com');
        cy.contains('Example Domain');
    });
});