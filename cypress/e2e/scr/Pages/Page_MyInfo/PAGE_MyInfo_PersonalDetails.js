export class MyInfo_PersonalDetails{
    constructor(){
        this.firstName = 'input[name="firstName"]',
        this.middleName ='input[name="middleName"]',
        this.lastName = 'input[name="lastName"]'
        // this.nickName = '#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div.orangehrm-horizontal-padding.orangehrm-vertical-padding > form > div:nth-child(1) > div.oxd-grid-3.orangehrm-full-width-grid > div > div > div:nth-child(2) > input'
        this.employeeID = '#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div.orangehrm-horizontal-padding.orangehrm-vertical-padding > form > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(2) > input';
        this.otherID = ':nth-child(3) > :nth-child(1) > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input';
        this.driverLicense = '#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div.orangehrm-horizontal-padding.orangehrm-vertical-padding > form > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(2) > input';
        this.driverLicenseExpiryDate = '#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div.orangehrm-horizontal-padding.orangehrm-vertical-padding > form > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > div > input';
        this.nationally = ':nth-child(5) > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text';
        this.marialStatus = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text';
        this.dateOfBirth = ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input';
        this.maleCheckbox = 'input[type="radio"][value="1"]';
        this.femaleCheckBox = 'input[type="radio"][value="2"]';
        this.btnAddAttachment = 'button[class="oxd-button oxd-button--medium oxd-button--text"]';
    }
        setFirstName(firstName) {
            cy.get(this.firstName).clear().type(firstName);
        }
        
        setMiddleName(middleName) {
            cy.get(this.middleName).clear().type(middleName);
        }
        
        setLastName(lastName) {
            cy.get(this.lastName).clear().type(lastName);
        }

        setEmployeeID(value) {
            cy.get(this.employeeID).clear().type(value);
        }
    
        setOtherID(value) {
            cy.get(this.otherID).clear().type(value);
        }
    
        setDriverLicense(value) {
            cy.get(this.driverLicense).clear().type(value);
        }
    
        setDriverLicenseExpiryDate() {
            cy.clock();
            const currentDate = new Date();
            const expiryDate = new Date(currentDate);
            expiryDate.setFullYear(currentDate.getFullYear() + 2); 
        
            const formattedExpiryDate = expiryDate.toISOString().split('T')[0];
        
            cy.get(this.driverLicenseExpiryDate)
              .clear()
              .type(formattedExpiryDate); 
        }
    
        setNationally(value) {
            cy.get('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div.orangehrm-horizontal-padding.orangehrm-vertical-padding > form > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(2) > div > div > div.oxd-select-text--after > i').click({ force: true });;
            cy.get('.oxd-select-dropdown').contains(value).click();
        }
    
        setMaritalStatus(value) {
            cy.get('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div.orangehrm-horizontal-padding.orangehrm-vertical-padding > form > div:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(2) > div > div > div.oxd-select-text--after > i').click({ force: true });;
            cy.get('.oxd-select-dropdown').contains(value).click();
        }
        setDateOfBirth(value) {
            cy.clock();
            const randomYear = Math.floor(Math.random() * (2000 - 1990 + 1)) + 1990;
            const currentDate = new Date();
            const expiryDate = new Date(currentDate);
            expiryDate.setFullYear(randomYear); 
        
            const formattedDateOfBirth = expiryDate.toISOString().split('T')[0];
        
            cy.get(this.dateOfBirth)
                .clear({ force: true })
                .type(formattedDateOfBirth); 
        }
    
        setGender(gender) {
            if (gender.toLowerCase() === 'male') {
                cy.get(this.maleCheckbox).check({ force: true });
            } else if (gender.toLowerCase() === 'female') {
                cy.get(this.femaleCheckBox).check({ force: true }); 
            } else {
                throw new Error('Gender must be either "male" or "female"');
            }
        }
        // setMilitaryServices(value){
        //     cy.get(this.militaryService).clear().type(value)
        // }

        // setSmoker()
        // {
        //     cy.get(this.smokerCheckBox).check();
        // }
        getFirstName() {
            cy.get(this.firstName).invoke('val').then((firstName) => {
                cy.log('First Name: ' + firstName);
            });
        }
        
        getMiddleName(){
            cy.get(this.middleName).invoke('val').then((middleName) => {
                cy.log('Middle Name: ' + middleName);
            });
        }
    
        getLastName(){
            cy.get(this.lastName).invoke('val').then((lastName) => {
                cy.log('Last Name: ' + lastName);
            });
        }

        getEmployeeID() {
            return cy.get(this.employeeID).invoke('val');
        }
    
        getOtherID() {
            return cy.get(this.otherID).invoke('val');
        }
    
        getDriverLicense() {
            return cy.get(this.driverLicense).invoke('val');
        }
    
        getDriverLicenseExpiryDate() {
            return cy.get(this.driverLicenseExpiryDate).invoke('val');
        }
    
        getNationally() {
            return cy.get(this.nationally).invoke('text');
        }
    
        getMaritalStatus() {
            return cy.get(this.marialStatus).invoke('text');
        }
    
        getDateOfBirth() {
            return cy.get(this.dateOfBirth).invoke('val');
        }
    
        getGender() {
            return cy.get(this.maleCheckbox).invoke('prop', 'checked').then((isChecked) => {
                if (isChecked) {
                    return 'male'; 
                } else {
                    return cy.get(this.femaleCheckBox).invoke('prop', 'checked').then((isCheckedFemale) => {
                        return isCheckedFemale ? 'female' : 'not specified'; 
                    });
                }
            });
        }
        getAllInfor(){
            this.getEmployeeID().then((employeeID) => {
                cy.log('Employee ID: ' + employeeID);
            });
            this.getOtherID().then((otherID) => {
                cy.log('Other ID: ' + otherID);
            });
            this.getDriverLicense().then((driverLicense) => {
                cy.log('Driver License: ' + driverLicense);
            });
            this.getDriverLicenseExpiryDate().then((driverLicenseExpiryDate) => {
                cy.log('Driver License Expiry Date: ' + driverLicenseExpiryDate);
            });
            this.getNationally().then((nationality) => {
                cy.log('Nationality: ' + nationality);
            });
            this.getMaritalStatus().then((maritalStatus) => {
                cy.log('Marital Status: ' + maritalStatus);
            });
            this.getDateOfBirth().then((dateOfBirth) => {
                cy.log('Date of Birth: ' + dateOfBirth);
            });
            this.getGender().then((gender) => {
                cy.log('Gender: ' + gender);
            });
        }

        setPersonalDetails(details) {
            this.setFirstName(details.firstName);
            this.setMiddleName(details.middleName);
            this.setLastName(details.lastName);
            this.setEmployeeID(details.employeeID);
            this.setOtherID(details.otherID);
            this.setDriverLicense(details.driverLicense);
            this.setDriverLicenseExpiryDate(details.driverLicenseExpiryDate);
            this.setNationally(details.nationally);
            this.setMaritalStatus(details.marialStatus);
            this.setDateOfBirth(details.dateOfBirth);
            this.setGender(details.gender);
        }

        click_add_attachment()
        {
            cy.get(this.btnAddAttachment).click();
        }
    }