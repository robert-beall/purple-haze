import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Item, { category, categoryList } from "./models/ItemModel";
import { faker } from '@faker-js/faker';

dotenv.config();

const user = process.env.MYSQL_USER;
const pass = process.env.MYSQL_PASSWORD;
const uri = process.env.MYSQL_URL;
const dbname = process.env.MYSQL_DB_NAME;


const sequelize = new Sequelize(`mysql://${user}:${pass}@${uri}:3306/${dbname}`, {
        models: [__dirname + '/models']
    }
);

export const initializeDB = async () => {
    await Item.sync({ force: true });
    const itemSet = [];

    for (let i = 0; i < 25; i++) {
        itemSet.push({
            name: faker.commerce.productName(),
            cost: faker.number.float({min: 0, max: 100, fractionDigits: 2 }),
            weight: faker.number.float({min: 0, max: 1000, fractionDigits: 3 }),
            category: faker.helpers.arrayElement(categoryList),
        });
    }

    await Item.bulkCreate(itemSet);
}

export default sequelize