import bcrypt from "bcrypt";
import { User } from "../interfaces/user.interface";
import { DatabaseHelper } from "../utils/database-helpers";
import { CreateLog } from "../utils/logger";

const users: User[] = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
];

const seedData = async () => {
  const _db = new DatabaseHelper();

  try {
    await _db.exec("usp_DeleteAllUsers", {});

    for (const user of users) {
      await _db.exec("usp_RegisterUser", {
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      });
    }

    CreateLog.info(`${users.length} users seeded`);

    process.exit();
  } catch (error) {
    CreateLog.error(error);
    process.exit(1);
  }
};

seedData();
