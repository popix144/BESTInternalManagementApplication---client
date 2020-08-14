import { IUserShort } from './userShort.interface';

export interface JwtResponse {
    user: IUserShort,
    jwtToken: string
}
  