import { get } from 'env-var';

export const config = {
  app: {
    env: get('NODE_ENV').required().asString(),
  },
  rest: {
    notification: {
      hostname: get('NOTIFICATION_HOSTNAME').required().asString(),
      sendPath: get('NOTIFICATION_PATH').required().asString(),
    },
  },
  rabbitMQ: {
    user: get('RABBITMQ_USER').required().asString(),
    password: get('RABBITMQ_PASSWORD').required().asString(),
    hostname: get('RABBITMQ_HOSTNAME').required().asString(),
    port: get('RABBITMQ_PORT').required().asPortNumber(),
    queue: {
      notifications: 'notifications',
    },
  },
  handleEvent: {
    userCongratulations: 'user-congratulations',
  },
};
