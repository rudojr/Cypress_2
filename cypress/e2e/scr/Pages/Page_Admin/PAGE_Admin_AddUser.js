export class AddUserPage{
    constructor() {
        this.userRole = ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text';
        this.empName = '.oxd-autocomplete-text-input > input';
        this.status = ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text';
        this.userName = ':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input';
        this.passWord = '.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input';
        this.confirmPassWord = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input';
        this.btnCancel = '.oxd-button--ghost';
        this.btnSave = '.oxd-button--secondary';
    }
    selectUserRole(role)
    {
        cy.get(this.userRole).click();
        cy.get('.oxd-select-dropdown').contains(role).click();
    }
    setEmpName(name)
    {
        cy.get(this.empName).type(name);
    }
    selectStatus(status)
    {
        cy.get(this.status).click();
        cy.get('.oxd-select-dropdown').contains(status).click();
    }
    setUserName(username)
    {
        cy.get(this.userName).type(username);
    }
    setPassWord(password)
    {
        cy.get(this.passWord).type(password);
    }
    setConfirmPassWord(cfPassWord)
    {
        cy.get(this.confirmPassWord).type(cfPassWord);
    }
    clickCancel()
    {
        cy.get(this.btnCancel).click();
    }
    clickSave()
    {
        cy.get(this.btnSave).click();
    }
}