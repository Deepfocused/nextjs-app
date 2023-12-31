import { IconType } from 'react-icons';

export interface Service {
    Icon?: IconType | any;
    title?: string;
    about: string;
}

export interface Skill {
    Icon?: IconType | any;
    name?: string;
    level?: string;
}

export interface IProject {
    name: string;
    description: string;
    image_path: string;
    deployed_url: string;
    github_url: string;
    category: Category[];
    key_techs: string[];
}

export type Category = 'AI' | 'Web';
