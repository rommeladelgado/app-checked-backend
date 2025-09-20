
import {firestore} from "firebase-admin";
import {FieldValue} from "firebase-admin/firestore";
import {User} from "../domain/entities/user";
import {Email} from "../domain/entities/email";
import {Password} from "../domain/entities/password";

import CollectionReference = firestore.CollectionReference;
import {db} from "../../../infra/db/firestore";
import {UserRepository} from "../domain/user-repository";

export class UserRepositoryImpl implements UserRepository {
  private readonly collection: CollectionReference;
  constructor() {
    this.collection = db.collection("users");
  }

  async findByEmail(email: Email): Promise<User | null> {
    const snap = await this.collection
      .where("email", "==", email.getValue())
      .limit(1)
      .get();
    if (snap.empty) return null;

    const documentSnapshot = snap.docs[0];
    const data = documentSnapshot.data();

    return User.rehydrate(
      documentSnapshot.id,
      new Email(data.email),
      new Password(data.password.toString())
    );
  }

  async save(user: User): Promise<User | null> {
    try {
      const documentReference = await this.collection
        .add({
          email: user.email.getValue(),
          password: user.password.getValue(),
          createdAt: FieldValue.serverTimestamp(),
        });

      return User.rehydrate(
        documentReference.id,
        user.email,
        user.password,
      );
    } catch (ex) {
      return null;
    }
  }
}
