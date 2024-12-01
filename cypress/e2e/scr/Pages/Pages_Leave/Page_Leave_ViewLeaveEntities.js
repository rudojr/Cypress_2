export class ViewLeaveEntitlementsPage{
    constructor() {
        this.employeeName = '.oxd-autocomplete-text-input > input'
        this.leaveType = '.oxd-select-text-input'
        this.leavePeriod = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'
        this.btnSearch = '.oxd-button'
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

    select_leave_period()
    {
        cy.get(this.leavePeriod).click()
        cy.get('.oxd-select-dropdown .oxd-select-option').contains('2024-01-01 - 2024-31-12').click()
    }

    click_search()
    {
        cy.get('.oxd-button').click()
    }
}