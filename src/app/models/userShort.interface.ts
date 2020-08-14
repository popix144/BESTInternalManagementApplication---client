import { IRole } from './role.interface';

export interface IUserShort {
    id: number,
    firstName: string,
    lastName: string,
    nickname: string,
    email: string,
    localDateTime: string,
    roles: IRole[],
    enabled: boolean
  }