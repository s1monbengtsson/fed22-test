declare namespace Cypress {
    /**
    * Custom command to select DOM element by data-test attribute.
    ** @example cy.getByDataTest('email-input')
    */
    interface Chainable {
        getByDataTest(selectore:string):Chainable<JQuery<HTMLElement>>
    }
}