import { get } from 'env-var';
import { DelayTask } from '../types/delay-task';

export class RedisConfig {
  public static readonly REDIS_HOSTNAME: string = get('REDIS_HOSTNAME')
    .required()
    .asString();

  public static readonly REDIS_PORT: number = get('REDIS_PORT')
    .required()
    .asPortNumber();

  public static readonly TASK_CREATE_USER: DelayTask = {
    name: 'create_user',
    delay: 60 * 1000, // 24 * 60 * 60 * 1000; // 24 hours delay,
    job: 'user-congratulations',
  };
}
