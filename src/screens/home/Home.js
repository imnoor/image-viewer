
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
            someText:"Am Home!",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }
    
    componentWillMount() {
        if (this.state.loggedIn === false ){
            this.props.history.push('/');
        }
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    upcomingMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        xhr.open("GET", this.props.baseUrl + "movies?status=PUBLISHED");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);


        let dataReleased = null;
        let xhrReleased = new XMLHttpRequest();
        xhrReleased.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    releasedMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        xhrReleased.open("GET", this.props.baseUrl + "movies?status=RELEASED");
        xhrReleased.setRequestHeader("Cache-Control", "no-cache");
        xhrReleased.send(dataReleased);
    }

    searchHandler = (text) => {
        alert (text);
    }

    render() {
        return (
            <div>
                <Header searchHandler={this.searchHandler}/>
                {this.state.someText}
            </div>
        )
    }
}

export default Home;


