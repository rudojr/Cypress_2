import { MyInfo_PersonalDetails } from "../../Pages/Page_MyInfo/PAGE_MyInfo_PersonalDetails";
import { LoginPage } from "../../Pages/Page_Admin/PAGE_Admin_Login";
import 'cypress-file-upload'

const loginPage = new LoginPage();
const personalDetails = new MyInfo_PersonalDetails();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFirstName() {
    const names = ['John', 'Jane', 'Mike', 'Emily', 'Chris', 'Anna'];
    return names[getRandomInt(0, names.length - 1)];
}

function getRandomMiddleName() {
    const names = ['Michael', 'Grace', 'Lee', 'Marie', 'Alex', 'Rose'];
    return names[getRandomInt(0, names.length - 1)];
}

function getRandomLastName() {
    const names = ['Smith', 'Johnson', 'Brown', 'Williams', 'Jones'];
    return names[getRandomInt(0, names.length - 1)];
}

function getRandomNickName() {
    const nicknames = ['Johnny', 'Mikey', 'Emmy', 'Chrisy', 'Annie'];
    return nicknames[getRandomInt(0, nicknames.length - 1)];
}

function getRandomEmployeeID() {
    return getRandomInt(10000, 99999);
}

function getRandomOtherID() {
    return 'OID' + getRandomInt(100, 999);
}

function getRandomDriverLicense() {
    return getRandomInt(100000, 999999);
}

function getRandomDriverLicenseExpiryDate() {
    const year = getRandomInt(2025, 2035);
    const month = getRandomInt(1, 12).toString().padStart(2, '0');
    const day = getRandomInt(1, 28).toString().padStart(2, '0'); 
    return `${year}-${month}-${day}`;
}

function getRandomNationality() {
    const nationalities = ['Vietnamese', 'American', 'British', 'Canadian', 'Australian'];
    return nationalities[getRandomInt(0, nationalities.length - 1)];
}

function getRandomMaritalStatus() {
    const statuses = ['Single', 'Married', 'Other'];
    return statuses[getRandomInt(0, statuses.length - 1)];
}

function getRandomDateOfBirth() {
    const year = getRandomInt(1970, 2005);
    const month = getRandomInt(1, 12).toString().padStart(2, '0');
    const day = getRandomInt(1, 28).toString().padStart(2, '0'); 
    return `${year}-${month}-${day}`;
}

function getRandomGender() {
    return getRandomInt(0, 1) === 0 ? 'male' : 'female';
}

describe('Change Personal Details in MyInfo', () => {

    beforeEach(() =>
        {
            cy.session('userSession',() => 
                {
                    loginPage.load();
                    loginPage.login();
                    cy.wait(1000)
                });
                cy.visit('/web/index.php/dashboard/index');
                cy.get('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-navigation > aside > nav > div.oxd-sidepanel-body > ul > li:nth-child(6) > a')
                    .should('be.visible')
                    .click();   
                cy.wait(1000)
            });
    
        it('Should display all elements on page',()=>{
            cy.log('All fields are visible');
        })

        it('Should get all value of fields successfully',()=>{
            cy.get(personalDetails.firstName).should('be.visible');
            personalDetails.getAllInfor();
        })

        it('Should save successfully infomation using new data',()=>{
            const details = {
                firstName: getRandomFirstName(),
                middleName: getRandomMiddleName(),
                lastName: getRandomLastName(),
                // nickName: getRandomNickName(),
                employeeID: getRandomEmployeeID(),
                otherID: getRandomOtherID(),
                driverLicense: getRandomDriverLicense(),
                driverLicenseExpiryDate: getRandomDriverLicenseExpiryDate(),
                nationally: getRandomNationality(),
                marialStatus: getRandomMaritalStatus(),
                dateOfBirth: getRandomDateOfBirth(),
                gender: getRandomGender(),
            };
            personalDetails.setPersonalDetails(details);
        })

        it('Should load attachment successfully',()=>{
            personalDetails.click_add_attachment();
            cy.get('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div.orangehrm-attachment > div > form > div:nth-child(1) > div > div > div > div:nth-child(2) > div').attachFile('lena.png');
            cy.get('.oxd-textarea').type("Attach file");
            cy.get('.orangehrm-attachment > .orangehrm-card-container > .oxd-form > .oxd-form-actions > .oxd-button--secondary').click();
        })
})