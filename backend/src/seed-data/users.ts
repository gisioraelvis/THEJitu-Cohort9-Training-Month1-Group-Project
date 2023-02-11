import bcrypt from "bcrypt";
import { User } from "../interfaces/user.interface";
import { DatabaseHelper } from "../utils/database-helpers";

const users: User[] = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Customer User",
    email: "customer@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

const seedData = async () => {
  const _db = new DatabaseHelper();

  try {
    await _db.exec("DeleteAllUsers", {});

    for (const user of users) {
      await _db.exec("RegisterUser", {
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      });
    }

    console.log(`${users.length} users seeded`);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
