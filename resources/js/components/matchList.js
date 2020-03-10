import React,{Component} from 'react' ;
import { Link } from 'react-router-dom';
import API from './api';
class matchList extends Component{
    constructor(){
     super();
     this.state={
       matchList :[]
     };
   }
    
    
    async componentDidMount(){
        try{
            const match = await this.loadList();
            this.setState({
                'matchList':match.data.data
            });
        }catch(error){
            console.log(error.response);
        }
    }
    async loadList(){
        return API.get('/matches/',{
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN':csrf_token
        }
      });
    }
   render(){
       let matchRow = '';
        if(Array.isArray(this.state.matchList) && this.state.matchList.length>0 ){
        matchRow = this.state.matchList.map((el, i) => (
                
            <tr key={i}>
                 <td>{i+1}</td>
                 <td>{el.teamFirst}</td>
                 <td>{el.teamTwo}</td>
                 <td>{el.teamWinner}</td>
                 <td>{el.matchPoints}</td>
               </tr>
        ));
      }
      return(
        <React.Fragment>
          
          <div class="row ">
            <div class="col-md-12 m-top-100"><h1>Teams Name</h1></div>
          </div><br />
        <table className="table table-bordered   m-btm-100">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Winner</th>
            <th>Points</th>
          </tr>
          </thead>
          <tbody>
          {matchRow}
          </tbody>
        </table>
        </React.Fragment>
   );
   } 
};

export default matchList;