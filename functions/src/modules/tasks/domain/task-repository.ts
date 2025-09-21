import {Task} from "./entities/task";
import {CreateTaskPayload, UpdateTaskPayload} from "./entities/types";

export interface TaskRepository {

    create(task: CreateTaskPayload, userId:string):Promise<Task | null>;
    update(
        task: UpdateTaskPayload,
        taskId: string,
        userId: string
    ):Promise<Task | null>;
    findById(taskId: string, userId:string): Promise<Task | null>;
    search(query: string, userId:string): Promise<Task[]>;
    delete(taskId: string, userId:string): Promise<boolean>;
}

