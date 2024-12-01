import { LoginPage } from "../../Pages/Page_Admin/PAGE_Admin_Login";
import { AddEmployeePage } from "../../Pages/Page_PIM/PAGE_Pim_AddEmployee";
import { EmployeeList } from "../../Pages/Page_PIM/PAGE_Pim_EmployeeList";

const loginPage = new LoginPage();
const addEmployeePage = new AddEmployeePage();
const employeelistPage = new EmployeeList();

describe('Add Employee without login details',()=>{
    beforeEach(() =>
        {
            cy.session('userSession',() => 
                {
                    loginPage.load();
                    loginPage.login();
                });
            cy.visit('/web/index.php/pim/addEmployee');
        });
    it('Fully visible elements',()=>{
        const elements =[
            { name: 'txt First Name', selector: addEmployeePage.employee_first_name},
            { name: 'txt Middle Name', selector: addEmployeePage.employee_middle_name},   
            { name: 'txt Last Name', selector: addEmployeePage.employee_last_name},   
            { name: 'Employee ID', selector: addEmployeePage.employee_id},   
            { name: 'Employee Image', selector: addEmployeePage.employee_image},   
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
    it('Display error message when pressing save without filling in information',()=>{
        cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').clear();
        addEmployeePage.click_save();
        cy.get('.--name-grouped-field > :nth-child(1) > .oxd-text')
            .invoke('text')
            .then((text) => {
            expect(text.trim()).to.eq('Required');
            });        
        cy.get('.--name-grouped-field > :nth-child(3) > .oxd-text')
        .invoke('text')
        .then((text) => {
        expect(text.trim()).to.eq('Required');
        });   
    })
    it('Must save employee sucessfully',()=>{
        const employeeData = {
            firstName: 'Hoang',
            middleName: 'Duc',
            lastName: 'Thien',
        }
        const randomEmployeeID = Math.floor(10000 + Math.random() * 90000).toString();
        addEmployeePage.set_employee_info(employeeData);
        addEmployeePage.set_employee_id(randomEmployeeID);
        addEmployeePage.click_save();
        cy.get('.oxd-text--toast-message').invoke('text').then((text) =>{
            expect(text.trim()).to.equal('Successfully Saved');
        })

        cy.visit('/web/index.php/pim/viewEmployeeList');
        cy.get(':nth-child(2) > .oxd-input').type(`${randomEmployeeID}{enter}`);
        cy.wait(1000);
        employeelistPage.getNumberOfRecords().then((numberRecord) => {
            expect(numberRecord).to.eq(1); 
        
            cy.get('.oxd-table-card > .oxd-table-row > :nth-child(2) > div')
              .invoke('text')  
              .then((text) => {
                expect(text.trim()).to.eq(randomEmployeeID);
              });
            });
    })
})