// export class User {
//   constructor(
//     public id: string,
//     public name: string,
//     public email: string,
//     public password: string,
//     public isAdmin: boolean
//   ) {}
// }

// User Interface

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
