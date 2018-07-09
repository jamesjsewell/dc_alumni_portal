
export var CRUD = class {
    
    constructor(options){

        var { operation, backbone_collection, backbone_model, id, updated_obj, query_obj, on_success_callback, on_error_callback } = options
        
        this.backboneCollection = backbone_collection
        this.backboneModel = backbone_model
        this.modelId = id
        this.updatedObj = updated_obj
        this.queryObj = query_obj
        this.onSuccess = on_success_callback
        this.onError = on_error_callback

        switch(operation){
            case "create":

                this.create()

                break

            case "read":

                this.read()
                
                break

            case "update":

                this.update()

                break

            case "delete":

                this.delete()

                break
        }

    }

    create(){

        this.successMessage = "created item"

        this.backboneCollection.create(
            this.backboneModel,
            {
                wait: true,
                success: (response) => { this.parse_response(response) }, 
                error: (error) => { this.parse_response(error) }
            }
        )

    }

    read(){

        this.successMessage = "fetched items"

        this.backboneCollection.fetch(
            {
                data: this.queryObj ? this.queryObj : null,
                wait: true,
                success: (response) => { this.parse_response(response) },
                error: (error) => { this.parse_response(error) } 
            }
        )

    }

    update(){

        var model = this.backboneCollection.get(this.backboneModel._id)

        this.successMessage = "updated item"

        if (model) {

            model.save( 
                this.updatedObj,
                {   
                    merge: true,
                    wait: true,
                    success: (response) => { this.parse_response(response) },
                    error: (error) => { this.parse_response(error) }
                }
            )

        }

    }

    delete(){

        var model = this.backboneCollection.get(this.id)
    
        this.successMessage = "removed item"

        if (model) {

            model.destroy( 
                
                {
                    success: (response)=>{ this.parse_response(response) },
                    error: (error) => { this.parse_response(error) },
                    wait: true
                }
            )

        }

    }

    parse_response(response){

        var error = false
        var collection = response

        if(response.attributes && response.attributes.error){

            this.onError(response.attributes.message)

        }
        else{

            if(response.collection){
                collection = response.collection
            }
            
            this.onSuccess(collection, this.successMessage)

        } 

    }

}
