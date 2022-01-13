import { container } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';

container.registerSingleton<IDateProvider>('DayjsDateProvider', DayJsDateProvider);

container.registerSingleton<IMailProvider>('EtherealMailProvider', EtherealMailProvider);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>('StorageProvider', diskStorage[process.env.DISK]);
