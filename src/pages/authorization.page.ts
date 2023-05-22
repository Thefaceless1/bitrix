import {BasePage} from "./base.page.js";
import {Locator, Page} from "@playwright/test";
import {logger} from "../helpers/logger.js";

export class AuthorizationPage extends BasePage {
    private readonly userLogin : string = "Alexander.Sukhinin"
    private readonly userPassword : string = "3b51oXf%98"
    constructor(page : Page) {
        super(page);
    }
    private userLoginField : Locator = this.page.locator("//input[@name='USER_LOGIN']");
    private userPasswordField : Locator = this.page.locator("//input[@name='USER_PASSWORD']");
    private enterButton : Locator = this.page.locator("//input[@class='login-btn']");

    public async authorize() : Promise<void> {
        logger.info("Авторизация");
        await this.goto('/');
        await this.userLoginField.type(this.userLogin);
        await this.userPasswordField.type(this.userPassword);
        await this.enterButton.click();
    }
}