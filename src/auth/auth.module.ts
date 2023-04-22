import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { CredentialModule } from '../credential/credential.module';
import { UserRoleModule } from '../user-role/user-role.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    CredentialModule,
    UserRoleModule,
    JwtModule.register({
      secret: 'backend',
      signOptions: {
        expiresIn: '365d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
