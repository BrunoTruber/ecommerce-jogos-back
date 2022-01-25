import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/users/user.entity';

export const GetUser = createParamDecorator((data, req): User => {
  const user = req.args[0].user;
  console.log(user);
  return user;
});

// export const GetUser = createParamDecorator((data, req): User => {
//   return req.user;
// });
