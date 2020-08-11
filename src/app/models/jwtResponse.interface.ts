import { Role } from "./role.enum";
import { IUser } from './user.interface';

export interface JwtResponse {
    user: IUser;
    jwtToken: string;
}
  