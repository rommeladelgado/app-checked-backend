import {TaskRepository} from "@src/modules/tasks/domain/task-repository";
import {FindByIdTaskUseCase} from "@src/modules/tasks/application/find-by-id.use-case";
import {Task} from "@src/modules/tasks/domain/entities/task";


describe("FindByIdTaskUseCase", () => {
  let repo: jest.Mocked<TaskRepository>;
  let useCase: FindByIdTaskUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      search: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<TaskRepository>;

    useCase = new FindByIdTaskUseCase(repo);
    jest.clearAllMocks();
  });

  it("calls repository.findById with taskId and userId", async () => {
    const task = {
      id: "t1",
      title: "Walk the dog",
      description: "30-minute walk in the park.",
    } as Task;
    repo.findById.mockResolvedValueOnce(task);

    const result = await useCase.execute("t1", "u1");

    expect(repo.findById).toHaveBeenCalledTimes(1);
    expect(repo.findById).toHaveBeenCalledWith("t1", "u1");
    expect(result).toBe(task);
  });

  it("returns null when repository returns null", async () => {
    repo.findById.mockResolvedValueOnce(null);

    const result = await useCase.execute("missing", "u1");

    expect(result).toBeNull();
  });
});
