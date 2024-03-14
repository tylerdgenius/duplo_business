import { Controller } from '@nestjs/common';
import { getters } from 'src/helpers';

console.log({ urls: getters.getConfigService().get('APP_VERSION') });

@Controller('user')
export class UserController {}
