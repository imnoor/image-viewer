
import React, { Component } from 'react';
import './Profile.css';
import Header from '../../common/header/Header';
import { mediaData, imagesData } from '../../assets/data/Data';
import ImagePost from '../../common/imagepost/ImagePost';
import { Button, GridList, GridListTile } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

//ENDPOINT ONE
const MEDIAID_EP = "https://graph.instagram.com/me/media?fields=id,caption&access_token=YourAccessToken";

//const DETAILS_EP = "https://graph.instagram.com/MediaID?fields=id,media_type,media_url,username,timestamp&access_token=YourAccessToken";


class Profile extends Component {

    constructor() {
        super();
        this.state = {
            searchText: "",
            authToken: sessionStorage.getItem("access-token"),
            mediaContent: mediaData.data,
            images: imagesData,
            userName: mediaData.user_name,
            profilePic: 'https://raw.githubusercontent.com/imnoor/image-viewer/master/src/assets/profilebig.png',
            count: mediaData.count,
            follows: mediaData.count,
            followedBy: mediaData.count,
            fullName: mediaData.full_name,
            dlgOpen: false,
            fullNameReqd: "dispNone",
            tmpFullName: mediaData.full_name,
        }
    }

    componentDidMount() {
        if (this.state.authToken === null) {
            this.props.history.push('/');
        }
    }


    //use this to populate data once API errors are fixed.
    getData = () => {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let allMedia = JSON.parse(this.responseText);
                //Because of errors using mock data.
                that.setState({
                    mediaContent: allMedia
                });
            }
        });
        var url = MEDIAID_EP.replace(/YourAccessToken/g, this.state.authToken);
        xhr.open("GET", url);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);

    }

    editClickHandler = () => {
        this.setState({ dlgOpen: true });
    }

    dlgCloseHandler = () => {
        this.setState({ dlgOpen: false });
    }

    inputFullNameChanged = (e) => {
        this.setState({ tmpFullName: e.target.value });
    }

    editFullNameHandler = () => {
        this.state.tmpFullName === "" ? this.setState({ fullNameReqd: "dispBlock" }) : this.setState({ fullNameReqd: "dispNone" });
        if (this.state.tmpFullName !== "") {
            this.setState({ fullName: this.state.tmpFullName, dlgOpen: false });
        }
    }

    render() {
        return (
            <div>
                <Header searchHandler={null} {...this.props} page="Profile" imageSource={this.state.profilePic} />
                <div className="profileArea">
                    <div><img className="profileImage" src={this.state.profilePic} /></div>
                    <div className="profileDetails">
                        <p className="userNameText">{this.state.userName}</p>
                        <p className="userStatsText">Posts: {this.state.posts} Follows: {this.state.follows} Followed By: {this.state.followedBy}</p>
                        <p className="userFullNameText">{this.state.fullName} <Button variant="fab" color="secondary" onClick={this.editClickHandler} >
                            <Fab style={{ width: "35px", height: "30px" }} color="secondary" aria-label="edit">
                                <EditIcon />
                            </Fab>
                        </Button></p>

                    </div>
                    <Dialog open={this.state.dlgOpen} onClose={this.dlgCloseHandler}>
                        <DialogTitle>{"Edit"}</DialogTitle>
                        <DialogContent>
                            <FormControl required>
                                <InputLabel htmlFor="fullNameEdit">Full Name</InputLabel>
                                <Input id="fullNameEdit" type="text" fullNameEdit={this.state.tmpFullName} onChange={this.inputFullNameChanged} />
                                <FormHelperText className={this.state.fullNameReqd}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.editFullNameHandler}>UPDATE</Button>
                        </DialogContent>
                    </Dialog>

                </div>
                <div className="gridArea">
                <GridList cellHeight={160} className="gridList" cols={3}>
                    {this.state.mediaContent.map((item, index) => {
                        let imgData = imagesData[item.id];
                        return <GridListTile key={imgData.media_url} cols={1}>
                            <img src={imgData.media_url} alt={item.capti} />
                        </GridListTile>
                    })}
                </GridList>
                </div>
            </div>
        )
    }
}

export default Profile;


