import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CredentialModule } from './credential/credential.module';
import { UserRoleModule } from './user-role/user-role.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'm.gainatullin',
      password: '1234',
      database: 'sql-backend',
      logging: false,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CredentialModule,
    UserRoleModule,
    PostModule,
  ],
})
export class AppModule {}
