import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DoctorsModule } from './doctors/doctors.module'; 
import { AppointmentsModule } from './appointments/appointments.module';
import { ServicesModule } from './services/service.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { BlogModule } from './blog/blog.module';
import { FaqsModule } from './faqs/faqs.module';
import { ContactModule } from './contact/contact.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,   
        limit: 10,     
      },
    ]),
    UserModule,
    DoctorsModule,
    AppointmentsModule,
    ServicesModule,
    TestimonialsModule,
    BlogModule,
    FaqsModule,
    ContactModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class AppModule { }
