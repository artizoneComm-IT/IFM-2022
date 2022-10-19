import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Users } from 'src/entities/Users';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
