export class Task {
  constructor(
        public readonly title: string,
        public readonly description: string,
        public readonly complete: boolean,
        public readonly active: boolean,
        public readonly createdAt?: string,
        public readonly updatedAt?: string,
        public readonly completedAt?: string,
        public readonly id?: string,
  ) {
    if (!title || title.trim() === "") {
      throw Error("Title is empty");
    }

    if (!description || description.trim() === "") {
      throw Error("Description is empty");
    }
  }
}
