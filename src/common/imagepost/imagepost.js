
import React, { Component } from 'react';
import './imagepost.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

// hardcoded the credentials to check as per requiremnt.
class ImagePost extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            mediaType: "",
            timeStapm: "dispNone",
            userName: "",
            url: "",
            comment: ""
        }
    }
    inputCommentChangeHandler = (e) => {
        this.setState({ comment: e.target.value });
    }

    addCommentClickHandler = () => {

    }

    render() {
        return (
            <Card className="root">
                <CardHeader />
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
                />
                <CardContent>

                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    </CardContent>
                </Collapse>
            </Card>
        )
    }
}

export default ImagePost;


