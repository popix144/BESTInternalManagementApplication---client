import { ICoreTeamMember } from './coreTeamMember.interface';
import { IUserShort } from './userShort.interface';

export interface IEvent {
    id: number,
    name: string,
    firstYear: number,
    description: string,
    mainOrganizer: IUserShort,
    coreTeamMembers: ICoreTeamMember[]
}