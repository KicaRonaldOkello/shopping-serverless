"use strict";

module.exports.getItem = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  let items;

  try {
    const results = await dynamodb.get({
      TableName: process.env.DYNAMO_TABLE_NAME,
      Key: {id}
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
