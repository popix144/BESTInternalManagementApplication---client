import { IEvent } from './event.interface';
import { IRole } from './role.interface';
import { ICoreTeamMember } from './coreTeamMember.interface';

export interface IUser {
  id: number,
  firstName: string,
  lastName: string,
  nickname: string,
  email: string,
  password: string,
  localDateTime: string,
  roles: IRole[],
  enabled: boolean
}