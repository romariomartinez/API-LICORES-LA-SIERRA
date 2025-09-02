import { OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
export declare class AuthController implements OnModuleInit {
    private auth;
    constructor(auth: AuthService);
    onModuleInit(): Promise<void>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
}
