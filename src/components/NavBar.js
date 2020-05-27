import React , {Component} from 'react';
import avatar from '../images/download.png';


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
                <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                    <small className="text-secondary">
                        <small id="account">{this.props.account}</small>
                    </small>
                    {this.props.account ?
                        <img className="ml-2"
                             height="30"
                             width="30"
                             src={avatar} />
                        :<span></span> }
                </li>
                </ul>
            </nav>
        );
    }
}

export default NavBar;
