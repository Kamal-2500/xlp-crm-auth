import { configs } from "../configs";
import { UserDAO } from "../dao/userDAO";
import { User, LoginResposne, RegisterResponse, ForgotPasswordResponse } from "../interfaces";
import { BcryptUtils, ConflictError, NotFoundError, UnauthorizedError } from "../utils";
import { JWTUtils } from "../utils/jwtUtils";

export class AuthService {
    private userDAO: UserDAO;

    constructor() {
        this.userDAO = new UserDAO();
    }

    public async login(email: string, password: string): Promise<LoginResposne> {
        const user = await this.userDAO.getUserByEmail(email);
        if (user) {
            if (await BcryptUtils.compare(password, user.password)) {
                const token = JWTUtils.generateToken({ id: user.id, role: user.role_id });

                return {
                    success: true,
                    token: token,
                    type: "Bearer",
                    expiresIn: configs.jwt.expiresIn.toString()
                }
            } else {
                throw new UnauthorizedError("Email or password is incorrect.");
            }
        } else {
            throw new NotFoundError("User not found.");
        }
    }

    public async register(user: User): Promise<RegisterResponse> {
        if (!await this.userDAO.getUserByEmail(user.email)) {

            const response = await this.userDAO.createUser({
                name: user.name,
                email: user.email,
                mobile_number: user.mobile_number || null,
                role_id: user.role_id || "4",
                email_verified_at: user.email_verified_at || null,
                password: await BcryptUtils.hash(user.password),
                remember_token: user.remember_token || null,
                status: 1,
                created_at: new Date(),
                updated_at: new Date(),
                avatar: user.avatar || null
            });

            return {
                success: true,
                userId: response.id!.toString()
            };
        } else {
            throw new ConflictError("User already exists.")
        }
    }

    public async forgotPassword(email: string) {
    }
}