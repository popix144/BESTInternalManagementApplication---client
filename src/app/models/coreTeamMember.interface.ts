import { IEventUser } from './eventUser.interface';
import { IUserShort } from './userShort.interface';

export interface ICoreTeamMember {
    event: IEventUser;
    userEvent: IUserShort;
    position: string;
}