export const getAppVariables = () => {
  const { BUCKET_NAME, UPLOAD_FOLDER, PARSED_FOLDER, SQS_URL } = process.env;

  const hasUndefinedProcessVariables = [BUCKET_NAME, UPLOAD_FOLDER, PARSED_FOLDER, SQS_URL].some(
    (r) => !r
  );
  if (hasUndefinedProcessVariables) {
    throw Error('Error: ENV variable(s) is not defined');
  }

  const constants = {
    bucketName: BUCKET_NAME,
    uploadFolder: UPLOAD_FOLDER,
    parsedFolder: PARSED_FOLDER,
    sqsUrl: SQS_URL,
  };

  return constants;
};
