import express, {Express} from "express";
import connectToDb from "./config/db";


const app:Express = express();



connectToDb(app);