import * as admin from "firebase-admin";
import {db} from "@src/infra/db/firestore";
import {
  TaskRepositoryImpl,
} from "@src/modules/tasks/infrastructure/task-repository-impl";
import {Email} from "@src/modules/users/domain/entities/email";
import {Password} from "@src/modules/users/domain/entities/password";
import {User} from "@src/modules/users/domain/entities/user";
import {Task} from "@src/modules/tasks/domain/entities/task";
import {
  UserRepositoryImpl,
} from "@src/modules/users/infrastructure/user-repository-impl";
import {
  CreateTaskRequest,
} from "@src/modules/tasks/application/models/create-task-request";
import {
  UpdateTaskRequest,
} from "@src/modules/tasks/application/models/update-task-request";
import {
  TaskRepository,
} from "@src/modules/tasks/domain/task-repository";
if (!admin.app.length) {
  admin.initializeApp({projectId: "tests"});
}

describe("TaskRepositoryImpl test", () => {
  let repo: TaskRepository;
  let userId: string;
  let taskId:string;

  beforeEach(async () => {
    repo = new TaskRepositoryImpl();
    const email = new Email("email.exist@email.com");
    const password = new Password("123");
    const user = new User(email, password);

    const userRepository = new UserRepositoryImpl();
    const newUser = await userRepository.save(user);
    if (newUser?.id) {
      userId = newUser.id;
    }

    const request1 = {
      title: "Primary task",
      description: "this is secondary task",
    };
    const newTask = await repo.create(request1, userId);
    if (newTask?.id) {
      taskId = newTask.id;
    }

    const request2 = {
      title: "Secondary task",
      description: "this is secondary task",
    };
    await repo.create(request2, userId);
  });


  afterEach(async () => {
    const docs = await db.collection("users").listDocuments();
    await Promise.all(docs.map((d) => d.delete()));
  });

  it("search()", async () => {
    const tasks = await repo.search("primary", userId);

    expect(tasks).toHaveLength(1);
    const ids = tasks.map((t: Task) => t.id).sort();
    expect(ids).toEqual([taskId]);
  });


  it("create(), when the task is created successfully", async () => {
    const request = {
      title: "Primary task",
      description: "this is secondary task",
    } as CreateTaskRequest;
    const newTask = await repo.create(request, userId);
    expect(newTask).not.toBeNull();
  });


  it("update() task is update successfully", async () => {
    const request = {
      title: "Running",
      description: "run in the mornings",
      complete: true,
    } as UpdateTaskRequest;
    const newTask = await repo.update(request, taskId, userId);
    expect(newTask).not.toBeNull();
  });

  it("findById() task exist", async () => {
    const task = await repo.findById(taskId, userId);
    expect(task).not.toBeNull();
  });

  it("findById() when the task is not found", async () => {
    const documentId = "QWERTYuiopASDFghjklZXCVbnm123456";
    const task = await repo.findById(documentId, userId);
    expect(task).toBeNull();
  });

  it("delete() delete successfully deleted", async () => {
    const task = await repo.delete(taskId, userId);
    expect(task).toEqual(true);
  });
});
