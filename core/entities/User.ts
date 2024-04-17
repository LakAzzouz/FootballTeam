export class User {
    id: string;
    password: string;
    email: string;
  
    constructor(id: string, password: string, email: string) {
      this.id = id;
      this.password = password;
      this.email = email;
    }
  
    static create(id: string, password: string, email: string): User{
      const user = new User (
          id,
          password,
          email.trim().toLowerCase()
      )
      return user
    }

    updateEmail(newEmail: string): void {
      this.email = newEmail.trim().toLowerCase()
      return
    }

    updatePassword(): void {
      return
    }
  }