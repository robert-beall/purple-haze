import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Item from "./models/ItemModel";

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
}

export default sequelize