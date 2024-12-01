export class AssignLeavePage{
    constructor(){
        this.employeeName = '.oxd-autocomplete-text-input > input'
        this.leaveType = '.oxd-select-text-input'
        this.from_date = ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input'
        this.to_date = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input'
        this.partial_days = '.oxd-grid-4 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon'
        this.duration = '[style="grid-column-start: 1;"] > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'
        this.comment = '.oxd-textarea'
        this.btnAssign = '.oxd-button'
    }

    setEmployeeName(employeeName)
    {
        cy.get(this.employeeName).clear().type(employeeName)
        cy.contains('Searching...').should('not.exist'); 
        cy.get('.oxd-autocomplete-option') 
            .should('be.visible')
            .contains(employeeName)
            .click();  
    }

    select_Leave_Type(leaveTypeName)
    {
        cy.get(this.leaveType).first().click();
        cy.get('.oxd-select-dropdown').contains(leaveTypeName).click();
    }

    set_from_date()
    {
        const today = new Date()
        const fromDate = today.toISOString().split('T')[0];
        cy.get(this.from_date).clear().type(fromDate);
        cy.get('.oxd-calendar-wrapper').invoke('hide');
    }

    set_to_date(date) {
        const today = new Date();
        const toDate = new Date(today);
        toDate.setDate(today.getDate() + date); 
        const toDateFormatted = toDate.toISOString().split('T')[0]; 
        cy.get(this.to_date).clear().type(toDateFormatted);
        cy.wait(1)
        cy.get('.oxd-calendar-wrapper').invoke('hide');
    }

    set_partial_date()
    {
        cy.wait(1)
        cy.get(this.partial_days).click()
        cy.get(this.partial_days).click()
        cy.get('.oxd-select-dropdown').contains('All Days').click();
    }

    set_duration()
    {
        cy.get(this.duration).click()
        cy.get('.oxd-select-dropdown').contains('Half Day - Morning').click();
    }

    click_asign()
    {
        cy.get(this.btnAssign).click()
    }
}