import React, {Component} from 'react' ;
import API from './api';

 class teamAdd extends Component{
   constructor(){
     super();
     this.state={
       teamName:'',
       logo:null,
       state:'',
       isError:false,
       errorMessage:'',
       isSuccess:false
       
     };
     this.onSubmiHandler = this.onSubmiHandler.bind(this);
     this.fileChange = this.fileChange.bind(this);
     this.addTeam = this.addTeam.bind(this);
     this.teamNameChange = this.teamNameChange.bind(this);
     this.stateChangeHandler = this.stateChangeHandler.bind(this);
   }
   async onSubmiHandler(e){
      e.preventDefault();
      try{
          
           const {res} = await this.addTeam(this.state);
           this.setState({
                'isError':false,
                'isSuccess':true
                
          });
        }catch (error) {
            this.setState({
                'isError':true,
                'errorMessage':error.response.data.message,
                'isSuccess':false
            });
        }
   }
   async addTeam(stateData){
      const formdata = new FormData();
      formdata.append('logo',stateData.logo);
      formdata.append('team_name',stateData.teamName);
      formdata.append('state',stateData.state);

      return API.post('teams',formdata,{
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN':csrf_token
        }
      });

   }
   fileChange(e){
      this.setState({'logo':e.target.files[0]});
   }
   teamNameChange(e){
      this.setState({'teamName':e.target.value});
   }
   stateChangeHandler(e){
      this.setState({'state':e.target.value}); 
    }
   
   render(){
        let msgDiv='';

        if (this.state.isError) {
          msgDiv = <div className="alert alert-warning">{this.state.errorMessage}</div>;
        } 
        if (this.state.isSuccess){
          msgDiv = <div className="alert alert-success">Team updated Succesfully</div>;
        }
    return(
          <React.Fragment>
            <h3>Add Team</h3>
            {msgDiv}
          <form onSubmit={this.onSubmiHandler}>
              
              <div className="form-group">
                <label for="team_name">Team Name</label>
                <input required type="text" name="team_name" onChange={this.teamNameChange} className="form-control" id="team_name" placeholder="Enter Team Name"/>
              </div>
              <div className="form-group">
                <label for="logo_uri">Logo Uri</label>
                <input required type="file" onChange={this.fileChange}   name="logo_uri" className="form-control-file" id="logo_uri"/>
              </div>
              <div className="form-group">
                <label className="form-label" for="state" >State</label>
                <select name="state" onChange={this.stateChangeHandler}  className="form-control" id="state">
                    <option value="">Select State</option>
                    <option>Haryana</option>
                    <option>Punjab</option>
                    <option>Rajasthan</option>
                    <option>Kerala</option>
                    <option>Uttar Pardesh</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </React.Fragment>
    
     );
    }
}

export default teamAdd;