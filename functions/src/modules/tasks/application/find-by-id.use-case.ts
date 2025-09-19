import {TaskRepository} from "../domain/task-repository";
import {Task} from "../domain/entities/task";
import {UseCase} from "../../../shared/application/use-case";


export class FindByIdTaskUseCase implements UseCase<string, Task | null> {
  private taskRepository: TaskRepository;
  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId: string, userId: string) {
    return await this.taskRepository.findById(taskId, userId);
  }
}
