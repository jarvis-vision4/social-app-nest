import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://thurein:GjuDHR0B01ChIA6a@cluster0.xjxkvz1.mongodb.net/social_db?appName=Cluster0'), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
