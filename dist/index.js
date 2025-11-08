"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const utils_1 = require("./utils");
const logger = new utils_1.LoggerUtil('Main');
let app = new server_1.Server().app;
const server = require('http').Server(app);
let port = process.env.PORT;
server.listen(port, () => {
    logger.log(`server is listening at port ${port}`);
});
