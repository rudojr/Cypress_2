export class Performance_KPI_Save_Page{
    constructor() {
        this.key_Performance_Indicator = '.oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input';
        this.jobtitle = '.oxd-select-text';
        this.minimumRating = '.oxd-grid-4 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input';
        this.maximumRating = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input';
        this.isMmakeDefaultScale = '.oxd-switch-input';
        this.btnCancel = '.oxd-button--ghost';
        this.btnSave = 'button[type="submit"]';
    }

    set_Key_Performance_Indicator(value)
    {
        cy.get(this.key_Performance_Indicator).clear().type(value);
    }

    select_Jobtitle(value)
    {
        cy.get(this.jobtitle).click();
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

    set_Minimum_Rating(value)
    {
        cy.get(this.minimumRating).clear().type(value);
    }

    set_Maximum_Rating(value)
    {
        cy.get(this.maximumRating).clear().type(value);
    }

    click_reset()
    {
        cy.get(this.btnCancel).click();
    }
    
    click_save()
    {
        cy.get(this.btnSave).click();
    }

    setSwitch(value) {
        const switchElement = cy.get(this.isMmakeDefaultScale);
        const shouldCheck = value.toLowerCase() === 'true';
    
        switchElement.then(($el) => {
            const isChecked = $el.prop('checked');
            if (isChecked && !shouldCheck) {
                cy.wrap($el).click(); 
            }
            else if (!isChecked && shouldCheck) {
                cy.wrap($el).click(); 
            }
        });
    }
}