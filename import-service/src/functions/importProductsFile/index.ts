import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/import',
        authorizer: {
          arn: 'arn:aws:lambda:eu-central-1:663503730313:function:book-shop-authorization-service-dev-basicAuthorizer',
          name: 'basicAuthorizer',
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          type: 'token'
        }
      },

    },
  ],
};
