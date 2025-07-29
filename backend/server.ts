import express, {Express} from "express";
import connectToDb from "./config/db.js";


const app:Express = express();



connectToDb(app);