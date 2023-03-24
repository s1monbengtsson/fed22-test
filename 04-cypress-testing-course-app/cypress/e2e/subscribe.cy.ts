import { faker } from '@faker-js/faker'

describe('Newsletter Subscribe', () => {

    const email = faker.internet.email()
    const invalidEmail = 'pelle'
    const subscribedEmail = 'john@example.com'

    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('allow users to subscribe to the email list', () => {
        cy.getByDataTest('email-input').type(email)
        cy.getByDataTest('submit-button').click()
        cy.getByDataTest('success-message').should('exist').contains(email)
    })

    it('displays an error message when the email is invalid', () => {
        cy.getByDataTest('email-input').type(invalidEmail)
        cy.getByDataTest('submit-button').click()
        cy.getByDataTest('success-message').should('not.exist')
        cy.getByDataTest('server-error-message').should('not.exist')
    })

    it('should not allow user to subscribe twice', () => {
        cy.getByDataTest('email-input').type(subscribedEmail)
        cy.getByDataTest('submit-button').click()
        cy.getByDataTest('server-error-message').should('exist').contains(subscribedEmail).contains('already exists')
    })

    it('should not allow user to enter an empty email', () => {
        cy.getByDataTest('submit-button').click()
        cy.getByDataTest('error-message').should('exist').contains('Email is required')
    })
})
