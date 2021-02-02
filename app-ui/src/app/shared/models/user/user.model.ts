export class User{
  private id?: number;
  private name: string;
  private surname: string;
  private phone: string;
  private email: string;


  get _id(): number {
    return this.id;
  }

  set _id(value: number) {
    this.id = value;
  }

  get _name(): string {
    return this.name;
  }

  set _name(value: string) {
    this.name = value;
  }

  get _surname(): string {
    return this.surname;
  }

  set _surname(value: string) {
    this.surname = value;
  }

  get _phone(): string {
    return this.phone;
  }

  set _phone(value: string) {
    this.phone = value;
  }

  get _email(): string {
    return this.email;
  }

  set _email(value: string) {
    this.email = value;
  }
}
