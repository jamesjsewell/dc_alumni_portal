import React, { Component } from "react"

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
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'

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
        this.state = { selectedSkills: [] }
    
    }

    handleSkillSelect(event){

        this.setState({ selectedSkills: event.target.value })
      
    }

    render() {
        
        return (

            <form>

                <FormControl>

                    <Typography>Filter</Typography>

                    <Select
                        multiple
                        value={this.state.selectedSkills}
                        onChange={(event)=>{this.handleSkillSelect(event)}}
                        input={<Input name="skills" id="select-multiple-chip" />}
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
                

            </form>
        )
    }
}

export default FilterGrads