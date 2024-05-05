import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const db = new DynamoDBClient({ region: "eu-central-1" });

export const queryHandler = async (event, context) => {

  const initialPrimaryKey = event.queryStringParameters.initialPrimaryKey;
  let nextPrimaryKey = initialPrimaryKey;
  let counter = 0;
  do {
      const command = new GetItemCommand({
          TableName: "round-trip-table",
          Key: {
              "primary_key": {S: nextPrimaryKey}
          }
      });
      const item = await db.send(command);
      nextPrimaryKey = item.Item.next_primary_key.S;
      counter++;
  } while (nextPrimaryKey !== initialPrimaryKey);

  const response = {
    statusCode: 200,
    body: counter.toString()
  };

  return response;
};
  