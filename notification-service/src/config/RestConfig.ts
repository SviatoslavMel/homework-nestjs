import { get } from 'env-var';

export class RestConfig {
  public static readonly NOTIFICATION_HOSTNAME: string = get(
    'NOTIFICATION_HOSTNAME',
  )
    .required()
    .asString();

  public static readonly NOTIFICATION_PATH: string = get('NOTIFICATION_PATH')
    .required()
    .asString();
}
