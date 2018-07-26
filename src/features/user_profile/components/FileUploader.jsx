import React, { Component } from "react"
import { Dashboard } from '@uppy/react'
import { DashboardModal } from '@uppy/react'
const Uppy = require('@uppy/core')
const AwsS3 = require('@uppy/aws-s3')
const ms = require('ms')

class UppyDashboardComponent extends Component {

  constructor(props){

    super(props)

    this.uppy = Uppy({
      debug: true,
      autoProceed: false,
      restrictions: {
        maxFileSize: 4000000,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: this.props.resume? ['application/*', 'image/*'] : ['image/*']
      }
    })
    .use(AwsS3, {
      limit: 2,
      timeout: ms('1 minute'),
      host: 'https://s3-presign-api.herokuapp.com',
      serverUrl: 'https://s3-presign-api.herokuapp.com'
    })
      
    this.uppy.on('upload-success', (file, data) => {
      //file.meta['key'] // the S3 object key of the uploaded file

      var userId = this.props.user._id
      if(this.props.avatar){
        this.props.updateUser(userId, { avatar: data.location })
      }

      if(this.props.resume){
        this.props.updateUser(userId, { resume: data.location })  
      }

      this.uppy.close()
      
    })
  }

	render(){

    const {resume, avatar} = this.props
    console.log(this)
		return (
      <DashboardModal
      uppy={this.uppy} 
      inline={false}
      trigger= {resume? '.uppy_opener_resume' : '.uppy_opener_avatar'}
      inline={false}
      // target= {}
      // replaceTargetContent= {true}
      showProgressDetails= {true}
      note= 'Images only, 1 file, up to 4 MB'
      closeModalOnClickOutside={true}
      disablePageScrollWhenModalOpen={false}
      metaFields = {[
      { id: 'name', name: 'Name', placeholder: 'file name' },
      { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
      ]}

      />)

	}

}

export default UppyDashboardComponent