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

    cy.get('input[placeholder=Email]').type('admin@traxion.com');

    // {enter} causes the form to submit
    cy.get('input[placeholder=Password]').type(`password{enter}`);

    cy.wait('@apiLogin');

    // our auth cookie should be present
    cy.getCookie('authCookie').should('exist');

    // UI should reflect this user being logged in
    cy.get('h3').should('contain', 'Traxion admin');
  });
});
