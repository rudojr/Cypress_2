export class Performance_KPI_Search_Page{
    constructor(){
        this.jobtitle = '.oxd-select-text';
        this.btnReset = 'button[type=reset]';
        this.btnSearch = 'button[type="submit"]';
        this.tblRecords = '.orangehrm-container';
        this.btnAdd = '.orangehrm-header-container > .oxd-button';
    }
    
    select_jobtitle(value)
    {
        cy.get(this.jobtitle).click();
        cy.wait(1000);
        // cy.contains(value)
        //     .should('be.visible')
        //     .click()
        cy.contains(value).then(($option) => {
            if ($option.length) {
                cy.wrap($option).scrollIntoView().click(); 
            } else {
                let keepScrolling = true;
                while (keepScrolling) {
                    cy.get(this.jobtitle).scrollIntoView(); 
                    cy.contains(value).then(($newOption) => {
                        if ($newOption.length) {
                            keepScrolling = false; 
                            cy.wrap($newOption).scrollIntoView().click();
                        }
                    });
                    cy.wait(500); 
                }
            }
        });
    }

    click_reset()
    {
        cy.get(this.btnReset).click();
    }

    click_search()
    {
        cy.get(this.btnSearch).click();
    }

    click_add(){
        cy.get(this.btnAdd).click();
    }
}
