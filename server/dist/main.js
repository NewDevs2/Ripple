"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    console.log(path.join(__dirname, '..', '..', 'client', 'build'));
    const staticFilesPath = path.join(__dirname, '..', '..', 'client', 'build');
    app.useStaticAssets(staticFilesPath);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static((0, path_1.join)(__dirname, '..', '..', 'client', 'build')));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map