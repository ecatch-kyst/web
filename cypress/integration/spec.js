
describe('Login and logout', () => {
  it('Visits our develop site, and login', () => {
    cy.visit('http://localhost:3000/')
    cy.contains("eCatch Kyst Pilot")
    cy.get('form')
    cy.get('input[name="email"]').type('p@p.io')
    cy.get('input[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.wait(500)
  })
  it('Check that we are on correct page after login', () => {
    cy.contains('Report departure')
  })
  it('Test logut', () => {
    cy.visit('http://localhost:3000/profile')
    cy.get('button[name="logout"]').click()
    cy.contains("eCatch Kyst Pilot")
  })
})

describe('Test stubbed login and logout', () => {
  it('Test stubbed login', () => {
    cy.login()
    cy.wait(500)
  //  cy.visit('http://localhost:3000/dashboard')
  })
  it('Check that we are on correct page after login', () => {
    cy.contains('Report departure')
  })
  it('Test stubbed logout', () => {
    cy.logout()
  })
})

describe('Test stubbed login and logout', () => {
  it('Only DEP on page', () => {
    cy.login()
    cy.wait(500)
    cy.contains('Report departure')
    cy.contains('Report catch').should('not.exist')
    cy.contains('Port call').should('not.exist')
  })
})