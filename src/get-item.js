"use strict";
const AWS = require('aws-sdk');
module.exports.getItem = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  let item;

  try {
    const results = await dynamodb.get({
      TableName: process.env.DYNAMO_TABLE_NAME,
      Key: {id}
    }).promise();
    item = results.Item;
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(item),
  };
};
