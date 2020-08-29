import { IUserShort } from './userShort.interface';

export interface JwtResponse {
    user: IUserShort,
    subscribed: boolean,
    jwtToken: string
}
  