import React, { Component } from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Image } from '@material-ui/icons';

function ProfileMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfile = () => {
        setAnchorEl(null);
        props.profileHandler();
    };

    const handleLogout = () => {
        setAnchorEl(null);
        props.logoutHandler();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="profile-icon">
            <IconButton onClick={handleClick} className="tinyLogo">
                <img className="tinyLogo" src={props.imageSource} />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}


class Header extends Component {

    constructor() {
        super();
        this.state = {
            search: "",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            profilePic: "",
        }
    }

    inputSearchChangeHandler = (e) => {
        this.setState({ search: e.target.value });
        this.props.searchHandler(e.target.value);
    }

    profileHandler = () => {
        this.props.history.push('/profile');
    }

    logoutHandler = () => {
        sessionStorage.removeItem("access-token");
        this.setState({loggedIn:false});
        this.props.history.push('/');
    }


    render() {
        return (
            <div className="header-container">
                <p className="header-text">Image Viewer</p>
                { this.state.loggedIn &&
                    <div>
                        <ProfileMenu imageSource='https://raw.githubusercontent.com/imnoor/image-viewer/master/src/assets/profile.png' profileHandler={this.profileHandler} logoutHandler={this.logoutHandler} />
                        <div className="search-bar">
                            <SearchIcon />
                            <Input id="searchbox" disableUnderline={true} placeholder="Search" type="text" username={this.state.search} onChange={this.inputSearchChangeHandler} />
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Header;