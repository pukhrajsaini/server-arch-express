import { Server } from './server';
import { LoggerUtil } from './utils';

const logger = new LoggerUtil('Main');
let app = new Server().app;
const server = require('http').Server(app);
let port = process.env.PORT;
server.listen(port, () => {
    logger.log(`server is listening at port ${port}`);
});

