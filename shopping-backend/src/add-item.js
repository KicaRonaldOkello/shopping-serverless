"use strict";

module.exports.addItem = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { name, imageLink, price } = JSON.parse(event.body);
  const createdAt = new Date().toISOString;
  const id = v4();

  const item = {
    id,
    name,
    imageLink,
    price,
    createdAt
  }

  await dynamodb.put({
    TableName: 'ItemsTable',
    Item: item
  }).toPromise();

  return {
    statusCode: 201,
    body: JSON.stringify(item)
  }
};
