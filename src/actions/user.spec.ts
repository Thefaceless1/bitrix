import {UserPage} from "../pages/user.page.js";
import {test} from "@playwright/test"

test.describe("User",() => {
    test("create user",async ({page}) => {
        const user = new UserPage(page);
        await user.addUser()
    })
})
