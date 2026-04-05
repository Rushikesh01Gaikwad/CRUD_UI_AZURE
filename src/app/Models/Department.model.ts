import { Teacher } from "./Teacher.model";

export class Department {
    Id!: number;
    Name: string = '';
    Remark?: string = '';
    Teachers?: Teacher[] = [];
}   