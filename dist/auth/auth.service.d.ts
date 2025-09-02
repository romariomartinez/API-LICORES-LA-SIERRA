import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private users;
    private jwt;
    constructor(users: Repository<User>, jwt: JwtService);
    seedAdmin(): Promise<void>;
    validate(email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
