import { LoginPage } from "../../../Pages/Page_Admin/PAGE_Admin_Login";
import { Performance_KPI_Search_Page } from "../../../Pages/Page_Performance/Page_Performance_SearchKPI";
import { Performance_KPI_Save_Page } from "../../../Pages/Page_Performance/Page_Performance_SaveKPI";

const loginPage = new LoginPage();
const kpiSearchPage = new Performance_KPI_Search_Page();
const saveKpiPage = new Performance_KPI_Save_Page();

describe('Change Personal Details in MyInfo', () => {

    beforeEach(() =>
        {
            cy.session('userSession',() => 
                {
                    loginPage.load();
                    loginPage.login();
                    cy.wait(1000)
                });
                cy.visit('/web/index.php/performance/searchKpi');
                cy.wait(1000);
            });
    it('Should display all elements on page',()=>{
        cy.get(kpiSearchPage.jobtitle).should('be.visible')
        cy.get(kpiSearchPage.btnReset).should('be.visible')
        cy.get(kpiSearchPage.btnSearch).should('be.visible')
        cy.get(kpiSearchPage.tblRecords).should('be.visible')
        cy.log('All fields are visible');
    })

    it('Should reset value into jobtittle when click reset',()=>{
        const query = 'QA'
        kpiSearchPage.select_jobtitle(query);
        kpiSearchPage.click_reset();
        cy.get(kpiSearchPage.jobtitle) 
        .invoke('text') 
        .then((text) => {
            expect(text.trim()).to.eq('-- Select --'); 
        });
    })

    it('All elements shoule be visible on save kpi page',()=>{
        kpiSearchPage.click_add();

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
        saveKpiPage.click_save();
        cy.get(':nth-child(1) > .oxd-input-group > .oxd-text')
            .should('have.text', 'Required'); 

        cy.get(':nth-child(2) > .oxd-input-group > .oxd-text')
            .should('have.text', 'Required');   
    }),

    it('Should Save KPI successfully',()=>{
        const queryKeyPerformance = '150 TCs/Month';
        const queryJobtitle = 'QA';
        const minimumRating = 60;
        const maximumRating = 100;
        const make_Default_Scale = 'false';

        saveKpiPage.set_Key_Performance_Indicator(queryKeyPerformance);
        saveKpiPage.select_Jobtitle(queryJobtitle)
        saveKpiPage.set_Minimum_Rating(minimumRating);
        saveKpiPage.set_Maximum_Rating(maximumRating);
        saveKpiPage.setSwitch(make_Default_Scale);
    })

    it('Should reset all value and back to searchKpi when click cancel',()=>{
        saveKpiPage.click_reset();
        cy.url().should('include', '/performance/searchKpi');
    })
})
    