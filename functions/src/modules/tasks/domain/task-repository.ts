import {Task} from "./entities/task";
import {CreateTaskRequest} from "../application/models/create-task-request";
import {UpdateTaskRequest} from "../application/models/update-task-request";

export interface TaskRepository {

    create(task: CreateTaskRequest, userId:string):Promise<Task>;
    update(
        task: UpdateTaskRequest, taskId: string, userId:string):Promise<void>;
    findById(taskId: string, userId:string): Promise<Task | null>;
    search(query: string, userId:string): Promise<Task[]>;
    delete(taskId: string, userId:string): Promise<boolean>;
}

