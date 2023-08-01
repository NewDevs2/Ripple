"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const fs = require("fs");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions: {
            key: fs.readFileSync('localhost.key'),
            cert: fs.readFileSync('localhost.crt'),
        },
    });
    app.enableCors();
    app.useStaticAssets((0, path_1.join)(__dirname, '../', '../', 'client', 'build'));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map