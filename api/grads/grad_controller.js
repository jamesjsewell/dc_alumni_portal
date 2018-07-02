// mongooese model imported from the Grad's schema file
const Grad = require("./schema.js")

// see file for more info
const errorHandler = require("./on_error.js").error,
    successHandler = require("./on_success.js").success


// exports the functions as methods that are the 'endpoints' of routes, where logic gets handled and 
// the output of the method is returned over http as json or any other variable specified. the contents of the response are
// returned back to where you made the http request
// these functions are utilized in the GradRoutes.js file
module.exports = {

    // when a post request is made, this endpoint will take the information from
    // the body of the request and assign it to a new record in the database. Returns the newly generated 
    // object in an http response back to where the post request was initiated
    post: function (req, res, next) {

        // parsing the information contained in the body of the request that will be
        // applied ot the new record.
        const username = req.body.username,
            bio = req.body.bio

        if(username && bio){

            // 'TheGrad' is an instance of the Grad mongoose model class. It contains a method called save.
            // the save method will take the mongoose model and save it to the database
            var TheGrad = new Grad({ username: username, bio: bio })
            TheGrad.save(function (err, results) {

                // if there is an error, it will be sent over as an http response to the place where the request was initialized
                if (err) {
                    var message = "server error, could not save Grad"
                    return errorHandler(req, res, message, err)
                    

                }

                // the save was successful, the newly created record will be sent back in an http response to where the post request was initialized
                var message = "saved Grad"
                return successHandler(req, res, message, results)
            })

        }
        else{

            res.end()
            return
        }


    },

    // returns a collection of all 'Grad' records in the database, or a filtered set
    // of records if specified. The results of the query are returned in an http response back to
    // where the http request was initiated
    get: function (req, res, next) {

        // builds a json object of key value pairs
        // if the json object ends up with key/value pairs
        // they will be used to filter for 'Grad' records 
        // that have matching parameters
        var queryObj = req.body
     
        if (req.params.id) {
            queryObj._id = req.params.id

        }

        // if the queryObj variable doesnt have any values assigned to it
        // the find method will return all 'Grad' records in a collection.
        // if it does have values assigned to it, the method will only 
        // return records that have matching parameters

        // Grad is a mongoose model class that contains a method called find. Find takes
        // a query object if you specifiy one, if the object is empty it will returned
        // an unfiltered collection of records, otherwise it will return a filtered set
        Grad.find(queryObj, function (err, results) {
            //returns an 'error' message over an http response to the entity where the http request was made
            if (err) {

                var message = "server error, Grad not found"
                return errorHandler(req, res, message, err)
                

            }

            //returns the results of the query over an http response to the entity where the http request was made
            return successHandler(req, res, message, results)
        })

    },

    // this method will take the id of the desired grad from the request
    // parameters. it will then perform a 'find by id and update' function, using the new data obtained
    // from the 'body' of the request. When that is complete, it sends the newly updated record back
    // as a response to the entity that made the http put request.
    update: function (req, res, next) {

        // the Grad is a mongoose model class, which contains a method called findByIdAndUpdate, 
        // the method takes an id and the new information that you want to be patched on the record
        // it then returns the result with either an error or the updated object

        Grad.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true},
            function (err, results) {
                if (err) {
                    // if there was an error, this will send the error as an http response to the request that was made
                    var message = "server error, could not update Grad"
                    return errorHandler(req, res, message, err)

                } else if (!results) {
                    // if it could not find the record, sends an error message as a response over http back to where the request was made
                    var message = "server error, Grad not found"
                    return errorHandler(req, res, message, err)

                } else {
                    // sends the newly updated record over http request back to where the request was made
                    var message = "Grad updated"
                    return successHandler(req, res, message, results)

                }
            }
        )

    },

    // takes the desired Grad's id from the request parameters, then performs a method that the selects the record in the database
    // and removes it
    delete: function (req, res, next) {

        // Grad is a mongoose model class that contains a method called remove. remove takes the id that was sent
        // in the http request parameters. If a record can be found that has the desired id, it will be removed
        // from the database collection

        Grad.remove({ _id: req.params.id }, function (err) {
            if (err) {
                // if an error occures in the process of selecting or removing the record, the error will be sent
                // back over an http response to where the http request was made
                var message = "server error, could not remove Grad"
                return errorHandler(req, res, message, err)
                
            }

            // if the record was found and removed, a confirmation message will be sent back as an http response to where the request was made
            var message = "Grad deleted"
            //return successHandler(req, res, message)
            return res.status(201).json({id: req.params.id})
        })

    }

}