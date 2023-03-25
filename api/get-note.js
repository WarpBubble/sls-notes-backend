//** Route: Get /note/n/ {note_id} */

const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-southeast-2" });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

const util = require("./utils");
const _ = require("underscore");

exports.handler = async (event) => {
  try {
    let note_id = decodeURIComponent0(event.pathParameters.note_id);

    let params = {
      TableName: tableName,
      IndexName: "note_id-index",
      KeyConditionExpression: "note_id = :note_id",
      ExpressionAttributeValues: {
        ":note_id": note_id,
      },
      Limit: 1,
    };

    let data = await dynamodb.query(params).promise();

    if (!_.isEmpty(data.Items)) {
      return {
        statusCode: 200,
        headers: util.getResponseHeaders(),
        body: JSON.stringify(data.Items[0]),
      };
    } else {
      return {
        tatusCode: 400,
        headers: util.getResponseHeaders()
      };
    }
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.StatusCode : 500,
      headers: util.getResponseHeaders(),
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unkown error",
      }),
    };
  }
};
