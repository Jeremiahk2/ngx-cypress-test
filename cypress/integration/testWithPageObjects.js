/// <reference types = "cypress" />

import { onDatePickerPage } from "../support/page_objects/datePickerPage";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { navigateTo } from "../support/page_objects/navigationPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

describe('test with page objects', () => {

    beforeEach('open application', () => {
        cy.openHomePage() 
    })

    it('verify navigation across the pages', () => {
        navigateTo.formLayoutsPage();
        navigateTo.datepickerPage();
        navigateTo.tablesPage();
        navigateTo.tooltipPage();
        navigateTo.toastrPage();
    })

    it.only('should submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Artem', 'test@test.com');
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password123')
        navigateTo.datepickerPage();
        onDatePickerPage.selectCommonDatepickerDateFromToday(5);
        onDatePickerPage.selectDatePickerWithRangeFromToday(7, 15);
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Artem', 'Bondar')
        onSmartTablePage.updateAgeByFirstName('Artem', '35')
        onSmartTablePage.deleteRowByIndex(1);
    })
})