Sleep Tracker API
This document explains how to set up, run, and interact with a simple sleep tracker API built with Node.js and Express.

Setting Up:

Prerequisites: Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from the official Node.js website https://nodejs.org/en.

Clone or Download: Clone this repository or download the project files.

Dependencies: Open your terminal or command prompt and navigate to the project directory. Run the following command to install the required dependency:

Bash
npm install express
Use code with caution.
content_copy
Running the API:

Start Server: Execute the following command in your terminal to start the API server:

Bash
node server.js
Use code with caution.
content_copy
This will typically start the server on port 3000 (you can check the server code for port configuration).

API Endpoints:

The API provides three main endpoints for managing sleep data:

1. POST /sleep (Create a Sleep Record):

Request:

Method: POST
Content-Type: application/json
Body: JSON object containing the following properties:
userId: (integer) Unique identifier for the user
hours: (number) Number of hours slept
timestamp: (string) Date and time of sleep in ISO 8601 format (e.g., "2024-05-20T00:00:00.000Z")
Response:

Status Code: 201 (Created)
Body: JSON object representing the newly created sleep record, including the provided properties (userId, hours, timestamp) and an additional id property assigned by the server.
2. GET /sleep/:userId (Retrieve Sleep Records):

Request:

Method: GET
Path Parameter: userId (integer) - The ID of the user for whom to retrieve sleep records.
Response:

Status Code: 200 (OK)
Body: JSON array containing all sleep records for the specified user, sorted by timestamp in descending order (most recent first). Each record object will have the same structure as the response from the POST endpoint.
3. DELETE /sleep/:recordId (Delete a Sleep Record):

Request:

Method: DELETE
Path Parameter: recordId (integer) - The unique ID of the sleep record to be deleted.
Response:

Status Code:
200 (OK) - Upon successful deletion
404 (Not Found) - If the specified record ID does not exist
Body:
200: JSON object with a message property: "Record deleted"
404: JSON object with a message property: "Record not found"
Testing the API:

You can use tools like Postman or curl to test the API endpoints. Refer to the examples provided in the comments within the server.js file for guidance on crafting requests and interpreting responses.