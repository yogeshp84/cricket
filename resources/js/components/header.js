import React from 'react' ;
import {Link} from 'react-router-dom';

const primaryHeader = ()=>{
    return(
        <React.Fragment>
        <nav className="navbar navbar-expand-sm bg-light">

        <ul className="navbar-nav">
        <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/players/10">Players</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/points-table">Points Table</Link>
        </li>
      </ul>
    
    </nav>
    </React.Fragment>
    
     );
}

export default primaryHeader;