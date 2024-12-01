import { AddLeaveEntitlements } from "../../../Pages/Pages_Leave/Page_leave_AddEntitites";
import { LoginPage } from "../../../Pages/Page_Admin/PAGE_Admin_Login";
import { AssignLeavePage } from "../../../Pages/Pages_Leave/Pages_Leave_AssignLeave";
import { ViewLeaveEntitlementsPage } from "../../../Pages/Pages_Leave/Page_leave_ViewLeaveEntities";

const loginPage = new LoginPage()
const addLeaveEntities = new AddLeaveEntitlements()
const asssignLeavePage = new AssignLeavePage()
const viewLeaveEntitlements = new ViewLeaveEntitlementsPage()

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
            cy.visit('/web/index.php/leave/addLeaveEntitlement');
        });

        it('Display all elements',()=>{
            const elements = [
                { name: 'empName', selector: addLeaveEntities.employeeName },
                { name: 'leave_type', selector: addLeaveEntities.leaveType },
                { name: 'leave_period', selector: addLeaveEntities.leavePeriod},
                { name: 'entitlement', selector: addLeaveEntities.entitlement}
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
    
        it('Should add entitlement successfully',()=>{
            addDatatest()
            addLeaveEntities.setEmployeeName('Do Linh Trang')
            addLeaveEntities.select_Leave_Type('CAN - FMLA')
            addLeaveEntities.select_leave_period()
            addLeaveEntities.set_entitlement(15)
            cy.get('form').submit()
            cy.get('.oxd-sheet').should('be.visible').then(($sheet) => {
                const sheetText = $sheet.text(); 
                cy.log('Text of oxd-sheet: ', sheetText);  
            });
            cy.get('.orangehrm-modal-footer > .oxd-button--secondary').click()
        })

        it('Should display employee record in employee Entitlements',()=>{
            cy.visit('/web/index.php/leave/viewLeaveEntitlements')
            viewLeaveEntitlements.setEmployeeName('Do Linh Trang')
            viewLeaveEntitlements.select_Leave_Type('CAN - FMLA')
            // viewLeaveEntitlements.select_leave_period()
            viewLeaveEntitlements.click_search()
        })

        it('Should assign leave successfully',()=>{
            cy.visit('/web/index.php/leave/assignLeave')
            const employeeName = 'Do Linh Trang'
            asssignLeavePage.setEmployeeName(employeeName)
            asssignLeavePage.select_Leave_Type('CAN - FMLA')
            cy.wait(1)
            asssignLeavePage.set_from_date()
            cy.wait(1)
            asssignLeavePage.set_to_date(1)
            cy.wait(1)
            asssignLeavePage.set_partial_date()
            asssignLeavePage.set_duration()
            asssignLeavePage.click_asign()
        })
    })