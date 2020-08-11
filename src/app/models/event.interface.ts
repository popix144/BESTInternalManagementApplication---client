import { IUser } from './user.interface';
import { ICoreTeamMember } from './coreTeamMember.interface';

export interface IEvent {
    id: number,
    name: string,
    firstYear: number,
    description: string,
    mainOrganizer: IUser,
    coreTeamMembers: ICoreTeamMember[]
}