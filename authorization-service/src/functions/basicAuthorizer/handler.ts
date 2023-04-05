import {
  Effect,
  generatePolicy,
} from "@functions/basicAuthorizer/handlers/generatePolicy";
import {
  APIGatewayAuthorizerCallback,
  Context,
} from "aws-lambda";

const basicAuthorizer = async (
  event,
  _ctx: Context,
  callback: APIGatewayAuthorizerCallback
): Promise<void> => {
  try {
    const { authorizationToken, methodArn } = event;

    if (event.type !== "TOKEN" || !authorizationToken) {
      callback("Unauthorized");
    }

    if (authorizationToken === "1234") {
      callback("Unauthorized");
    }
    console.log(event);

    // TOKEN = HS256(  base64(JSON(header))   + "." +   base64(JSON(payload)), "pass"  )

    const encodedBase64Credentials = authorizationToken.split(" ")[1];

    const decodedCredentials = Buffer.from(
      encodedBase64Credentials,
      "base64"
    ).toString("utf-8");

    console.log("decodedCredentials", JSON.stringify(decodedCredentials));
    const [username, password] = decodedCredentials.split(":");
    const envKey = username.toLowerCase();

    const isEnvPasswordExist =
      process.env[envKey] && typeof process.env[envKey] === "string";
    const isCredentialPasswordProvided =
      password && typeof password === "string";
    const isPasswordsEqual = process.env[envKey] === password;

    const effect =
      isEnvPasswordExist && isCredentialPasswordProvided && isPasswordsEqual
        ? Effect.Allow
        : Effect.Deny;

    const policy = generatePolicy(username, methodArn, effect);
    console.log(JSON.stringify(policy));
    callback(null, policy);

  } catch (error) {
    callback(error);
    console.log("Error::basicAuthorizer", error);
  }
};

export const main = basicAuthorizer;
