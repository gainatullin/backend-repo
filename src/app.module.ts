import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CredentialModule } from './credential/credential.module';
import { UserRoleModule } from './user-role/user-role.module';
import { PostModule } from './post/post.module';
import { AppDataSource } from './orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({ ...AppDataSource.options }),
    UserModule,
    AuthModule,
    CredentialModule,
    UserRoleModule,
    PostModule,
  ],
})
export class AppModule {}
