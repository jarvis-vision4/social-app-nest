type IPrivacy = 'public' | 'private' | 'friends'
interface IUserPayload {
    _id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
}
type IRole = 'user' | 'admin';
declare namespace Express {
    export interface Request {
        currentUser: IUserPayload;
    }
}