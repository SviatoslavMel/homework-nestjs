import { get } from 'env-var';

export class RabbitMQConfig {
  public static readonly RABBITMQ_USER: string = get('RABBITMQ_USER')
    .required()
    .asString();

  public static readonly RABBITMQ_PASSWORD: string = get('RABBITMQ_PASSWORD')
    .required()
    .asString();

  public static readonly RABBITMQ_HOSTNAME: string = get('RABBITMQ_HOSTNAME')
    .required()
    .asString();

  public static readonly RABBITMQ_PORT: number = get('RABBITMQ_PORT')
    .required()
    .asPortNumber();

  public static readonly RABBITMQ_URL: string = `amqp://${this.RABBITMQ_USER}:${this.RABBITMQ_PASSWORD}@${this.RABBITMQ_HOSTNAME}:${this.RABBITMQ_PORT}`;

  public static readonly RABBITMQ_NOTIFICATION_DELAY_NAME: string =
    'NOTIFICATION_DELAY_SERVICE';

  public static readonly RABBITMQ_NOTIFICATION_DELAY_QUEUE: string =
    'notifications_delay';

  public static readonly RABBITMQ_NOTIFICATION_QUEUE: string = 'notifications';
}
