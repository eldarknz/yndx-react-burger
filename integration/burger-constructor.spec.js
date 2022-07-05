describe('Burger Constructor usability and functionality test', () => {
    before(function () {
        // Login
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

    /*it('if no ingredient chosen error appears', function(){
        cy.get('[class^=empty-burger_emptyBurgerContainer]').should('be.visible');
    })*/

    it('if the ingredients were not added', () => {
        cy.get('[class^=BurgerConstructor_ingredientsBlock]').as('ingredientsBlock');
        cy.get('@ingredientsBlock').contains('Добавьте ингредиенты').should('be.visible');
    })

    it('if no bun added "chose bun error" appears', function(){
        cy.get('[data-type="sauce"]').first().as('sauce');
        cy.get('[class^=burger-constructor_elements]').first().as('dropTarget');

        // drag and drop sauce
        cy.get('@sauce').trigger("dragstart").trigger("dragleave");
        cy.get('@dropTarget').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");

        cy.get('[class^=error-message_errorContainer]').should('contain', 'Пожалуйста выберите булку.');
    })

    it('two elements can be switched in burger constructor', function(){
        cy.get('[data-type="main"]').last().as('main');
        cy.get('[class^=burger-constructor_elements]').first().as('dropTarget');

        // drag and drop main
        cy.get('@main').trigger("dragstart").trigger("dragleave");
        cy.get('@dropTarget').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");

        cy.get('[class^=burger-constructor-element_constructorElementContainer]').first().as('dragElement');
        cy.get('[class^=burger-constructor-element_constructorElementContainer]').last().as('dropElement');

        cy.get('@dragElement').trigger("dragstart").trigger("dragleave");
        cy.get('@dropElement').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
    })

    it('should drag and drop ingredients and calculate correct price', function () {
        cy.get('[data-type="bun"]').first().as('bun');
        cy.get('[data-type="sauce"]').first().as('sauce');
        cy.get('[data-type="main"]').last().as('main');
        cy.get('[class^=burger-constructor_elements]').first().as('dropTarget');

        // drag and drop buns
        cy.get('@bun').trigger("dragstart").trigger("dragleave");
        cy.get('@dropTarget').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");

        // drag and drop sauce
        cy.get('@sauce').trigger("dragstart").trigger("dragleave");
        cy.get('@dropTarget').trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
        
        var total = 0;
        var expectedTotal = 0;

        cy.get('[class^=constructor-element__price]').each(($price) => {
            total = total + parseInt($price.text());
        }).then(() => {
            cy.get('[class^=price]').invoke('text').then(text => expectedTotal = +text).then(() => {
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

    it('ingredient can be removed -> calculate price, badge are updated', function(){
        cy.get('[data-type="sauce"]').first().as('sauce');
        cy.get('[data-constructor-type="sauce"]').first().as('constructor-sauce');
        cy.get('@constructor-sauce').find('[class^=constructor-element__action]').click();

        var total = 0;
        var expectedTotal = 0;

        cy.get('[class^=constructor-element__price]').each(($price) => {
            total = total + parseInt($price.text());
        }).then(() => {
            cy.get('[class^=price]').invoke('text').then(text => expectedTotal = +text).then(() => {
                expect(total).equal(expectedTotal);
            });
        });

        cy.get('@sauce').find('[class^=counter_counter__num]').as('sauceCount');
        cy.get('@sauceCount').should('contain', 1);
    })

    it('click on ingredient -> display modal with ingredient details', function(){
        cy.get('[data-type="bun"]').first().as('bun').click();
        cy.get('[class^=modal_modal').as('modal');

        cy.get('@modal').should('be.visible');

        cy.get('@bun').find('a').invoke('attr', 'href').then(attr => {
            cy.url().should('include', attr);
        });      

        cy.get('@bun').find('[class^=ingredient-item_title]').invoke('text').then(text => {
            cy.get('@modal').find('[class^=ingredient-details_container]').should('contain', text);
        })

        cy.get('@modal').find('[class^=modal_iconContainer]').first().click();
        cy.get('@modal').should('not.exist');
    })

    it('click "Оформить заказ" -> displays loader and submit order', function(){
        //submit order
        cy.get('[class^=burger-constructor_container]').find('button').wait(1000).click();
        cy.get('[class^=burger-constructor_container]').find('button').wait(1000).click();

        cy.get('[class^=loader_ellipsisContainer]').should('be.visible');
        cy.get('[class^=modal_modal]', { timeout: 16000 }).as('modal').should('be.visible');
        cy.get('@modal').find('[class^=orderId]').invoke('text').should('not.be.empty');
        cy.get('[class^=loader_ellipsisContainer]').should('not.exist');
    })
})