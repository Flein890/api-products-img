import {Server} from "./models/server";
import { config } from "dotenv";
config();

const server = new Server();
server.listen();

