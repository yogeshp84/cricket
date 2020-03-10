import React,{Component} from 'react' ;
import { Link } from 'react-router-dom';
import API from './api';

class playersList extends Component{
    constructor(){
     super();
     this.state={
       playersList :[]
     };
     this.deletePlayer = this.deletePlayer.bind(this);
   }
    
    async deletePlayer(id){
        let currentPlayers = this.state.playersList;
        
        let updatedPlayer = currentPlayers.filter(player=>player.id!==id);
        await this.deleteCall(id);
        this.setState({
            'playersList':updatedPlayer
        });
        //console.log(this.state.playersList);
        
    }
    
    async deleteCall(id){
        return API.delete('player/'+id,{
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
                'playersList':list.data
            });
           
        }catch(error){
            console.log(error.response);
        }
    }
    async loadList(){
       let param =window.location.pathname.split('/');
        return API.get('/players/'+param[param.length-1],{
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN':csrf_token
        }
      });
    }
   render(){
       let playerRow = this.state.playersList.map((el, i) => (
            <tr key={i}>
                 <td>{i+1}</td>
                 <td><img height="100" width="100" src={'http://127.0.0.1:8000/storage/players/'+el.image}/></td>
                 <td>{el.lastName+' '+el.firstName}</td>
                 <td>
                   <Link to={'/player/edit/'+el.id}>Edit</Link>
                 </td>
                 <td>
                   <Link onClick={()=>{this.deletePlayer(el.id)}}>Delete</Link>
                 </td>
               </tr>
        ));
      return(
        <React.Fragment>
          
          <div class="row ">
            <div class="col-md-12 m-top-100"><h1>Teams Name</h1></div>
          </div><br />
        <table className="table table-bordered   m-btm-100">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Image</th>
            <th>Name</th>
            <th colspan="2">Action</th>
          </tr>
          </thead>
          <tbody>
          {playerRow}
          <tr>
            <td colSpan="4"></td>
            <td><Link to ="/player/add"><button className="btn btn-primary">Add Player</button></Link></td>
          </tr>
          </tbody>
        </table>
        </React.Fragment>
   );
   } 
};

export default playersList;