"use strict";
const AWS = require('aws-sdk');
module.exports.updateItem = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  const { name, imageLink, price } = event.body;

  let data;

  const query = {
    TableName: process.env.DYNAMO_TABLE_NAME,
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
    data = await dynamodb.put(query).promise();
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
