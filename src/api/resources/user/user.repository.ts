import { User } from "@user/user.entity";
import { AppDataSource } from "@src/app.datasource";

export const UserRepository = AppDataSource.getRepository(User);