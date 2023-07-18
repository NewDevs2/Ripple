"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FallbackController = void 0;
const common_1 = require("@nestjs/common");
const fallback_service_1 = require("./fallback.service");
let FallbackController = exports.FallbackController = class FallbackController {
    constructor(FallbackService) {
        this.FallbackService = FallbackService;
    }
    failback(res) {
        res.sendFile(this.FallbackService.getBuildPath());
    }
};
__decorate([
    (0, common_1.Get)('*'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FallbackController.prototype, "failback", null);
exports.FallbackController = FallbackController = __decorate([
    (0, common_1.Controller)('fallback'),
    __metadata("design:paramtypes", [fallback_service_1.FallbackService])
], FallbackController);
//# sourceMappingURL=fallback.controller.js.map