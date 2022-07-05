describe('Burger Constructor usability and functionality test', () => {
    before(function () {
        Cypress.Cookies.debug(true);
        cy.visit('http://localhost:3000/login');
        cy.get('input').first().type('eldarknz@gmail.com');
        cy.get('input').last().type('123456');
        cy.get('button').click();
    })

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('accessToken', 'refreshToken');
    })

    after(() => {
        cy.clearCookies();
    })
})