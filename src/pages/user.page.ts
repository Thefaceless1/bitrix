import {Locator, Page} from "@playwright/test";
import {MainPage} from "./main.page.js";
import {InputData} from "../helpers/inputdata.js";
import {UserInfoTabs} from "../helpers/enums/user_info_tabs.js";
import {randomInt} from "crypto";
import {logger} from "../helpers/logger.js";

export class UserPage extends MainPage {
    constructor(page : Page) {
        super(page);
    }
    private addUserButton : Locator = this.page.locator("//*[contains(text(),'Добавить пользователя')]");
    private lastName : Locator = this.page.locator("//input[@name='LAST_NAME']");
    private name : Locator = this.page.locator("//input[@name='NAME']");
    private surName : Locator = this.page.locator("//input[@name='SECOND_NAME']");
    private email : Locator = this.page.locator("//input[@name='EMAIL']");
    private login : Locator = this.page.locator("//input[@name='LOGIN']");
    private password : Locator = this.page.locator("//input[@name='NEW_PASSWORD']");
    private passwordConfirm : Locator = this.page.locator("//input[@name='NEW_PASSWORD_CONFIRM']");
    private birthday : Locator = this.page.locator("//input[@name='PERSONAL_BIRTHDAY']");
    private personalPhone : Locator = this.page.locator("//input[@name='PERSONAL_PHONE']");
    private workPhone : Locator = this.page.locator("//input[@name='WORK_PHONE']");
    private uniqueWorkerId : Locator = this.page.locator("//input[@name='UF_1C_USER_ID']");
    private uniqueSubdivisionId : Locator = this.page.locator("//input[@name='UF_1C_DEPARTMENT_ID']");
    private uniqueJobTitleId : Locator = this.page.locator("//input[@name='UF_POST_ID']");
    private workerStatus : Locator = this.page.locator("//input[@name='UF_STATUS']");
    private eventDate : Locator = this.page.locator("//input[@name='UF_DATE_STATUS']");
    private saveButton : Locator = this.page.locator("//input[@name='save']");
    private localExpertsDepartment : Locator = this.page.locator("//input[@value='1230']//following-sibling::label");

    private userInfoTabs(tabName : string) : Locator {
        return this.page.locator(`//span[contains(@title,'${tabName}')]`);
    }

    private checkboxById(id: number) : Locator {
        return this.page.locator(`//label[@for='GROUP_ID_ACT_ID_${id}' and @title]`);
    }

    public async addUser() : Promise<void> {
        const user : userData = {
            lastName: InputData.randomWord + "|Фамилия",
            firstName: InputData.randomWord + "|Имя",
            surName: InputData.randomWord + "|Отчество",
            email: InputData.randomWord + "@gmail.com",
            login: InputData.randomWord + "|Логин",
            password: InputData.randomWord + "|Пароль"
        }
        await this.goToUsersMenu();
        await this.addUserButton.waitFor({state:"visible"});
        await this.addUserButton.click();
        await this.fillUserData(user);
        await this.fillGroups();
        await this.fillPersonalData();
        await this.fillWork();
        await this.fillAdditionally();
        await this.saveButton.click();
        for (const property in user) {
            console.log(`\x1b[34m${property}: ${user[property]}`)
        }
        await this.addUserButton.waitFor({state:"visible"});
    }

    private async fillUserData(user : userData) : Promise<void> {
        logger.info("Заполнение информации о пользователе");
        await this.lastName.type(user.lastName);
        await this.name.type(user.firstName);
        await this.surName.type(user.surName);
        await this.email.type(user.email);
        await this.login.type(user.login);
        await this.password.type(user.password);
        await this.passwordConfirm.type(user.password);
        await this.localExpertsDepartment.click()
    }

    private async fillGroups() : Promise<void> {
        logger.info("Заполнение групп пользователя");
        const idsForCheck : number[] = [1,3,5,18];
        await this.userInfoTabs(UserInfoTabs.groups).click();
        for(const id of idsForCheck) {
            await this.checkboxById(id).click()
        }
    }
    private async fillPersonalData() : Promise<void> {
        logger.info("Заполнение личных данных");
        await this.userInfoTabs(UserInfoTabs.personalData).click();
        const birthdayValue : string = new Date().toLocaleDateString();
        await this.birthday.type(birthdayValue);
        await this.personalPhone.type(String(randomInt(100, 1000)));
    }
    private async fillWork() : Promise<void> {
        logger.info("Заполнение сведений о работе");
        await this.userInfoTabs(UserInfoTabs.work).click();
        await this.workPhone.type(String(randomInt(100,1000)));
    }
    private async fillAdditionally() : Promise<void> {
        logger.info("Заполнение дополнительной информации");
        const uniqueSubdivisionId : string = "45c6bb16-7950-11ec-8103-005056a129f1";
        const uniqueJobTitleId : string = "71fe82f7-620c-11e1-be75-54341cd5e10f";
        const workerStatus : string = "Работа"
        await this.userInfoTabs(UserInfoTabs.additionally).click();
        await this.uniqueWorkerId.type(InputData.getNewGuid);
        await this.workerStatus.type(workerStatus);
        await this.uniqueJobTitleId.type(uniqueJobTitleId);
        await this.uniqueSubdivisionId.type(uniqueSubdivisionId);
        await this.eventDate.type(InputData.getEventDate);
    }
}

interface userData {
    lastName : string,
    firstName : string,
    surName : string,
    email : string,
    login : string,
    password : string
}