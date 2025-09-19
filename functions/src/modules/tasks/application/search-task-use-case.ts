import {TaskRepository} from "../domain/task-repository";
import {Task} from "../domain/entities/task";
import {UseCase} from "../../../shared/application/use-case";


export class SearchTaskUseCase implements UseCase<string, Task[]> {
  private taskRepository: TaskRepository;
  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(query: string, userId: string) {
    return await this.taskRepository.search(query, userId);
  }
}
