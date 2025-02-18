import { get } from 'env-var';

export const config = {
  app: {
    env: get('NODE_ENV').required().asString(),
    port: get('NODE_APP_INSTANCE').required().asPortNumber(),
  },
  database: {
    host: get('DB_HOST').required().asString(),
    port: get('DB_PORT').required().asPortNumber(),
    userName: get('DB_USERNAME').required().asString(),
    userPassword: get('DB_PASSWORD').required().asString(),
    database: {
      users: 'usersdb',
    },
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
      notificationsDelay: 'notifications_delay',
    },
  },
  emitEvent: {
    sendDelayNotification: 'send-delay-notification',
  },
};
