import React, { Component } from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

function ProfileMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="profile-icon">
            <DeleteIcon onClick={handleClick}/>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
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

    render() {
        return (
            <div className="header-container">
                <p className="header-text">Image Viewer</p>
                { this.state.loggedIn &&
                    <div>
                        <ProfileMenu/>
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