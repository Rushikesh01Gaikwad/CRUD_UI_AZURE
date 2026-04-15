import { Department } from "./Department.model";

export class Teacher {
    id!: number;
    name: string = '';
    email:string = '';
    remark?: string = '';
    departmentID?: number;
    department?: Department;
    profileImage?: string; // 🔥 store file name / URL
}