
export const generateUndefinedRecipientMessage = (
  serviceName: string
) => `Cannot process requests. 
        Details: bff can not find recipient url for '${serviceName}-service'. Please check env variables.`;
