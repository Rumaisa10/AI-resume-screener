describe('Upload Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should load the form', () => {
    cy.contains('Analyse your resume').should('be.visible')
  })
it('should show file upload area', () => {
  cy.get('#fileInput').should('exist')
  cy.contains('Drop your CV here').should('be.visible')
  cy.contains('Accepts .pdf or .txt').should('be.visible')
})

  it('should disable button while analysing', () => {
    cy.get('button[type="submit"]').should('not.be.disabled')
  })

  it('should accept job description input', () => {
    cy.get('#jobDescription').type('Looking for a React developer')
    cy.get('#jobDescription').should('have.value', 'Looking for a React developer')
  })
})