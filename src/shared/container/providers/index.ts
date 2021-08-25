import { container } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';

import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IDateProvider>('DayJsDateProvider', DayJsDateProvider);

container.registerSingleton<IMailProvider>('EtherealMailProvider', EtherealMailProvider);
