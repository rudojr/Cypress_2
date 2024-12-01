import { LoginPage } from "../../Pages/Page_Admin/PAGE_Admin_Login";
import { AddEmployeePage } from "../../Pages/Page_PIM/PAGE_Pim_AddEmployee";
import { EmployeeList } from "../../Pages/Page_PIM/PAGE_Pim_EmployeeList";

const loginPage = new LoginPage();
const addEmployeePage = new AddEmployeePage();
const employeelistPage = new EmployeeList();

describe('Test search employee in employee list',()=>{
    beforeEach(() =>
        {
            cy.session('userSession',() => 
                {
                    loginPage.load();
                    loginPage.login();
                });
            cy.visit('/web/index.php/pim/viewEmployeeList');
        });

        it('Display table with full columns',()=>{
            cy.get('[role="columnheader"]').each(($col) => {
                cy.log($col.text().trim());
            });
        })
        
        it('DO not Display employee when Search with name not-exists in list',()=>{
        {
            const employeeName = 'Day la employye name khong ton tai'
            const api_url = `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&nameOrId=${employeeName}&includeEmployees=onlyCurrent`;
            let total = 0
            cy.request({
                method: 'GET',
                url: api_url, 
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                total = response.body.meta.total;
                cy.log('Tổng số đối tượng: ' + total);
            });
            employeelistPage.setEmpName(employeeName)
            employeelistPage.click_search()
            cy.contains('No Records Found').should('be.visible');
            }
        })

        it('Display employee when Search with name exists in list',()=>{
            const employeeName = 'Thien'
            const api_url = `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&nameOrId=${employeeName}&includeEmployees=onlyCurrent`;
            let total = 0
            cy.request({
                method: 'GET',
                url: api_url, 
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                total = response.body.meta.total;
                cy.log('Tổng số đối tượng: ' + total);
            });
            employeelistPage.setEmpName(employeeName)
            employeelistPage.click_search()
            cy.get('.oxd-table-card').should('have.length.greaterThan', 0).then((elements) => {
                const elementCount = elements.length;
                cy.log('Số lượng phần tử có class "oxd-table-card": ' + elementCount);
                expect(total).to.eq(total);
            })
        })

        it('Display employee when search with employee ID exists',()=>{
            const api_url = 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC'
            let randomEmployeeId = ''
            let total = 0
            cy.request({
                method: 'GET',
                url: api_url, 
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                const employees = response.body.data;
                const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
                randomEmployeeId = randomEmployee.employeeId;
                cy.log('Employee ID ngẫu nhiên: ' + randomEmployeeId);

                cy.request({
                    method: 'GET',
                    url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&employeeId=${randomEmployeeId}&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC`, 
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log('Dữ liệu nhân viên tìm kiếm theo employeeId: ', response.body);
                    total = response.body.meta.total;
                    cy.log('Tổng số đối tượng: ' + total);
                });

            employeelistPage.setEmpID(randomEmployeeId)
            employeelistPage.click_search()
            cy.get('.oxd-table-card').should('have.length.greaterThan', 0).then((elements) => {
                const elementCount = elements.length;
                cy.log('Số lượng phần tử có class "oxd-table-card": ' + elementCount);
                expect(elementCount).to.eq(total);
            })
        })

        it('Display employee when search employment status', () => {
            let randomId = 0;
            let randomName = '';
            const api_status_code = 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/employment-statuses?limit=0';
            let total = 0;
        
            cy.request({
                method: 'GET',
                url: api_status_code,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                const items = response.body.data;
                const randomItem = items[Math.floor(Math.random() * items.length)];
                randomId = randomItem.id;
                randomName = randomItem.name;
                cy.log('Random ID: ' + randomId);
                cy.log('Random Name: ' + randomName);
        
                // Chọn trạng thái nhân viên từ dropdown
                employeelistPage.selectEmpStatus(randomName);
                employeelistPage.click_search();
        
                // Gửi request đến API lấy thông tin nhân viên theo employment status
                const employeeApiUrl = `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&empStatusId=${randomId}&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC`;
        
                cy.request({
                    method: 'GET',
                    url: employeeApiUrl,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then((employeeResponse) => {
                    expect(employeeResponse.status).to.eq(200);
                    total = employeeResponse.body.meta.total;
                    cy.log('Total employees found: ' + total);
        
                    // Đợi các phần tử có class "oxd-table-card" được tải xong và so sánh với total
                    cy.get('.oxd-table-card').should('have.length', total).then((elements) => {
                        const elementCount = elements.length;
                        cy.log('Số lượng phần tử có class "oxd-table-card": ' + elementCount);
        
                        // Kiểm tra số lượng phần tử có class "oxd-table-card" khớp với total
                        expect(elementCount).to.eq(total);
                    });
                });
            });
        });
        // it('Display employee list when search inclue',()=>{
        //     let randomID = 0;
        //     let ranomInclude = ''
        //     let total = 0


        // })

})
})