import React, { Component } from 'react'

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
  'java',
  'c#'

]

class FilterGrads extends Component {
  constructor (props) {
    super(props)
    this.state = { selectedSkills: [], relocate: false, nameOfGrad: null }
  }

  handleSkillSelect (event) {
    this.setState({ selectedSkills: event.target.value })
    this.props.filterArray(this.state.relocate, event.target.value)
  }

  handleRelocate (event) {
    this.setState({ relocate: event.target.checked })
    this.props.filterArray(event.target.checked, this.state.selectedSkills)
  }

  componentWillReceiveProps (nextProps) {
    const {filterEnabled} = this.props
    if (filterEnabled !== nextProps.filterEnabled && nextProps.filterEnabled === false) {
      this.state.selectedSkills = []
      this.state.relocate = false
    }
  }

  render () {
    return (

      <form style={{display: 'block'}}>

        <FormControl>

          <Typography>Skills</Typography>
          <Select
            name='skills'
            multiple
            value={this.state.selectedSkills}
            onChange={(event) => { this.handleSkillSelect(event) }}
            input={<Input id='select-multiple-chip' />}
            renderValue={selected => (
              <div style={{display: 'flex', flexWrap: 'wrap', maxHeight: '40px'}}>
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

        <Divider />

        <FormControlLabel
          onChange={(event) => { this.handleRelocate(event) }}
          style={{marginTop: '.5rem'}}
          control={
            <Switch
              name='relocate'
              checked={this.state.relocate}
              // onChange={input.onChange}
              // value={input.value.toString()}
              color='default'
            />}
          label='willing to relocate'
        />

        <Divider />

      </form>
    )
  }
}

export default FilterGrads
