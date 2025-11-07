import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

export class UserHelper {
  static validatePassword(password: string) {
    const validatePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{9,}$/;
    if (!validatePassword.test(password)) {
      throw new BadRequestException(
        'A senha deve ter no mínimo 9 caracteres, incluindo pelo menos uma letra e um número.',
      );
    }
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
