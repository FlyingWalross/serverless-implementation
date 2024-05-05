
export const echoHandler = async (event, context) => {
  const response = {
    statusCode: 200,
    body: event.queryStringParameters.string
  };

  return response;
};
  