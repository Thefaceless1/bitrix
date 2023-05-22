import {AuthorizationPage} from "./authorization.page.js";
import {Locator, Page} from "@playwright/test";
import {logger} from "../helpers/logger.js";

export class MainPage extends AuthorizationPage {
    constructor(page: Page) {
        super(page);
    }
    private adminMenuButton : Locator = this.page.locator("//span[text()='Администрирование']");
    private settingsButton : Locator = this.page.locator("//span[@id='global_menu_settings']");
    private userList : Locator = this.page.locator("//span[text()='Список пользователей']").last();
    protected async goToUsersMenu() : Promise<void> {
        await this.authorize();
        logger.info("Переход в меню пользователей");
        await this.adminMenuButton.waitFor({state:"visible"});
        await this.adminMenuButton.click();
        await this.settingsButton.waitFor({state:"visible"});
        await this.settingsButton.click();
        await this.userList.click();
    }
}