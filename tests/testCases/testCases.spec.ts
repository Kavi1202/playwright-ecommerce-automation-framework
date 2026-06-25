import { test} from "@playwright/test";
import { TestCasesPage } from "../../pages/TestCasesPage"

test('TC07 Verify Test Cases Page', async ({page})=>{
    const testCasesPage = new TestCasesPage(page);

    await testCasesPage.openHomePage();
    await testCasesPage.openTestCasesPage();
    await testCasesPage.verifyTestCasesPageLoaded();

})