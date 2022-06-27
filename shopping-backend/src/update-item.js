"use strict";

module.exports.hello = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { name, imageLink, price } = JSON.parse(event.body);

  const { id } = event.pathParameters;

  let data;

  const query = {
    TableName: 'ItemsTable',
    Key: {id},
    ExpressionAttributeValues: {
      ":name": name,
      ":imageLink": imageLink,
      ":price": price
    },
    UpdateExpression: "SET name = :name, imageLink = :imageLink, price = :price",
    ReturnValues: "ALL_NEW"
  }

  try {
    data = await dynamodb.put(query).toPromise();
    if (data.Attributes) {
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } else {
      return {
        statusCode: 404,
        body: 'The item to be updated was not found'
      };
    }
  } catch(e) {
    return { statusCode:500, body: "Could not update this post" };
  }
};
