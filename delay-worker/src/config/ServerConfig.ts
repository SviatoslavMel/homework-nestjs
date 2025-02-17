import { get } from 'env-var';

export class ServerConfig {
  public static readonly PORT: number = get('NODE_APP_INSTANCE')
    .required()
    .asPortNumber();

  public static readonly ENV: string = get('NODE_ENV').required().asString();
}
