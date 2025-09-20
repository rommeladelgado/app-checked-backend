import {initializeTestEnvironment, RulesTestEnvironment} from "@firebase/rules-unit-testing";

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "tests",
  });

  process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
});

afterAll(async () => {
  await testEnv.cleanup();
});
