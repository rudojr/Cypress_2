import { LoginPage } from "../../../Pages/Page_Admin/PAGE_Admin_Login";

const loginPage = new LoginPage();

describe('Get Data from API List',()=>{
    beforeEach(() =>
        {
            cy.session('userSession',() => 
                {
                    loginPage.load();
                    loginPage.login();
                });
        });

        it('Should get employee data from API', () => {
            cy.request({
                method: 'GET',
                url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC',
            }).then((response) => {
                expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('data');             
                });
        });

        let empNumber;
        const firstName = `FirstName${Math.floor(Math.random() * 1000)}`;
        const middleName = `MiddleName${Math.floor(Math.random() * 1000)}`;
        const lastName = `LastName${Math.floor(Math.random() * 1000)}`;
        const employeeId = Math.floor(Math.random() * 100000000).toString();
        it('Should add employee successfully',()=>{
            
            //
            const requestBody = {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                empPicture: null,
                employeeId: employeeId
            };

            cy.request({
                method: 'POST',
                url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',
                failOnStatusCode: false,
                body: requestBody
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('data');
                empNumber = response.body.data.empNumber; 
                cy.log('Response after adding employee: ', JSON.stringify(response.body, null, 2)); 
                cy.log('Employee Number: ', empNumber);
            });
        })

        it('Should update personal details of the employee using empNumber',()=>{
            expect(empNumber).to.not.be.undefined;
            cy.request({
                method: 'GET',
                url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/${empNumber}/personal-details`,
            }).then((response) => {
                expect(response.status).to.eq(200); 
                expect(response.body).to.have.property('data');
        
                cy.log('Personal details response before update: ', JSON.stringify(response.body, null, 2));
            });
            const requestBody = {
                lastName: lastName,
                firstName: firstName,
                middleName: middleName,
                employeeId: employeeId,
                otherId: "170699",
                drivingLicenseNo: "0440990022441",
                drivingLicenseExpiredDate: "2020-09-11",
                gender: "1", 
                birthday: "1999-06-17",
                nationalityId: 189
            };
            cy.request({
                method: 'PUT',
                url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/${empNumber}/personal-details`,
                body: requestBody
            }).then((response) => {
                expect(response.status).to.eq(200); 
                expect(response.body).to.have.property('data');
                cy.log('Response after updating specific personal details: ', JSON.stringify(response.body, null, 2));
            });
        })

        // it('Should delete an employee from the API',()=>{
        //     cy.log('Selected employee ID for deletion: ', empNumber);
        
        //     cy.request({
        //             method: 'DELETE',
        //             url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',
        //             body: {
        //                 ids: [empNumber]
        //             },
        //             failOnStatusCode: false
        //         }).then((response) => {
        //             expect(response.status).to.eq(200);
        //             cy.log('Employee deleted successfully: ', response.body);
        //         });
            
        //     cy.request({
        //         method: 'GET',
        //         url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC',
        //     }).then((response) => {
        //         expect(response.status).to.eq(200);
        //         expect(response.body).to.have.property('data');
    
        //         const employees = response.body.data;
    
        //         const deletedEmployee = employees.find(emp => emp.id === empNumber);
        //         expect(deletedEmployee).to.be.undefined; 
        //         cy.log('Verified employee with ID ' + empNumber + ' has been deleted.');
        //     });
        // })
    })