import {TaskRepository} from "@src/modules/tasks/domain/task-repository";
import {
  SearchTaskUseCase,
} from "@src/modules/tasks/application/search-task.use-case";
import {Task} from "@src/modules/tasks/domain/entities/task";


describe("SearchTaskUseCase", () => {
  let repo: jest.Mocked<TaskRepository>;
  let useCase: SearchTaskUseCase;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      search: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<TaskRepository>;

    useCase = new SearchTaskUseCase(repo);
    jest.clearAllMocks();
  });

  it("calls repository.search with query and userId", async () => {
    const fakeTasks = [
      {
        id: "t1",
        title: "Walk the dog",
        description: "30-minute walk in the park.",
      },
      {
        id: "t2",
        title: "repare pasta with salad.",
        description: "Practice English"},
    ] as Task[];

    repo.search.mockResolvedValueOnce(fakeTasks);

    const result = await useCase.execute("test", "user-123");

    expect(repo.search).toHaveBeenCalledTimes(1);
    expect(repo.search).toHaveBeenCalledWith("test", "user-123");
    expect(result).toBe(fakeTasks);
  });

  it("returns an empty array if repository returns []", async () => {
    repo.search.mockResolvedValueOnce([]);

    const result = await useCase.execute("nothing", "user-123");

    expect(result).toEqual([]);
  });
});
