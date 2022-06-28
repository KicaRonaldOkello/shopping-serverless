"use strict";

module.exports.getItems = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  let items;

  try {
    const results = await dynamodb.scan({
      TableName: process.env.DYNAMO_TABLE_NAME
    }).promise();
    items = results.Items;
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};