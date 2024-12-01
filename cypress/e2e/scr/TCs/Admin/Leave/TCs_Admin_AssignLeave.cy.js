import { AssignLeavePage } from "../../../Pages/Pages_Leave/Pages_Leave_AssignLeave";
import { LoginPage } from "../../../Pages/Page_Admin/PAGE_Admin_Login";

const loginPage = new LoginPage()
const assignLeavePage = new AssignLeavePage()

function getRandomUser(){
    return cy.request('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users')
        .then((response) => {
            expect(response.status).to.eq(200);
            const users = response.body.data;
            const randomUser = users[Math.floor(Math.random() * users.length)];
            return randomUser.employee.firstName + ' ' + randomUser.employee.lastName; 
        });
}

function addDatatest(){
    const requestBody = {
        firstName: 'Do',
        middleName: 'Linh',
        lastName: 'Trang'
    };

    cy.request({
        method: 'POST',
        url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',
        failOnStatusCode: false,
        body: requestBody
    }).then((response) => {
        expect(response.status).to.eq(200);
    })
}

describe('Test Cases for Assign Leave',()=>{
    beforeEach(() =>
        {
            cy.session('userSession',() => 
                {
                    loginPage.load();
                    loginPage.login();
                });
            cy.visit('/web/index.php/leave/assignLeave');
        });
    
    it('All fields should be display',()=>{
        const elements = [
            { name: 'empName', selector: assignLeavePage.employeeName },
            { name: 'leave_type', selector: assignLeavePage.leaveType },
            { name: 'from_date', selector: assignLeavePage.from_date},
            { name: 'to_date', selector: assignLeavePage.to_date},
            { name: 'comment', selector: assignLeavePage.comment},
            { name: 'btnAssign', selector: assignLeavePage.btnAssign}
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

    it('To date should be after from date',()=>{
        addDatatest()
        getRandomUser().then((fullName) => {
            assignLeavePage.setEmployeeName('Do Linh Trang');
            assignLeavePage.selectRandomLeaveType()
            assignLeavePage.set_from_date()
            assignLeavePage.setToDate(-1)
            assignLeavePage.click_asign()
            cy.get('.oxd-input-group > .oxd-text')
                .should('be.visible')
                .and('contain', 'To date should be after from date');
        })
    })

    it('Verify required fields',()=>{
        cy.get('form').submit()
        cy.get('.oxd-input-field-error-message')
            .should('have.length', 4);
        cy.get('.oxd-input-field-error-message')
            .contains('Required') 
            .should('be.visible');
    })

    it('Should be display error mesage',()=>{
        getRandomUser().then((fullName) => {
            assignLeavePage.setEmployeeName('Do Linh Trang');
            assignLeavePage.setEmployeeName(fullName)
            assignLeavePage.selectRandomLeaveType()
            assignLeavePage.set_from_date()
            assignLeavePage.setToDate(1)
            assignLeavePage.click_asign()
        })
        cy.get('.oxd-text.oxd-text--p.orangehrm-leave-balance-text.--error')
            .contains('Balance not sufficient');
    })
})