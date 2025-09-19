


require("dotenv").config({path: require("path").resolve(__dirname, "../.env")});
import {onRequest} from "firebase-functions/v2/https";
import {setGlobalOptions} from "firebase-functions/v2/options";
import {createApp} from "./api/http/server";

// eslint-disable-next-line max-len
setGlobalOptions({region: "us-central1", timeoutSeconds: 60, memory: "256MiB"});

export const api = onRequest(createApp());

