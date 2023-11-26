import "../../../support/commands";
describe('Creation tests for Piso', () => {
	beforeEach(() => {
	  cy.login()
	});
  
it('should create a piso successfully', () => {
		cy.get(':nth-child(2) > .mdc-button__label').click();
		cy.get('#mat-menu-panel-0 > .mat-mdc-menu-content > :nth-child(2)').click();
		
		cy.on("window:alert", (text) =>  {
			expect(text).to.contain("Success piso creation!")
		}) 
	});
  });