
describe('Login and logout', () => {
  it('Visits our develop site, and login', () => {
    cy.visit('http://localhost:3000')
    cy.wait(1000)
    cy.contains("eCatch Kyst Pilot")
    cy.get('form')
    cy.get('input[name="email"]').type('p@p.io')
    cy.get('input[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.wait(500)
  })
  it('Check that we are on correct page after login', () => {
    cy.contains('Forhåndsett')
  })
  it('Test logut', () => {
    cy.wait(1000)
    cy.visit('http://localhost:3000/profile')
    cy.get('button[name="logout"]').click()
    cy.contains("eCatch Kyst Pilot")
  })
})

describe('Test stubbed login and logout', () => {
  it('Test stubbed login', () => {
    cy.login()
    cy.wait(1000)
  })
  it('Check that we are on correct page after login', () => {
    cy.visit('http://localhost:3000/homepage')
    cy.wait(1000)
    cy.contains('Forhåndsett')
  })
  it('Test stubbed logout', () => {
    cy.wait(1000)
    cy.logout()
  })
})

describe('Only correct possibilites', () => {
  it('Only DCA on page', () => {
    cy.login()
    cy.wait(1000)
    cy.visit('http://localhost:3000/homepage')
    cy.wait(1000)
    cy.contains('DCA')
    cy.contains('DEP').should('not.exist')
    cy.contains('Port call').should('not.exist')
    cy.wait(500)
    cy.logout()
  })
})