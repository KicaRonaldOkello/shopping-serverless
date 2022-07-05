"use strict";
const AWS = require('aws-sdk');
module.exports.updateItem = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  const { name, imageLink, price } = JSON.parse(event.body);

  let data;

  const query = {
    TableName: process.env.DYNAMO_TABLE_NAME,
    Key: {id},
    ExpressionAttributeValues: {
      ":name": name,
      ":imageLink": imageLink,
      ":price": price
    },
    ExpressionAttributeNames: {
      "#itemName": "name"
    },
    UpdateExpression: "SET #itemName = :name, imageLink = :imageLink, price = :price",
    ReturnValues: "ALL_NEW"
  }

  try {
    data = await dynamodb.update(query).promise();
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
