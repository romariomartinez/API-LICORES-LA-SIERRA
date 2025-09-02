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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(users, jwt) {
        this.users = users;
        this.jwt = jwt;
    }
    async seedAdmin() {
        const email = 'admin@menu.local';
        const exists = await this.users.findOne({ where: { email } });
        if (exists)
            return;
        const u = this.users.create({
            name: 'Admin',
            email,
            passwordHash: await bcrypt.hash('admin123', 10),
            role: 'admin',
        });
        await this.users.save(u);
    }
    async validate(email, password) {
        const user = await this.users.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        return user;
    }
    async login(email, password) {
        const user = await this.validate(email, password);
        const payload = { sub: user.id, role: user.role, email: user.email };
        return { access_token: await this.jwt.signAsync(payload) };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map