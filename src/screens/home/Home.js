
import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';

//ENDPOINT ONE
const MEDIAID_EP= "https://graph.instagram.com/me/media?fields=id,caption&access_token=YourAccessToken";
const DETAILS_EP ="https://graph.instagram.com/MediaID?fields=id,media_type,media_url,username,timestamp&access_token=YourAccessToken";


class Home extends Component {
    
    constructor() {
        super();
        this.state = {
            searchText:"",
            authToken: sessionStorage.getItem("access-token"),
            mediaContent:{}
        }
    }
    
    componentDidMount() {
        if (this.state.authToken === null ){
            this.props.history.push('/');
        } else {
            this.getImages("");
        }
    }

    getImages=(filter) => {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let allMedia = JSON.parse(this.responseText);
                let media = allMedia.data.map( (media, index, array)=> {
                    if (media.caption.toUpperCase().includes(filter.toUpperCase())) {
                        return media;
                    } 

                    return null;
                });
                console.log(allMedia);
                that.setState({
                    mediaContent : allMedia
                });
            }
        });
        var url = MEDIAID_EP.replace(/YourAccessToken/g,this.state.authToken);
        xhr.open("GET", url);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);

    }

    searchHandler = (text) => {
        this.getImages(text);
    }

    render() {
        return (
            <div>
                <Header searchHandler={this.searchHandler} {...this.props}/>
                {this.state.someText}
            </div>
        )
    }
}

export default Home;


