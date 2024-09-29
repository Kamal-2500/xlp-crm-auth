import bcrypt from "bcrypt";

export class BcryptUtils {
    static async hash(data: string, saltRounds = 10): Promise<string> {
        const salt = await bcrypt.genSalt(saltRounds ?? 10);
        const hashedPassword = await bcrypt.hash(data, salt);
        return hashedPassword;
    }

    static async compare(data: string, hashedData: string): Promise<boolean> {
        return await bcrypt.compare(data, hashedData);
    }
}