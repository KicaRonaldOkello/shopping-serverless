"use strict";

module.exports.hello = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  let items;

  try {
    const results = await dynamodb.scan({
      TableName: 'ItemsTable'
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
