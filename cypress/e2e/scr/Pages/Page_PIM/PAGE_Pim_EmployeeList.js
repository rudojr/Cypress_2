export class EmployeeList{
    constructor() {
        this.empName = ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input';
        this.empId = ':nth-child(2) > .oxd-input';
        this.empStatus = ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text';
        this.supervisorName = ':nth-child(5) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input';
        this.jobTitle = ':nth-child(6) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text';
        this.subUnit = ':nth-child(7) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text';
        this.btnReset = '.oxd-button--ghost';
        this.btnSearch = '.oxd-form-actions > .oxd-button--secondary';
        this.tblRecords = '.orangehrm-container';
    }
    setEmpName(txtEmpName)
    {
        cy.get(this.empName).type(txtEmpName);
    }
    setEmpID(txtEmpID)
    {
        cy.get(this.empName).type(txtEmpID);
    }
    selectEmpStatus(status)
    {
        cy.get(this.empStatus).click();
        cy.get('.oxd-select-dropdown').contains(status).click();
    }
    setsupervisorName(txtSupName)
    {
        cy.get(this.supervisorName).type(txtSupName);
    }
    selectJobTitle(job)
    {
        cy.get(this.jobTitle).click();
        cy.get('.oxd-select-dropdown').contains(job).click();
    }
    selectSubUnit(unit)
    {
        cy.get(this.subUnit).click();
        cy.get('.oxd-select-dropdown').contains(unit).click();
    }
    click_search()
    {
        cy.get(this.btnSearch).click()
    }

    click_reset()
    {
        cy.get(this.btnReset).click()
    }
    
    getNumberOfRecords() {
        return cy.get(this.tblRecords)  
          .find('.oxd-table-card > .oxd-table-row')  
          .its('length') 
          .then((rowCount) => {
            return rowCount;
          });
    }    
    }