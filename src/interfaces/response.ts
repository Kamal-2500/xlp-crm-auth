type BaseResposne = {
    success: boolean;
    message?: string;
}

export type LoginResposne = BaseResposne & {
    token: string;
    type: "Bearer";
    expiresIn: string;
}

export type RegisterResponse = BaseResposne & {
    userId: string;
}

export type ForgotPasswordResponse = BaseResposne & {};