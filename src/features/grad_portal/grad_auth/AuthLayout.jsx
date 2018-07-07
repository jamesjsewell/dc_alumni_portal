import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import React from "react"

export const AuthLayout = (props) => {

    var {username, bio} = props
    return(<div>

        <Card>
        {/* <CardMedia
      
          image="/static/images/cards/"
          title=""
        /> */}
            <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                    {username}
                </Typography>
                <Typography component="p">
                    {bio}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>

    </div>)

}