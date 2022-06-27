"use strict";

module.exports.hello = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  let items;

  try {
    const results = await dynamodb.get({
      TableName: 'ItemsTable',
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
