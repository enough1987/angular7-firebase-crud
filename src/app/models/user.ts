
export class User {
    name?: string;
    age?: number | string;
    id?: string
  
    constructor(name = '', age = 0) {
      this.name = name;
      this.age = age;
    }
}