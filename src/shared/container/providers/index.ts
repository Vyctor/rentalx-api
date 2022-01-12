import { container } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';

container.registerSingleton<IDateProvider>('DayjsDateProvider', DayJsDateProvider);

container.registerSingleton<IMailProvider>('EtherealMailProvider', EtherealMailProvider);

container.registerSingleton<IStorageProvider>('StorageProvider', LocalStorageProvider);
