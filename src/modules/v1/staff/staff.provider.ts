import { constants } from 'src/helpers';
import { DataSource } from 'typeorm';
import { Staff } from './staff.entity';

export const staffProviders = [
  {
    provide: constants.REPOSITORY.STAFF_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(Staff);
    },
    inject: [constants.DATA_SOURCE],
  },
];
