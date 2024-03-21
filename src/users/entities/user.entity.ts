export class User {
  id: number;
  fantasyName: string;
  email: string;
  password: string;
  username: string;

  constructor(
    id: number,
    fantasyName: string,
    email: string,
    password: string,
  ) {
    this.id = id;
    this.fantasyName = fantasyName;
    this.email = email;
    this.password = password;
  }
}
