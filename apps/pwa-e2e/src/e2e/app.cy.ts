describe('pwa', () => {
  beforeEach(() => {
    cy.seed();
  });

  it('should login a user into the interface', () => {
    cy.visit('/');

    cy.intercept({
      method: 'POST',
      url: '/api/login',
    }).as('apiLogin');

    cy.intercept({
      method: 'GET',
      url: '/api/me',
    }).as('apiMe');

    cy.get('#login-email').type('admin@traxion.com');

    // {enter} causes the form to submit
    cy.get('#login-password').type(`password{enter}`);

    cy.wait('@apiLogin');
    cy.wait('@apiMe');

    // our auth cookie should be present
    cy.getCookie('authCookie').should('exist');

    // UI should reflect this user being logged in
    cy.get('h3').should('contain', 'Traxion admin');
  });
});
