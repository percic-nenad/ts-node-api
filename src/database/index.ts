import * as Knex from "knex";
import { getNodeEnvironment } from "../common";

const knexConfig = require("../../knexfile.js");
const config: Knex.Config = knexConfig[getNodeEnvironment()];
const database = Knex(config);

export async function transaction(callback: (callbackTransaction: Knex.Transaction) => Promise<void>) {
    await database.transaction(async (trx: Knex.Transaction) => {
        try {
            await callback(trx);
            await trx.commit();
        }
        catch (error) {
            await trx.rollback(error);
            throw error;
        }
    });
}
