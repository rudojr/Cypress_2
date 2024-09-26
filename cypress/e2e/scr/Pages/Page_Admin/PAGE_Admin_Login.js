export class LoginPage {
    constructor() {
      this.username = 'input[name="username"]';
      this.password = 'input[name="password"]';
      this.log_in_button = 'button[type="submit"]';
      this.dashboard_url = '/web/index.php/dashboard/index';
      this.dashboard_text = '.oxd-topbar-header-breadcrumb > .oxd-text';
    }
    
    load() {
      cy.visit('/web/index.php/auth/login');
    }
    login(username = 'admin', pass = 'admin123') {
        cy.get(this.username).type(username);
        cy.get(this.password).type(pass);
        cy.get(this.log_in_button).click();
        cy.wait(2000);
    }

    checkErrorMessage(errorMessage) {
      cy.get('span.oxd-input-field-error-message').should('be.visible').and('contain', errorMessage);
    }
  
    /**
     */
    checkInvalidCredentials() {
      cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
    }
  }  