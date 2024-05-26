/// <reference types = "cypress" />

describe('first test suite', () => {
    it('first test', () => {

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //By Tag name
        cy.get('input');

        //By ID
        cy.get('#inputEmail1');

        //By Class value

        cy.get('.input-full-width');

        //Find by attribute name
        cy.get('[fullwidth]');

        //by Attribute and value
        cy.get('[placeholder="Email"]');

        //Find by entire Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]');

        //Find by two attributes
        cy.get('[placeholder="Email"][fullwidth]');

        //By tag, attribute, id, and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

        //Find by cypress test id
        cy.get('[data-cy="imputEmail1"]');
    })

    it('second test', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //Theory
        // get() - Find web elements on the page by locater globally
        // find() - find child elements by locater
        // contains() - find element by HTML text and by text and locater. Only finds the first match.
        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.contains('nb-card', 'Horizontal form').find('button') //These will be local in the horizontal form //Same here
        cy.contains('nb-card', 'Horizontal form').contains('Sign in') //Same here
        //Get is ALWAYS global
        cy.contains('nb-card', 'Horizontal form').get('button')

        //cypress chains and DOM
        cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain', 'Sign in')
        .parents('form')
        .find('nb-checkbox')
        .click();
    })

    it('save subject of the command', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //CANT DO THINGS LIKE THIS
        // const gridCard = cy.contains('nb-card', 'Using the Grid');
        // gridCard.find('[for="inputEmail1"]').should('contain', 'Email')
        // gridCard.find('[for="inputPassword2"]').should('contain', 'Password')

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        // 1. Using cypress alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

        // 2. Cypress then() methods
        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    })

    it.only('extract test values', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2
        cy.get('[for="exampleInputEmail1"]').then( label => { //label is a JQuery
            const labelText = label.text()
            expect(labelText).to.equal('Email address');
            cy.wrap(labelText).should('contain', 'Email address'); //Same thing here
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => { //Label is a string
            expect(text).to.equal('Email address')
        })
        //or 
        cy.get('[for="exampleInputEmail1"]').invoke('text').should('contain', 'Email address');
        //or to also save it as an alias.
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address');

        //4
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label')
        })

        //5 invoke property
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com').then(property => { //OR
            expect(property).to.equal('test@test.com');
        });

    })
})