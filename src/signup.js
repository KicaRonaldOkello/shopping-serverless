"use strict";
const AWS = require('aws-sdk');

module.exports.signup = async (event) => {

  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

  const { email, password } = event.body;
    const signUpParams = {
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [
          {
            Name: 'email',
            Value: email
          }
        ]
      }
      await cognitoidentityserviceprovider.signUp(signUpParams).promise()
      const confirmParams = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: email
      }
      await cognitoidentityserviceprovider.adminConfirmSignUp(confirmParams).promise()
      return {
        email,
        body: 'Account creation successful',
        statusCode: 201
    }
};
