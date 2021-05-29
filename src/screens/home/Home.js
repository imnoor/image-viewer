
import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { mediaData, imagesData } from '../../assets/data/Data';
import ImagePost from '../../common/imagepost/ImagePost';

//ENDPOINT ONE
const MEDIAID_EP = "https://graph.instagram.com/me/media?fields=id,caption&access_token=YourAccessToken";
const DETAILS_EP = "https://graph.instagram.com/MediaID?fields=id,media_type,media_url,username,timestamp&access_token=YourAccessToken";


class Home extends Component {

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
        } else {
            this.getImages("");
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

    searchHandler = (text) => {
        let media = mediaData.data.filter((media) => {
            if (media.caption.toUpperCase().includes(text.toUpperCase())) {
                return media;
            }
            return null;
        });
        this.setState({
            mediaContent: media
        });
    }

    render() {
        return (
            <div>
                <Header searchHandler={this.searchHandler} {...this.props} page="Home" imageSource={this.state.profilePic}/>
                <div className="image-area">
                    {this.state.mediaContent.map((item, index) => {
                        let imgData = imagesData[item.id];
                        return <ImagePost key={index} imageId={item.id} timeStamp={imgData.timestamp} userName={imgData.username} url={imgData.media_url} caption={item.caption} profilePic={this.state.profilePic}
                        />
                    })}
                </div>
            </div>
        )
    }
}

export default Home;


