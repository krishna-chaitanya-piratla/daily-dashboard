import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

export interface BackgroundPreference {
  type: 'solid' | 'custom';
  value: string;
}

export interface UserProfile {
  userName: string;
  backgroundPreference: BackgroundPreference;
  customBackgroundColors: string[];
  showJokeWidget?: boolean;
  showLocationWeather?: boolean;
  showTodos?: boolean;
}

@Injectable()
export class UserProfileService {
  private userProfile: UserProfile;
  private USER_PROFILE_FILE_PATH: string;

  constructor(private configService: ConfigService) {
    const DATA_LOCATION = this.configService.get<string>('DATA_LOCATION_LOCAL');
    this.USER_PROFILE_FILE_PATH = path.resolve(DATA_LOCATION, 'user-settings.json');
    this.ensureDataFileExists();
    this.loadUserProfile();
  }

  private ensureDataFileExists() {
    const dirPath = path.dirname(this.USER_PROFILE_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    if (!fs.existsSync(this.USER_PROFILE_FILE_PATH)) {
      fs.writeFileSync(this.USER_PROFILE_FILE_PATH, JSON.stringify({
        userName: '',
        backgroundPreference: {
          type: 'solid',
          value: '#2f2c5c'
        },
        customBackgroundColors: [],
        showJokeWidget: true,
        showLocationWeather: true,
        showTodos: true,
      }, null, 2), 'utf8');
    }
  }

  private loadUserProfile() {
    const data = fs.readFileSync(this.USER_PROFILE_FILE_PATH, 'utf8');
    try {
      this.userProfile = JSON.parse(data) || {
        userName: '',
        backgroundPreference: {
          type: 'solid',
          value: '#2f2c5c'
        },
        customBackgroundColors: [],
        showJokeWidget: true,
        showLocationWeather: true,
        showTodos: true,
      };
    } catch (error) {
      this.userProfile = {
        userName: '',
        backgroundPreference: {
          type: 'solid',
          value: '#2f2c5c'
        },
        customBackgroundColors: [],
        showJokeWidget: true,
        showLocationWeather: true,
        showTodos: true,
      };
    }
  }
  

  private saveUserProfile() {
    fs.writeFileSync(this.USER_PROFILE_FILE_PATH, JSON.stringify(this.userProfile, null, 2), 'utf8');
  }

  getUserProfile(): UserProfile {
    return this.userProfile;
  }

  updateUserName(userName: string): UserProfile {
    this.userProfile.userName = userName;
    this.saveUserProfile();
    return this.userProfile;
  }

  updateBackgroundPreference(backgroundPreference: BackgroundPreference): UserProfile {
    this.userProfile.backgroundPreference = backgroundPreference;
    this.saveUserProfile();
    return this.userProfile;
  }

  updateCustomBackgroundColors(customBackgroundColors: string[]): UserProfile {
    this.userProfile.customBackgroundColors = customBackgroundColors;
    this.saveUserProfile();
    return this.userProfile;
  }

  updateShowJokeWidget(showJokeWidget: boolean): UserProfile {
    this.userProfile.showJokeWidget = showJokeWidget;
    this.saveUserProfile();
    return this.userProfile;
  }

  updateShowLocationWeather(showLocationWeather: boolean): UserProfile {
    this.userProfile.showLocationWeather = showLocationWeather;
    this.saveUserProfile();
    return this.userProfile;
  }

  updateShowTodos(showTodos: boolean): UserProfile {
    this.userProfile.showTodos = showTodos;
    this.saveUserProfile();
    return this.userProfile;
  }

  resetUserProfile(): UserProfile {
    this.userProfile = {
      userName: 'Stranger',
      backgroundPreference: {
        type: 'solid',
        value: '#2f2c5c'
      },
      customBackgroundColors: []
    };
    this.saveUserProfile();
    return this.userProfile;
  }
}
