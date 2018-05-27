export interface User {
    id: string;
    firstName: string;
    midName: string;
    lastName: string;
    email: string;
    phone: string;
    ancestors: string[];
    avatar: string;
    photosCount: number;
}

export interface Worker extends User {
    kind: 'Worker';
    photosCount: number;
}

export type UserTypes = 'Owner' | 'Master' | 'Worker';

export interface UsersSet { [userId: string]: User; }

export interface Users {
    items: UsersSet;
}

export interface UsersListStore {
    users: Users | null;
}

export interface AddPhotoResult {
    userId: string;
    photosCount: number;
}
