import {
  Effect,
  generatePolicy,
} from "@functions/basicAuthorizer/handlers/generatePolicy";
import {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerHandler,
} from "aws-lambda";

const basicAuthorizer: APIGatewayTokenAuthorizerHandler = async (
  event
): Promise<APIGatewayAuthorizerResult> => {
  try {
    const { authorizationToken, methodArn } = event;

    // TOKEN = HS256(  base64(JSON(header))   + "." +   base64(JSON(payload)), "pass"  )

    const encodedBase64Credentials = authorizationToken.split(" ")[1];

    const decodedCredentials = Buffer.from(
      encodedBase64Credentials,
      "base64"
    ).toString("utf-8");

    console.log('decodedCredentials', decodedCredentials)
    const [username, password] = decodedCredentials.split(":");
    const envKey = username.toLowerCase();
    console.log("envKey", envKey)

    const effect =
      process.env[envKey] === password ? Effect.Allow : Effect.Deny;

    console.log('process.env', process.env)


    const policy = generatePolicy(username, methodArn, effect);

    return policy;
  } catch (error) {
    console.log("Error::basicAuthorizer", error);
  }
};

export const main = basicAuthorizer;
