import { Department } from "./Department.model";

export class Teacher {
    Id!: number;
    Name: string = '';
    Remark?: string = '';
    DepartmentId?: number;
    Department?: Department;
}