import { AppDataSource } from "./data-source";

export const databaseInit = async () => {
  // Initialize TypeORM
  await AppDataSource.initialize();
};
