export class AddEmployeePage {
    constructor() {
        this.employee_image = '.orangehrm-employee-image'; 
        this.employee_first_name = 'input[name="firstName"]';
        this.employee_middle_name = 'input[name="middleName"]';
        this.employee_last_name = 'input[name="lastName"]';
        this.employee_id = 'input.oxd-input.oxd-input--active';
        this.btnCancel = '.oxd-button--ghost'; 
        this.btnSave = 'button[type="submit"]';
    }

    set_employee_info({ firstName = '', middleName = '', lastName = '' }) {
        if (firstName) cy.get(this.employee_first_name).type(firstName);
        if (middleName) cy.get(this.employee_middle_name).type(middleName);
        if (lastName) cy.get(this.employee_last_name).type(lastName);
    }
    set_employee_id(id) {
        cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(id);
    }
    click_cancel() {
        cy.get(this.btnCancel).click();
    }
    click_save() {
        cy.get(this.btnSave).click();
    }
  } 