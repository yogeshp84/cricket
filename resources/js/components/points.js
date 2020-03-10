import React from 'react' ;
import { Link } from 'react-router-dom';

const pointsTable = ()=>{
      return(
        <React.Fragment>
          
          <div class="row ">
            <div class="col-md-12 m-top-100"><h1>Points Table</h1></div>
          </div><br />
        <table className="table table-bordered   m-btm-100">
        <thead>
            <tr>
                <th>Teams</th>
                <th>Won</th>
                <th>Pts</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                   <td>teamsName</td> 
                   <td>wins</td> 
                   <td>pts</td> 
                </tr>
            </tbody>
        </table>
        </React.Fragment>
   );
    
}

export default pointsTable;