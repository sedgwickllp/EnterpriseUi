import { UserModel } from './models/user.model';
export interface LoginStoreData {
    user: UserModel;
    
}

export const INITIAL_LOGIN_STORE_DATA: LoginStoreData = {
    user: { userName :"",
            userId: ""}
    
};