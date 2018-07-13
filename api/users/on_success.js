module.exports = {
    // takes the request from the http request, the response object, message to client, data output
    // returns it back to the client
    success: function(req, res, msg, output){
        res.status(201).json(output)
    }
}