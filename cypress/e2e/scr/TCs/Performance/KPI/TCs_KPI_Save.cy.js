import { LoginPage } from "../../../Pages/Page_Admin/PAGE_Admin_Login";
import { Performance_KPI_Save_Page } from "../../../Pages/Page_Performance/Page_Performance_SaveKPI";
import { Performance_KPI_Search_Page } from "../../../Pages/Page_Performance/Page_Performance_SearchKPI";

const loginPage = new LoginPage();
const saveKpiPage = new Performance_KPI_Save_Page();

describe('Add KPI', () => {

    beforeEach(() =>
        {
            cy.session('userSession',() => 
                {
                    loginPage.load();
                    loginPage.login();
                    cy.wait(1000)
                });
                cy.visit('/web/index.php/performance/saveKpi');
                cy.wait(1000);
            });

    it('All elements shoule be visible on save kpi page',()=>{
        cy.wait(1000);
        cy.get(saveKpiPage.key_Performance_Indicator).should('be.visible');
        cy.get(saveKpiPage.jobtitle).should('be.visible');
        cy.get(saveKpiPage.minimumRating).should('be.visible');
        cy.get(saveKpiPage.maximumRating).should('be.visible');
        cy.get(saveKpiPage.isMmakeDefaultScale).should('be.visible');
        cy.get(saveKpiPage.btnCancel).should('be.visible');
        cy.get(saveKpiPage.btnSave).should('be.visible');
        
        cy.log('All fields are visible');
    })

    it('Show error when saving but no information filled in',()=>{
        cy.wait(1000);
        saveKpiPage.click_save();

        const elementsToCheck = [
            'div:nth-child(1) > div > div:nth-child(1)',
            'div:nth-child(1) > div > div:nth-child(2)',
            'div:nth-child(2) > div > div:nth-child(1)',
            'div:nth-child(2) > div > div:nth-child(2)',
        ];
    
        elementsToCheck.forEach(selector => {
            cy.get(`#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > form > ${selector} > div > span`)
                .should('have.text', 'Required');
        });   
    }),

    it('Show error "Should be a number between 0-100" when entering min < 0',()=>{
        cy.wait(1000);
        const queryKeyPerformance = '150 TCs/Month';
        const queryJobtitle = 'QA';
        const minimumRating = -1;
        const maximumRating = 100;

        saveKpiPage.set_Key_Performance_Indicator(queryKeyPerformance);
        saveKpiPage.select_Jobtitle(queryJobtitle)
        saveKpiPage.set_Minimum_Rating(minimumRating);
        saveKpiPage.set_Maximum_Rating(maximumRating);

        cy.get(':nth-child(1) > .oxd-input-group > .oxd-text')
            .should('have.text', 'Should be a number between 0-100');   
    })

    it('Show error "Should be a number between 0-100" when entering max < 0',()=>{
        cy.wait(1000);

        const queryKeyPerformance = '150 TCs/Month';
        const queryJobtitle = 'QA';
        const minimumRating = 10;
        const maximumRating = -101;

        saveKpiPage.set_Key_Performance_Indicator(queryKeyPerformance);
        saveKpiPage.select_Jobtitle(queryJobtitle)
        saveKpiPage.set_Minimum_Rating(minimumRating);
        saveKpiPage.set_Maximum_Rating(maximumRating);
        cy.get('.oxd-input-group > .oxd-text')
            .should('have.text', 'Should be a number between 0-100');       
    })

    it('Save KPI successfully',()=>{
        cy.wait(1000);
        const queryKeyPerformance = '150 TCs/Month';
        const queryJobtitle = 'QA';
        const minimumRating = 30;
        const maximumRating = 100;

        saveKpiPage.set_Key_Performance_Indicator(queryKeyPerformance);
        saveKpiPage.select_Jobtitle(queryJobtitle)
        saveKpiPage.set_Minimum_Rating(minimumRating);
        saveKpiPage.set_Maximum_Rating(maximumRating);
        
        saveKpiPage.click_save();
        cy.get('.oxd-text--toast-title').should('have.text', 'Success'); 
        cy.get('.oxd-text--toast-message').should('have.text', 'Successfully Saved'); 
    })

    const searchKpiPage = new Performance_KPI_Search_Page();

    it('Show KPI into table records after save successfully',()=>{
        cy.visit('/web/index.php/performance/searchKpi');
        cy.wait(1000);
        const queryJobtitle = 'QA';
        searchKpiPage.select_jobtitle(queryJobtitle);
        searchKpiPage.click_search();

        cy.get('.oxd-table-body').each(($row, index) => {
            if (index === 0) {
                const columnValues = [];

                for (let i = 2; i <= 5; i++) {
                    cy.wrap($row)
                        .find(`.oxd-table-cell.oxd-padding-cell:nth-child(${i})`)
                        .invoke('text')
                        .then((text) => {
                            columnValues.push(text.trim());
                        });
                }

                cy.wrap(columnValues).then((values) => {
                    const normalizedValues = values.map(value => value === 'null' ? null : value.trim());
                    expect(normalizedValues).to.deep.equal(['150 TCs/Month', 'QA', '30', '100']);
                });
            }
        })
    })

    it('Should Edit KPI sucessfully',()=>{
        cy.visit('/web/index.php/performance/searchKpi');
        cy.wait(1000);
        const queryJobtitle = 'QA';
        searchKpiPage.select_jobtitle(queryJobtitle);
        searchKpiPage.click_search();
        cy.get('.oxd-table-cell-actions > :nth-child(1) > .oxd-icon').click();
        const queryKeyPerformance = '200 TCs/Month';
        const minimumRating = 40;
        const maximumRating = 100;
    
        saveKpiPage.set_Key_Performance_Indicator(queryKeyPerformance);
        saveKpiPage.select_Jobtitle(queryJobtitle)
        saveKpiPage.set_Minimum_Rating(minimumRating);
        saveKpiPage.set_Maximum_Rating(maximumRating);
        saveKpiPage.setSwitch('true');
        saveKpiPage.click_save();
        cy.get('.oxd-text--toast-title').should('have.text', 'Success'); 
    })

    it('Should update KPI information after edit',()=>{
        cy.visit('/web/index.php/performance/searchKpi');
        cy.wait(1000);
        const queryJobtitle = 'QA';
        searchKpiPage.select_jobtitle(queryJobtitle);
        searchKpiPage.click_search();

        cy.get('.oxd-table-body').each(($row, index) => {
            if (index === 0) {
                const columnValues = [];

                for (let i = 2; i <= 6; i++) {
                    cy.wrap($row)
                        .find(`.oxd-table-cell.oxd-padding-cell:nth-child(${i})`)
                        .invoke('text')
                        .then((text) => {
                            columnValues.push(text.trim());
                        });
                }

                cy.wrap(columnValues).then((values) => {
                    const normalizedValues = values.map(value => value === 'null' ? null : value.trim());
                    expect(normalizedValues).to.deep.equal(['200 TCs/Month', 'QA', '40', '100','Yes']);
                });
            }
        })
    })

    it('Should delete record KPI',()=>{
        cy.visit('/web/index.php/performance/searchKpi');
        cy.wait(1000);
        const queryJobtitle = 'QA';
        searchKpiPage.select_jobtitle(queryJobtitle);
        searchKpiPage.click_search();
        cy.get('.oxd-table-row > :nth-child(1) > .oxd-checkbox-wrapper > label > .oxd-checkbox-input > .oxd-icon').click();
        cy.get('.orangehrm-horizontal-padding > div > .oxd-button').click();
        cy.get('.orangehrm-modal-footer > .oxd-button--label-danger').click();
        cy.get('.oxd-text--toast-message').should('have.text', 'Successfully Deleted'); 
    })
})
    