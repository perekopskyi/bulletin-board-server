import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  // constructor(private usersService: UsersService) {}

  // async validateUser(username: string, password: string): Promise<any> {
  //   // TODO find user in DB and return result
  //   const user = await this.usersService.findByUsername(username);

  //   if (user && user.password === password) {
  //     const { password, username, ...rest } = user;
  //     return rest;
  //   }
  // }

  signin() {
    return 'In';
  }

  singup() {
    return 'Up';
  }
}
