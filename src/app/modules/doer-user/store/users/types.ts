export interface User {
    id: string;
    name: string;
    avatar: string;
}

export interface Worker extends User {
    kind: 'Worker';
    photosCount: number;
}

export type UserTypes = 'Owner' | 'Master' | 'Worker';

export interface UsersList {
    items: User[];
}

export interface UsersListStore {
    users: UsersList;
}

export interface AddPhotoResult {
    userId: string;
    photosCount: number;
}
