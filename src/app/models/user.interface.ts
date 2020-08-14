import { IRole } from './role.interface';
import { IUserCategory } from './userCategory.interface';
import { IDesiredUserCategories } from './desiredUserCategory.interface';
import { ICoreTeamMember } from './coreTeamMember.interface';
import { IEventUser } from './eventUser.interface';

export interface IUser {
  id: number,
  firstName: string,
  lastName: string,
  nickname: string,
  email: string,
  localDateTime: string,
  roles: IRole[],
  enabled: boolean,
  userCategories: IUserCategory[],
  desiredUserCategories: IDesiredUserCategories[];
  coreTeamMembers: ICoreTeamMember[],
  eventsMainOrganizer: IEventUser[]
}