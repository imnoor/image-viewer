
import React, { Component } from 'react';
import './Profile.css';
import Header from '../../common/header/Header';
import { mediaData, imagesData } from '../../assets/data/Data';
import ImagePost from '../../common/imagepost/ImagePost';

//ENDPOINT ONE
const MEDIAID_EP = "https://graph.instagram.com/me/media?fields=id,caption&access_token=YourAccessToken";
const DETAILS_EP = "https://graph.instagram.com/MediaID?fields=id,media_type,media_url,username,timestamp&access_token=YourAccessToken";


class Profile extends Component {

    constructor() {
        super();
        this.state = {
            searchText: "",
            authToken: sessionStorage.getItem("access-token"),
            mediaContent: mediaData.data,
            profilePic : mediaData.profile_picture
        }
    }

    componentDidMount() {
        if (this.state.authToken === null) {
            this.props.history.push('/');
        } 
    }

    getImages = (filter) => {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let allMedia = JSON.parse(this.responseText);
                //Because of errors using mock data.
                let media = mediaData.data.filter((media) => {
                    if (media.caption.toUpperCase().includes(filter.toUpperCase())) {
                        return media;
                    }

                    return null;
                });
                console.log(allMedia);
                that.setState({
                    mediaContent: media
                });
            }
        });
        var url = MEDIAID_EP.replace(/YourAccessToken/g, this.state.authToken);
        xhr.open("GET", url);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);

    }


    render() {
        return (
            <div>
                <Header searchHandler={null} {...this.props} imageSource={this.state.profilePic}/>
                <div>
                    Profile Draft
                </div>
            </div>
        )
    }
}

export default Profile;


