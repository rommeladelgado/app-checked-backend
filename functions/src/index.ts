
import * as dotenv from "dotenv";
import path from "path";
import {onRequest} from "firebase-functions/v2/https";
import {setGlobalOptions} from "firebase-functions/v2/options";
import {createApp} from "./api/http/server";

dotenv.config({path: path.resolve(__dirname, "../.env")});
setGlobalOptions({region: "us-central1", timeoutSeconds: 60, memory: "256MiB"});

export const api = onRequest(createApp());

