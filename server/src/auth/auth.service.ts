import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  async findOrCreateUser(userDto) {
    let user = await this.userRepository.findOne({email : userDto.email});
    if(!user){
      // create new user and save into db.
      // you can use userRepository's save method to save the new User entity into db.
      // don't forget to hash the password before saving it into db.
    }
    
    return user;
 }

}
