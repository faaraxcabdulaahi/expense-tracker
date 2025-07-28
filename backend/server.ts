import dotenv from "dotenv";
import express, {Express} from "express";
import connectToDb from "./config/db";

dotenv.config();

const app:Express = express();
const port: number = Number(process.env.PORT) || 5000;


connectToDb(app, port);