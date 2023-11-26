describe('Login Page', () => {
	beforeEach(() => {
	  cy.visit('http://localhost:4200/login'); // Adjust the path if needed
	});
  
	it('should login with valid password', () => {
	  // Type a valid username and password
	  cy.login()
	
	});
  
	it('should not login with invalid password', () => {
	  cy.get('input[name="username"]').type('invalid-username');
	  cy.get('input[name="password"]').type('invalid-password');
  
	  const loginButton = cy.get('button')
	  loginButton.click();
	  
	  cy.url().should('not.include', '/mainMenu');
  
	  // You can also assert other elements or messages indicating a failed login
	});
  });