require("dotenv").config();

interface UserLogin {
  username: string;
  password: string;
}

export const user: UserLogin = {
  username: process.env.MOVIEDB_USERNAME as string,
  password: process.env.MOVIEDB_PASSWORD as string,
};
