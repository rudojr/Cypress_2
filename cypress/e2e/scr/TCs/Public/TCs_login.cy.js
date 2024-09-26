import { LoginPage } from "../../Pages/Page_Admin/PAGE_Admin_Login";

const checkErrorMessage = (message) => {
    cy.get('span.oxd-input-field-error-message').should('be.visible').and('contain', message);
  }

const loginPage = new LoginPage();

describe('Login Tests', () => {

  beforeEach(() => {
    loginPage.load();
  });

  describe('Check valid home page', () => {
    it('Visit homepage and check elements are visible', () => {
      cy.get(loginPage.username).should('be.visible');
      cy.get(loginPage.password).should('be.visible');
      cy.get(loginPage.log_in_button).should('be.visible');
    });
  });

  describe('Check invalid login', () => {
    it('Login with invalid username and password', () => {
      cy.get(loginPage.username).type('InvalidUser');
      cy.get(loginPage.password).type('InvalidPass');
      cy.get(loginPage.log_in_button).click();
      cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
    });
  });

  describe('Check empty username and password', () => {
    it('Login with empty username and password', () => {
      cy.get(loginPage.log_in_button).click();
      checkErrorMessage('Required');
    });
  });

  describe('Check login with only username', () => {
    it('Login with valid username and empty password', () => {
      cy.get(loginPage.username).type('Admin');
      cy.get(loginPage.log_in_button).click();
      checkErrorMessage('Required');
    });
  });

  describe('Check login with only password', () => {
    it('Login with valid password and empty username', () => {
      cy.get(loginPage.password).type('admin123');
      cy.get(loginPage.log_in_button).click();
      checkErrorMessage('Required');
    });
  });

  describe('Check valid login', () => {
    it('Login with valid information and save session',() =>
        {
            loginPage.login();
            cy.url().should('include', loginPage.dashboard_url);
            cy.get(loginPage.dashboard_text).should('contain', 'Dashboard');

            cy.session('userSession', () => 
                {
                    loginPage.load();
                    loginPage.login(); 
                });
        })
    })
})