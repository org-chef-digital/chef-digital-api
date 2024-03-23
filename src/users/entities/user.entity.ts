export class User {
  id: number;
  fantasyName: string;
  email: string;
  password: string;
  username: string;
  numberPhone: string;

  constructor(
    id: number,
    fantasyName: string,
    email: string,
    password: string,
    numberPhone: string,
  ) {
    this.id = id;
    this.fantasyName = fantasyName;
    this.email = email;
    this.password = password;
    this.numberPhone = numberPhone;
  }
}
