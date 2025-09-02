export declare class User {
    id: number;
    name: string;
    email: string;
    passwordHash: string;
    role: 'admin' | 'viewer';
    createdAt: Date;
    updatedAt: Date;
}
