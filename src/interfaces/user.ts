export interface User {
    id?: number;
    name: string;
    email: string;
    mobile_number?: string | null;
    role_id?: string;
    email_verified_at?: Date | null;
    password: string;
    remember_token?: string | null;
    status?: number;
    created_at?: Date;
    updated_at?: Date;
    avatar?: string | null;
}