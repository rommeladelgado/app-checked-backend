import {FieldValue} from "firebase-admin/firestore";
import {TaskRepository} from "../domain/task-repository";
import {Task} from "../domain/entities/task";
import {CreateTaskRequest} from "../application/models/create-task-request";
import {UpdateTaskRequest} from "../application/models/update-task-request";
import {db} from "../../../infra/db/firestore";
import {firestore} from "firebase-admin";
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;


export class TaskRepositoryImpl implements TaskRepository {

  constructor() {
  }

  private getTaskCollection(userId: string) {
    return db.collection("users").doc(userId).collection("tasks");
  }

  async create(task: CreateTaskRequest, userId: string): Promise<Task> {
    const documentReference = await this.getTaskCollection(userId).add({
      title: task.title,
      description: task.description,
      titleLower: (task.title ?? "").toLowerCase(),
      descriptionLower: (task.description ?? "").toLowerCase(),
      complete: false,
      active: true,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      completedAt: null,
    });
    const snapShot = await documentReference.get();

    return this.findById(snapShot.id, userId);
  }

  async delete(taskId: string, userId: string): Promise<boolean> {
    const documentReference = this.getTaskCollection(userId).doc(taskId);

    const snap = await documentReference.get();

    if (snap.exists) {
      const taskNew = {...snap.data(), active: false};
      await documentReference.set(taskNew, {merge: true});
      return true;
    }

    return false;
  }

  async findById(taskId: string, userId: string): Promise<Task | null> {
    const documentReference = this.getTaskCollection(userId).doc(taskId);
    const snap = await documentReference.get();
    if (snap.exists) {
      const data = snap.data();

      if (!data.active) return null;
      return new Task(
        data.title,
        data.description,
        data.complete,
        data.active,
        data.createdAt,
        data.updatedAt,
        data.completedAt,
        documentReference.id,
      );
    }

    return null;
  }

  
  async search(query: string, userId: string): Promise<Task[]> {
    const collection = this.getTaskCollection(userId);


    const q = query.toLowerCase();
    const hi = q + "\uf8ff";

    const searchByTitle = collection
      .where("active", "==", true)
      .orderBy("titleLower")
      .startAt(q).endAt(hi).get();

    const searchByDescription = collection
      .where("active", "==", true)
      .orderBy("descriptionLower")
      .startAt(q).endAt(hi).get();

    const [
      groupTitle,
      groupDescription,
    ] = await Promise.all([searchByTitle, searchByDescription]);

    const documentsWithTasks = [
      ...groupTitle.docs,
      ...groupDescription.docs,
    ];

    const taskMap: Map<string, Task> = new Map<string, Task>();
    for (const document of documentsWithTasks) {
      if (!taskMap.has(document.id)) {
        const data = document.data();
        const task = new Task(
          document.id,
          data.title,
          data.description,
          data.complete,
          data.active,
          data.createdAt,
          data.updatedAt,
          data.completedAt
        );
        taskMap.set(document.id, task);
      }
    }

    return [...taskMap.values()];
  }

  async update(task: UpdateTaskRequest, userId: string): Promise<void> {
    const documentReference = this.getTaskCollection(userId).doc(task.id);
    const snap = await documentReference.get();
    if (snap.exists) {
      const data = {
        title: task.title,
        description: task.description,
        titleLower: (task.title ?? "").toLowerCase(),
        descriptionLower: (task.description ?? "").toLowerCase(),
        complete: false,
        active: true,
        createdAt: task.createdAt,
        updatedAt: FieldValue.serverTimestamp(),
        completedAt: task.complete ? FieldValue.serverTimestamp():null,
      };
      await documentReference.set(data, {merge: true});
    }
  }
}
