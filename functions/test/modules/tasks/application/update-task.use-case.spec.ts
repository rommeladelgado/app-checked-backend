import {TaskRepository} from "@src/modules/tasks/domain/task-repository";
import {
  UpdateTaskUseCase,
} from "@src/modules/tasks/application/update-task.use-case";
import {
  UpdateTaskRequest,
} from "@src/modules/tasks/application/models/update-task-request";
import {Task} from "@src/modules/tasks/domain/entities/task";


describe("UpdateTaskUseCase", () => {
  let repo: jest.Mocked<TaskRepository>;
  let useCase: UpdateTaskUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      search: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<TaskRepository>;

    useCase = new UpdateTaskUseCase(repo);
    jest.clearAllMocks();
  });

  it("calls repository.update with request, taskId, and userId", async () => {
    const task = new Task(
      "Read a book",
      "Finish one chapter tonight.",
      false,
      true,
    );
    const request = {
      title: "Call parents",
      description: "Catch up with mom and dad.",
      complete: false,
    } as UpdateTaskRequest;

    repo.update.mockResolvedValueOnce(task);

    const result = await useCase.execute(request, "t1", "user-123");

    expect(repo.update).toHaveBeenCalledTimes(1);
    expect(repo.update).toHaveBeenCalledWith(request, "t1", "user-123");
    expect(result).toBe(task);
  });

  it("returns null if repository returns null", async () => {
    repo.update.mockResolvedValueOnce(null);

    const fakeRequest = {
      title: "Walk the dog",
      description: "30-minute walk in the park.",
      complete: false,
    };
    const result = await useCase.execute(fakeRequest, "t1", "user-123");

    expect(result).toBeNull();
  });
});
