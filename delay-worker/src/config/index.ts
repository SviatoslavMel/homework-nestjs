import { get } from 'env-var';

export const config = {
  app: {
    env: get('NODE_ENV').required().asString(),
  },
  rabbitMQ: {
    user: get('RABBITMQ_USER').required().asString(),
    password: get('RABBITMQ_PASSWORD').required().asString(),
    hostname: get('RABBITMQ_HOSTNAME').required().asString(),
    port: get('RABBITMQ_PORT').required().asPortNumber(),
    transport: {
      notificationDelay: 'NOTIFICATION_DELAY_SERVICE',
    },
    queue: {
      notifications: 'notifications',
      notificationsDelay: 'notifications_delay',
    },
  },
  redis: {
    hostname: get('REDIS_HOSTNAME').required().asString(),
    port: get('REDIS_PORT').required().asPortNumber(),
    task: {
      createUser: {
        name: 'create_user',
        delay: 24 * 60 * 60 * 1000,
        job: 'user-congratulations',
      },
    },
  },
  handleEvent: {
    sendDelayNotification: 'send-delay-notification',
  },
};
