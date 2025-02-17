import { get } from 'env-var';

export class RedisConfig {
  public static readonly REDIS_HOSTNAME: string = get('REDIS_HOSTNAME')
    .required()
    .asString();

  public static readonly REDIS_PORT: number = get('RABBITMQ_PORT')
    .required()
    .asPortNumber();
}
