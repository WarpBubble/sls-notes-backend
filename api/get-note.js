//** Route: Get /note/n/ {node_id} */

const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-southeast-2' })

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

const util = require('./utils')


exports.handler = async (event) => {
    try {

        return {
            statusCode: 200,
            headers: util.getResponseHeaders();
            body: JSON.stringify('')
        }

    } catch (err) {
        console.log("Error", err)
        return {
            statusCode: err.statusCode ? err.StatusCode : 500,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({
                error: err.name ? err.name : "Exception",
                message: err.message ? err.message : "Unkown error"
            })
        }
    }
}