import { Controller, Get, Put, Body, Param, Delete } from '@nestjs/common';
import { UserProfileService, UserProfile, BackgroundPreference } from './userprofile.service';

@Controller('userprofile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get()
  getUserProfile(): UserProfile {
    return this.userProfileService.getUserProfile();
  }

  @Put('username')
  updateUserName(@Body('userName') userName: string): UserProfile {
    return this.userProfileService.updateUserName(userName);
  }

  @Put('background')
  updateBackgroundPreference(@Body() backgroundPreference: BackgroundPreference): UserProfile {
    return this.userProfileService.updateBackgroundPreference(backgroundPreference);
  }

  @Put('custombackgroundcolors')
  updateCustomBackgroundColors(@Body('customBackgroundColors') customBackgroundColors: string[]): UserProfile {
    return this.userProfileService.updateCustomBackgroundColors(customBackgroundColors);
  }

  @Put('jokewidget')
  updateShowJokeWidget(@Body('showJokeWidget') showJokeWidget: boolean): UserProfile {
    return this.userProfileService.updateShowJokeWidget(showJokeWidget);
  }

  @Delete()
  resetUserProfile(): UserProfile {
    return this.userProfileService.resetUserProfile();
  }
}
