
export class User {
    name?: string;
    age?: number | string;
    id?: number
  
    constructor(name = '', age = 0) {
      this.name = name;
      this.age = age;
    }
}