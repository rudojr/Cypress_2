export class SystemUsersPage{
    constructor() {
        this.txtUserName =  ':nth-child(2) > .oxd-input';
        this.cbxUserRole = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text';
        this.userRoleAllow = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon';
        this.txtEmployeeName = '.oxd-autocomplete-text-input > input';
        this.cbxStatus = ':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text';
        this.statusAllow = ':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon';
        this.tbRecord = '.orangehrm-container';
        this.btnReset = '.oxd-button--ghost';
        this.btnSearch = '.oxd-form-actions > .oxd-button--secondary';
    }
    setUsername(username)
    {
        cy.get(this.txtUserName).type(username);
    }
    setEmployeeName(empName)
    {
        cy.get(this.txtEmployeeName).type(empName);
    }
    selectUserRole(role)
    {
        cy.get(this.userRoleAllow).click();
        cy.get('.oxd-select-dropdown').contains(role).click();
    }
    selectStatus(status)
    {
        cy.get(this.statusAllow).click()
        cy.get('.oxd-select-dropdown').contains(status).click();
    }
    clickReset()
    {
        cy.get(this.btnReset).click();
    }
    clickSearch()
    {
        cy.get(this.btnSearch).click();
    }
}