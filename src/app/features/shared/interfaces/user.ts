import { JwtResponse } from "./tokens";

export interface BaseUser {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    address: string;
    phone: string;
    zipcode: string;
    avatar: string;
    gender: UserGender;
    _id: string;
}
// !! base user igzavneba 


export type ExcludeUser = 'password'
// !! akldeba password option

export interface User extends Omit<BaseUser, ExcludeUser>, JwtResponse{
    _id: string;
    role: UserRole;
    verified: boolean;
}
// !! gvibrundeba 


export type UserGender = 'MALE' | 'FEMALE' | 'OTHER';

export type UserRole = 'default' | 'moderator' | 'admin'