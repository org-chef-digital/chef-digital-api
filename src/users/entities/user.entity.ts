export class User {
  id: number;
  fantasyName: string;
  email: string;
  password: string;
  username: string;
  phone: string;

  constructor(
    id: number,
    fantasyName: string,
    email: string,
    password: string,
    phone: string,
  ) {
    this.id = id;
    this.fantasyName = fantasyName;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }
}
