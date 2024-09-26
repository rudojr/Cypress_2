import { LoginPage } from "../../../Pages/Page_Admin/PAGE_Admin_Login";
import { SystemUsersPage } from "../../../Pages/Page_Admin/PAGE_Admin_SystemUsers";

const systemUsersPage = new SystemUsersPage();
const loginPage = new LoginPage();

describe('Check if elements are fully visible on the page',()=>{
    
    beforeEach(() =>
        {
            cy.session('userSession',() => 
                {
                    loginPage.load();
                    loginPage.login();
                });
            cy.visit('/web/index.php/admin/viewSystemUsers');
        });

    it('Fully visible elements',()=>{
        const elements = [
            { name: 'txtUserName', selector: systemUsersPage.txtUserName },
            { name: 'Combobox UserRole', selector: systemUsersPage.cbxUserRole },
            { name: 'txtEmployeeName', selector: systemUsersPage.txtEmployeeName },
            { name: 'Combobox Status', selector: systemUsersPage.cbxStatus },
            { name: 'Table Record', selector: systemUsersPage.tbRecord}
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
    });

    it('Table Record should be display all employees',()=>{
        cy.get(`${systemUsersPage.tbRecord} .oxd-table-row.oxd-table-row--with-border`).should('have.length.greaterThan', 0);
        cy.get(`${systemUsersPage.tbRecord} .oxd-table-row.oxd-table-row--with-border`).then(rows => {
            cy.log(`Number of employee records displayed: ${rows.length}`);
        });
    });

    it('Table should display the name that matches the keyword',()=>{
        systemUsersPage.setUsername('admin');
        systemUsersPage.clickSearch();
        cy.wait(2000);
        cy.get('.oxd-table-card > .oxd-table-row').should('be.visible');
        cy.get('.oxd-table-card > .oxd-table-row').each(($row) => {
            cy.wrap($row).find(':nth-child(2) > div').invoke('text').then((text) => {
                expect(text.toLowerCase()).to.contain('admin');
            });
        });
    });

    it('Should show error message when username not found',()=>{
        const randomUsername = `nonexistentuser_${Math.random().toString(36).substring(2, 15)}`;
        systemUsersPage.setUsername(randomUsername);
        systemUsersPage.clickSearch();
        cy.wait(10);
        cy.get('.oxd-table-card > .oxd-table-row').should('not.exist');
    })
    it('Table should display records matchs with user role',()=>{
        const roleQuery = 'Admin';
        cy.get(systemUsersPage.selectUserRole).click();
        cy.get('.oxd-select-dropdown').contains(roleQuery).click();
        systemUsersPage.clickSearch();
        cy.wait(1000);
        cy.get('.oxd-table-card > .oxd-table-row').should('be.visible').then(($rows) => {
            const rowCount = $rows.length; 
    
            if (rowCount === 0) {
                cy.log('No records found');
                return;
            }
    
            cy.wrap($rows).each(($row) => {
                cy.wrap($row).find(':nth-child(3) > div').invoke('text').then((text) => {
                    expect(text.trim().toLowerCase()).to.equal(roleQuery.toLowerCase());
                });
            });
            
            cy.log(`Total records found: ${rowCount}`);
        });    
    });

    it('Show results with status enabled',()=>{
        const queryStatus = 'Enabled';
        systemUsersPage.selectStatus(queryStatus);
        systemUsersPage.clickSearch();
        cy.wait(1000);
        cy.get('.oxd-table-card > .oxd-table-row').should('be.visible').then(($rows) => {
        const rowCount = $rows.length; 

        if (rowCount === 0) {
                cy.log('No records found');
                return;
            }
            cy.wrap($rows).each(($row) => {
                cy.wrap($row).find(':nth-child(5) > div').invoke('text').then((text) => {
                    expect(text.trim().toLowerCase()).to.equal(queryStatus.toLowerCase());
                });
            });
            
            cy.log(`Total records found: ${rowCount}`);  
        })
    });
    it('Show results with status disabled',()=>{
        const queryStatus = 'Disabled';
        systemUsersPage.selectStatus(queryStatus);
        systemUsersPage.clickSearch();
        cy.wait(1000);
        cy.get('.oxd-table-card > .oxd-table-row').should('be.visible').then(($rows) => {
        const rowCount = $rows.length; 

        if (rowCount === 0) {
                cy.log('No records found');
                return;
            }
            cy.wrap($rows).each(($row) => {
                cy.wrap($row).find(':nth-child(5) > div').invoke('text').then((text) => {
                    expect(text.trim().toLowerCase()).to.equal(queryStatus.toLowerCase());
                });
            });
            
            cy.log(`Total records found: ${rowCount}`);  
        })
    });

    it('Should reset all when click Reset',()=>{
        const queryName = 'Admin';
        const queryRole = 'Admin';
        const status = 'Enable';
        systemUsersPage.setEmployeeName(queryName);
        systemUsersPage.selectUserRole(queryRole);
        systemUsersPage.selectStatus(status);
        systemUsersPage.clickReset();
    
        cy.get(systemUsersPage.txtEmployeeName).should('have.value', ''); 
        cy.get(systemUsersPage.txtUserName).should('have.value', ''); 
        cy.get(systemUsersPage.cbxUserRole).should('contain.text', '');
        cy.get(systemUsersPage.cbxStatus).should('contain.text', ''); 
    })
})