import { LoginPage } from "../../../Pages/Page_Admin/PAGE_Admin_Login";

// const loginPage = new LoginPage();

describe('API Login Test', () => {

    it('Should return 304 when login fails', () => {
        cy.request({
            method: 'POST',
            url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
            form: true, 
            body: {
                _token: '7b6c7deae514486143f967e46d96c1.HUwsa_etjCF6FKUtc5LW_wc7kizZjX8S9pfpnj2P4u4.ZQNHNKHG4X4TcNNmHKuTrkJs8EG29yZ2k_WI63rY1NdqFWEOh8DoeAp3zg',
                username: 'admin',
                password: 'wrongpassword' 
            },
            failOnStatusCode: false,
            followRedirect: false
        }).then((response) => {
            expect(response.status).to.eq(302);
        });
    });
    it('Should successfully login and return 200', () => {
        cy.request({
            method: 'POST',
            url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
            form: true,
            body: {
                _token: '7b6c7deae514486143f967e46d96c1.HUwsa_etjCF6FKUtc5LW_wc7kizZjX8S9pfpnj2P4u4.ZQNHNKHG4X4TcNNmHKuTrkJs8EG29yZ2k_WI63rY1NdqFWEOh8DoeAp3zg',
                username: 'admin',
                password: 'admin123'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });
});