import React , {Component} from 'react';

class NavBar extends Component{
    render(){
        return(
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a
                    className="navbar-brand col-sm-3 col-md-2 mr-0"
                    href="#"
                    rel="noopener noreferrer"
                >
                    BlockChain Social Network
                </a>
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                    <small id="account">{this.props.account}</small>
                </li>
            </nav>
        );
    }
}

export default NavBar;
