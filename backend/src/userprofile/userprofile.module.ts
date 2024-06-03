import { Module } from '@nestjs/common';
import { UserProfileService } from './userprofile.service';
import { UserProfileController } from './userprofile.controller';

@Module({
  providers: [UserProfileService],
  controllers: [UserProfileController]
})
export class UserprofileModule {}
