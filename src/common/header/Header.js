import React, { Component } from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';

class Header extends Component {

    constructor() {
        super();
        this.state = {
            search: "",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    inputSearchChangeHandler = (e) => {
        this.setState({ search: e.target.value });
        this.props.searchHandler(e.target.value);
    }

    render() {
        return (
            <div className="header-container">
                <p className="header-text">Image Viewer</p>
                { this.state.loggedIn &&
                    <div className="search-bar">
                        <SearchIcon />
                        <Input id="searchbox"  placeholder="Search" type="text" username={this.state.search} onChange={this.inputSearchChangeHandler} />
                    </div>
                }
            </div>
        )
    }
}

export default Header;