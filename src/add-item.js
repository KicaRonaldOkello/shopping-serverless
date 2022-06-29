"use strict";
const { v4 } = require('uuid');
const AWS = require('aws-sdk');

module.exports.addItem = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { name, imageLink, price } = event.body;
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
    TableName: process.env.DYNAMO_TABLE_NAME,
    Item: item
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({...item})
  }
};
