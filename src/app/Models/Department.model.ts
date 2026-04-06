import { Teacher } from "./Teacher.model";

export class Department {
    id!: number;
    name: string = '';
    remark?: string = '';
    teachers?: Teacher[] = [];
}   