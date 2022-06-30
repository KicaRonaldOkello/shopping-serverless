"use strict";

const AWS = require('aws-sdk');

module.exports.login = async (event) => {

  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

  const { email, password } = event.body;

    const params = {
        ClientId: process.env.COGNITO_CLIENT_ID,
        UserPoolId: process.env.USER_POOL_ID,
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password
        }
      }
      const { AuthenticationResult: { IdToken: idToken } } = await cognitoidentityserviceprovider.adminInitiateAuth(params).promise()
      return { 
        idToken,
        message: 'Authentication successful',
        statusCode: 200
      };
};
