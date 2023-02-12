import bcrypt from "bcrypt";
import { User } from "../interfaces/user.interface";
import { DatabaseHelper } from "../utils/database-helpers";
import { CreateLog } from "../utils/logger";

const users: User[] = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "123456",
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password1",
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    password: "password2",
    isAdmin: false,
  },
  {
    name: "Bob Smith",
    email: "bobsmith@example.com",
    password: "password3",
    isAdmin: false,
  },
  {
    name: "Emma Watson",
    email: "emmawatson@example.com",
    password: "password4",
    isAdmin: false,
  },
  {
    name: "Tom Cruise",
    email: "tomcruise@example.com",
    password: "password5",
    isAdmin: false,
  },
  {
    name: "Michael Jordan",
    email: "michaeljordan@example.com",
    password: "password6",
    isAdmin: false,
  },
  {
    name: "Tiger Woods",
    email: "tigerwoods@example.com",
    password: "password7",
    isAdmin: false,
  },
  {
    name: "LeBron James",
    email: "lebronjames@example.com",
    password: "password8",
    isAdmin: false,
  },
  {
    name: "Kobe Bryant",
    email: "kobebryant@example.com",
    password: "password9",
    isAdmin: false,
  },
  {
    name: "Dwayne Johnson",
    email: "dwaynejohnson@example.com",
    password: "password10",
    isAdmin: false,
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
        password: bcrypt.hashSync(user.password, 10),
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
