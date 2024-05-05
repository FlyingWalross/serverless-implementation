
export const parseHandler = async (event, context) => {

  const body = JSON.parse(event.body);
  const searchString = event.queryStringParameters.searchString;

  for(let i = 0; i < body.length; i++) {
    if(searchString === body[i]) {
      return {
        statusCode: 200,
        body: i.toString()
      };
    }
  }
  return {
    statusCode: 200,
    body:(-1).toString()
  };
};
