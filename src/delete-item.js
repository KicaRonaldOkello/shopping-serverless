"use strict";
const AWS = require('aws-sdk');

module.exports.deleteItem = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  let items;

  try {
    await dynamodb.delete({
      TableName: process.env.DYNAMO_TABLE_NAME,
      Key: {id}
    }).promise();
    return {
        statusCode: 200,
        body: 'Item deleted successfully.',
      };
  } catch (error) {
    return {
        statusCode: 500,
        body: 'Item was not deleted.',
      };
  }
};
