import React, { Component } from "react"
import { FormField, TextArea, RadioSelect, DatePicker} from "../forms/FormFields.jsx"

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import Switch from '@material-ui/core/Switch'



const skills = [

    'html',
    'css',
    'javascript',
    'python',
    'c',
    'r',
    'java',
    'sdd',
    'rtta',
    'asdf',
    'sdfasd',
    'safds',
    'adadfd',
    'asdsdafd',
    'dfsadf',
    'dafds',
    'sdfsda',
    'sdfasd',
    'sdfdf',
    'sdfasdf',
    'sdfadsf'

]


class FilterGrads extends Component {

    constructor(props) {

        super(props)
        this.state = { selectedSkills: [], relocate: false }
    
    }

    handleSkillSelect(event){

        this.setState({ selectedSkills: event.target.value })
        this.props.filterArray(this.state.relocate, event.target.value)
      
    }

    handleRelocate(event){
        this.setState({ relocate: event.target.checked})
        this.props.filterArray(event.target.checked, this.state.selectedSkills)
        
    }

    clearForm(){
        this.setState({ relocate: false, selectedSkills: []})
        this.props.unFilter()
    }

    // formChange(event){

    //     var filtered = []
        
    //     this.props.grads.map((grad) => {

    //         if(this.state.relocate === grad.willingnessToRelocate){

    //             if(this.state.selectedSkills && this.state.selectedSkills.length){

    //                 let found = arr1.some(r=> arr2.indexOf(r) >= 0)

    //                 if(found){
    //                     return filtered.push(grad)
    //                 }
    //                 else{
    //                     return
    //                 }

    //             }

    //             filtered.push(grad)
               
    //         }   

    //     })

    //     console.log('shit', filtered)
        
    // }

    render() {
        
        return (

            <form>

                <FormControl>

                    <Typography>Skills</Typography>
                    <Select
                        name="skills"
                        multiple
                        value={this.state.selectedSkills}
                        onChange={(event)=>{this.handleSkillSelect(event)}}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div style={{maxWidth: '160px'}}>
                                {selected.map(value => <Chip key={value} label={value} />)}
                            </div>
                        )}
                        
                    >
                        {skills.map(skill => (
                        <MenuItem
                            key={skill}
                            value={skill}
                        >
                            {skill}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl> 


                <FormControlLabel
                    onChange={(event)=>{this.handleRelocate(event)}}
                    style={{marginTop: '2rem'}}
                    control={
                        <Switch
                            name="relocate"
                            checked={this.state.relocate}
                            // onChange={input.onChange}
                            // value={input.value.toString()}
                            color="default"
                        />}
                    label="willing to relocate"
                    />

                {this.state.relocate || this.state.selectedSkills.length? 
                <Button 
                    onClick={(e)=>{
                        e.preventDefault()
                        this.clearForm()
                    }} 
                    variant="outlined" 
                    size="small">
                    clear
                </Button> : null }

            </form>
        )
    }
}

export default FilterGrads