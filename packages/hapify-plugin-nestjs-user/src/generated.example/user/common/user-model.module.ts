/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserDatabaseService, UserService } from './services';

export const UserModelModuleProvidersList = [UserService, UserDatabaseService];
export const UserModelModuleExportsList = [UserService, UserDatabaseService];
