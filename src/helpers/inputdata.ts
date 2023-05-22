import {randomInt} from "crypto";
import * as fs from "fs";

export class InputData {
    public static get randomWord () : string {
        const alphabet: string = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
        let randomWord: string = "";
        while (randomWord.length < 10) {
            randomWord += alphabet[randomInt(0, alphabet.length)];

        }
        return randomWord;
    }
    public static get getNewGuid() : string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    public static get getEventDate() : string {
        const eventDateValue : string = fs.readFileSync("./src/helpers/params.json","utf-8");
        return JSON.parse(eventDateValue).eventDate;
    }
}