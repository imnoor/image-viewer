
import React, { Component } from 'react';
import './ImagePost.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';

import { Button } from '@material-ui/core';
import { FavoriteBorder } from '@material-ui/icons';

class ImagePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.imageId,
            timeStamp: this.props.timeStamp,
            userName: this.props.userName,
            url: this.props.url,
            caption: this.props.caption,
            profilePic: this.props.profilePic,
            likes: 2,
            mylike: false,
            allComments: [],
            comment: ""
        }
    }
    inputCommentChangeHandler = (e) => {
        this.setState({ comment: e.target.value });
    }

    addCommentClickHandler = () => {
        if (this.state.comment !== "") {
            this.state.allComments.push(this.state.comment);
            this.state.comment = "";
            this.setState({ comment: "" });
            this.setState(this.state);
        }

    }

    likeClickHandler = () => {
        this.setState({ mylike: !this.state.mylike });
        if (this.state.mylike) {
            this.setState({ likes: this.state.likes - 1 })
        } else {
            this.setState({ likes: this.state.likes + 1 })
        }
    }

    render() {
        return (
            <Card className="image-card">
                <CardHeader
                    avatar={
                        <Avatar alt="Remy Sharp" src={this.state.profilePic} />
                    }
                    title={this.state.userName}
                    subheader={this.state.timeStamp}
                />
                <CardMedia
                    className="media"
                    image={this.state.url}
                    title={this.state.caption}
                />
                <CardContent>
                    <div>{this.state.caption}
                        <div className="hash-tag">#some #tags #for #testing-purpose</div>
                    </div>
                    <div className="like-section">
                        {this.state.mylike &&
                            <IconButton aria-label="Like" onClick={this.likeClickHandler}>
                                <Favorite style={{ color: "red" }} />
                            </IconButton>
                        } 
                        { !this.state.mylike &&
                            <IconButton aria-label="Like" onClick={this.likeClickHandler}>
                                <FavoriteBorder />
                            </IconButton>
                        } 

                        {this.state.likes > 1 &&
                            <p>{this.state.likes} likes</p>

                        }
                        {this.state.likes === 1 &&
                            <p>{this.state.likes} like</p>
                        }
                    </div>
                    <div className="comment-section">
                        {this.state.allComments.map((item, index) => {
                            return <p key={"cmdcm" + index} className="comment-text">{item}</p>
                        })}
                        <div className="comment-box">
                            <FormControl >
                                <InputLabel htmlFor={"commentbox" + this.state.id}>Add a Comment</InputLabel>
                                <Input style={{ width: "450px" }} id={"commentbox" + this.state.id} type="text" commentbox={this.state.comment} onChange={this.inputCommentChangeHandler} />
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={this.addCommentClickHandler}>ADD</Button>
                        </div>
                    </div>
                </CardContent>
            </Card >
        )
    }
}

export default ImagePost;



