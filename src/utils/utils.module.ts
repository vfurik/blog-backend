import { DynamicModule, Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { UtilsController } from './utils.controller';

@Module({})
export class UtilsModule {
  public static forRoot(env: string): DynamicModule {
    return env == 'test'
      ? {
          module: UtilsModule,
          providers: [UtilsService],
          controllers: [UtilsController],
        }
      : { module: UtilsModule };
  }
}
