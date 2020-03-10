import React ,{Component} from 'react' ;
import { Link } from 'react-router-dom';
import API from './api';

class teamsList  extends Component{
    constructor(){
     super();
     this.state={
       teamsList :[]
     };
     this.deleteTeam = this.deleteTeam.bind(this);
   }
    
    async deleteTeam(id){
        let currentTeams = this.state.teamsList;
        
        let updatedTeams = currentTeams.filter(team=>team.id!==id);
        await this.deleteCall(id);
        this.setState({
            'teamsList':updatedTeams
        });
        console.log(this.state.teamsList);
        
    }
    
    async deleteCall(id){
        return API.delete('teams/'+id,{
                headers: {
                  'content-type': 'multipart/form-data',
                  'X-CSRF-TOKEN':csrf_token
                }
            });
    }
    async componentDidMount(){
        try{
            const list = await this.loadList();
            //console.log(list);
            this.setState({
                'teamsList':list.data
            });
           
        }catch(error){
            console.log(error.response);
        }
    }
    async loadList(){
        return API.get('teams',{
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN':csrf_token
        }
      });
    }
    render(){
    let teamRow = this.state.teamsList.map((el, i) => (
            <tr key={i}>
                 <td>{i+1}</td>
                 <td><img src={'/teams/'+el.logo}/></td>
                 <td>
                   <Link to={'/players/'+el.id}>{el.name}</Link>
                 </td>
                 <td>{el.state}</td>
                 <td>
                   <Link to={'/team/edit/'+el.id}>Edit</Link>
                 </td>
                 <td>
                   <Link onClick={()=>{this.deleteTeam(el.id)}}>Delete</Link>
                 </td>
               </tr>
        ));
    return(
          <React.Fragment>
          <table className="table table-bordered m-top-100 m-btm-100">
            <tr>
              <th>Sr.</th>
              <th>Logo</th>
              <th>Name</th>
              <th>Club</th>
              <th colspan='2'>Action</th>
            </tr>
             {teamRow}
           
            <tr>
              <td colSpan="3"></td>
              <td><Link to="/team/add"><button className="btn btn-primary">Add Team</button></Link></td>
            </tr>
          </table>
          </React.Fragment>
    
     );
    };
    
};

export default teamsList;