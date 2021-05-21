import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

    constructor() {
        super();
    }
    render() {
        return (
            <div className="header-container">
                <p className="header-text">Image Viewer</p>
            </div>
        )
    }
}

export default Header;