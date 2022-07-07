describe('Burger Constructor usability and functionality test', function() {
    before(function () {
        // Login
        Cypress.Cookies.debug(true);
        cy.visit('http://localhost:3000/login');
        cy.get('input').first().type('eldarknz@gmail.com');
        cy.get('input').last().type('123456789');
        cy.get('button').click();
    })

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('accessToken', 'refreshToken');
    })

    after(() => {
        cy.clearCookies();
    })

    it('if ingredients were not added', function() {
        cy.get('[class^=BurgerConstructor_ingredientsBlock]').as('ingredientsBlock');
        cy.get('@ingredientsBlock').contains('Добавьте ингредиенты').should('be.visible');
    })

    it('if ingredients can be switched in burger constructor', function() {
        cy.get('[data-type="sauce"]').first().as('sauce');
        cy.get('[data-type="main"]').last().as('main');
        cy.get('[class^=BurgerConstructor_ingredientsBlock]').first().as('dropTarget');

        // drag and drop main
        cy.get('@main').trigger("dragstart").trigger("dragleave");
        cy.get('@dropTarget').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");

        cy.get('@sauce').trigger("dragstart").trigger("dragleave");
        cy.get('@dropTarget').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");

        cy.get('[data-constructor-type="sauce"]').first().as('dragElement');
        cy.get('[data-constructor-type="main"]').first().as('dropElement');

        cy.get('@dragElement').trigger("dragstart").trigger("dragleave");
        cy.get('@dropElement').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
    })

    it('should drag the ingredients and calculate the right total price', function() {
        cy.get('[data-type="bun"]').first().as('bun');
        cy.get('[data-type="sauce"]').first().as('sauce');
        cy.get('[data-type="main"]').last().as('main');
        cy.get('[class^=BurgerConstructor_ingredientsBlock]').first().as('dropTarget');

        // drag and drop buns
        cy.get('@bun').trigger("dragstart").trigger("dragleave");
        cy.get('@dropTarget').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");

        // drag and drop sauce
        cy.get('@sauce').trigger("dragstart").trigger("dragleave");
        cy.get('@dropTarget').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
        
        let total = 0;
        let expectedTotal = 0;

        cy.get('[class^=constructor-element__price]').each(($price) => {
            total = total + parseInt($price.text());
        }).then(() => {
            cy.get('[class^=totalPrice]').invoke('text').then(text => expectedTotal =+ text).then(() => {
                expect(total).equal(expectedTotal);
            });
        });

        cy.get('@bun').find('[class^=counter_counter__num]').as('bunCount');
        cy.get('@bunCount').should('contain', 2);

        cy.get('@sauce').find('[class^=counter_counter__num]').as('sauceCount');
        cy.get('@sauceCount').should('contain', 2);

        cy.get('@main').find('[class^=counter_counter__num]').as('mainCount');
        cy.get('@mainCount').should('contain', 1);
    })

    it('the ingredient can be removed and then the total price was calculated, the number of ingredients should be updated', function() {
        cy.get('[data-type="sauce"]').first().as('sauce');
        cy.get('[data-constructor-type="sauce"]').first().as('constructor-sauce');
        cy.get('@constructor-sauce').find('[class^=constructor-element__action]').click();

        var total = 0;
        var expectedTotal = 0;

        cy.get('[class^=constructor-element__price]').each(($price) => {
            total = total + parseInt($price.text());
        }).then(() => {
            cy.get('[class^=totalPrice]').invoke('text').then(text => expectedTotal =+ text).then(() => {
                expect(total).equal(expectedTotal);
            });
        });

        cy.get('@sauce').find('[class^=counter_counter__num]').as('sauceCount');
        cy.get('@sauceCount').should('contain', 1);
    })

    it('click on the ingredient, then display the modal with the ingredient information', function() {
        // check whether the modal is opened
        cy.get('[data-type="bun"]').first().as('bun').click();
        cy.get('[class^=Modal_container').as('modal');

        // check whether the modal is visible
        cy.get('@modal').should('be.visible');

        cy.get('@bun').find('a').invoke('attr', 'href').then(attr => {
            cy.url().should('include', attr);
        });      

        // check the text from the ingredient card is equal to the text in modal with the information of the ingredient
        cy.get('@bun').find('[class^=BurgerIngredients_cardText]').invoke('text').then(text => {
            cy.get('@modal').find('[class^=IngredientDetails_ingredientBlock]').should('contain', text);
        })

        // check whether the modal is closed
        cy.get('@modal').find('[class^=Modal_closeButton]').first().click();
        cy.get('@modal').should('not.exist');
    })

    it('place an order, then display the order information and remove ingredients from the burger constructor', function() {
        // place an order
        cy.get('[class^=BurgerConstructor_ingredientsBlock]').as('ingredientsBlock');
        cy.get('[class^=BurgerConstructor_section]').find('button').wait(1000).click();
        
        // check whether the modal is visible
        cy.get('[class^=Modal_container]').as('modal').should('be.visible');

        // check the contents of the modal
        cy.get('@modal').find('[class^=OrderDetails_orderBlock]').find('p').should('contain', 'Загрузка...');
        cy.get('@modal').find('[class^=OrderDetails_title]', { timeout: 30000 }).find('h1').invoke('text').should('not.be.empty');
        cy.get('@modal').find('[class^=Modal_closeButton]').first().click();
        cy.get('@modal').should('not.exist');

        // check if there are any ingredients in the burger designer
        cy.get('@ingredientsBlock', { timeout: 1000 }).contains('Добавьте ингредиенты').should('be.visible');
    })

})