import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const db = new DynamoDBClient({ region: "eu-central-1" });

export const getPriceHandler = async (event, context) => {

  const body = JSON.parse(event.body);

  const command = new GetItemCommand({
      TableName: "online-shop-items",
      Key: {
          "item_id": { S: body.itemId }
      }
  });
  const item = await db.send(command);
  const perItemPrice = parseInt(item.Item.per_item_price.N);
  const totalPricePreTax = perItemPrice * body.quantity;
  const taxRate = parseFloat(item.Item.tax_rate.N);
  const totalPriceWithTax = totalPricePreTax * (1 + taxRate);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
        itemId: body.itemId,
        quantity: body.quantity,
        perItemPrice: perItemPrice,
        totalPricePreTax: totalPricePreTax,
        taxRate: taxRate,
        totalPriceWithTax: totalPriceWithTax
    })
  };

  return response;
};
  