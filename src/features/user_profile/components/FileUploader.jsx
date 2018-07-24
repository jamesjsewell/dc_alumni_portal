import React, { Component } from "react"
import { Dashboard } from '@uppy/react'
const Uppy = require('@uppy/core')
const AwsS3 = require('@uppy/aws-s3')
const ms = require('ms')

const uppy = Uppy({
  debug: true,
  autoProceed: false,
  restrictions: {
    maxFileSize: 4000000,
    maxNumberOfFiles: 1,
    minNumberOfFiles: 1,
    allowedFileTypes: ['image/*']
  }
})
.use(AwsS3, {
  limit: 2,
  timeout: ms('1 minute'),
  host: 'https://s3-presign-api.herokuapp.com',
  serverUrl: 'https://s3-presign-api.herokuapp.com'
})

uppy.on('upload-success', (file, data) => {
  console.log(data.location)
  file.meta['key'] // the S3 object key of the uploaded file
})

class UppyDashboardComponent extends Component {

	render(){

		return (
      <Dashboard 
      uppy={uppy} 
      inline={false}
      trigger= '.uppy_opener'
      target= 'body'
      replaceTargetContent= {false}
      showProgressDetails= {true}
      note= 'Images only, 1 file, up to 4 MB'

      metaFields = {[
      { id: 'name', name: 'Name', placeholder: 'file name' },
      { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
      ]}

      />)

	}

}

export default UppyDashboardComponent