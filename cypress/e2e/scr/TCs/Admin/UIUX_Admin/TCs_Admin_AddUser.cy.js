import { AddUserPage } from "../../../Pages/Page_Admin/PAGE_Admin_AddUser";
import { LoginPage } from "../../../Pages/Page_Admin/PAGE_Admin_Login";

const loginPage = new LoginPage();
const addUserPage = new AddUserPage();

describe('Test Cases for Add new employee',()=>{
    beforeEach(() =>
        {
            cy.session('userSession',() => 
                {
                    loginPage.load();
                    loginPage.login();
                });
            cy.visit('/web/index.php/admin/saveSystemUser');
        });

    it('Must display all elements on the page',()=>{
        const elements = [
            { name: 'userRole', selector: addUserPage.userRole },
            { name: 'empName', selector: addUserPage.empName },
            { name: 'status', selector: addUserPage.status },
            { name: 'userName', selector: addUserPage.userName },
            { name: 'passWord', selector: addUserPage.passWord},
            { name: 'Confirm passWord', selector: addUserPage.confirmPassWord},
            { name: 'Button cancel', selector: addUserPage.btnCancel},
            { name: 'Button save', selector: addUserPage.btnSave}
        ];
        elements.forEach(element => {
            cy.get(element.selector).then($el => {
                if ($el.is(':visible')) {
                    cy.log(`${element.name} is visible.`);
                } else {
                    cy.log(`${element.name} is NOT visible.`);
                }
            });
        });
    })

    it('Must display error message when click save without data',()=>{
        addUserPage.clickSave();
        const errorMessages = [
            'Required', 
            'Required',
            'Required',
            'Required',
            'Required',
            'Passwords do not match' 
        ];
        errorMessages.forEach((message, index) => {
            cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
                .eq(index) 
                .should('have.text', message);
        });
    })

    it('Must display error when saving information with username less than 5 characters',()=>{
        const role = 'Admin';
        const empName = 'Cypress Auto Test';
        const status = 'Enabled';
        const username = 'cypr';
        const password = 'Admin123';
        const cfPassWord = password;
        ///
        addUserPage.selectUserRole(role);
        addUserPage.setEmpName(empName);
        addUserPage.selectStatus(status);
        addUserPage.setUserName(username);
        addUserPage.setPassWord(password);
        addUserPage.setConfirmPassWord(cfPassWord);
        ///
        addUserPage.clickSave();
        cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
        .should('have.text', 'Should be at least 5 characters');
    })
})