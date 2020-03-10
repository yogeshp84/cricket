import React, {Component} from 'react' ;
import API from './api';

 class playerAdd extends Component{
   constructor(){
     super();
     this.state={
       'id':'',
       'team_id':'',
       'firstName':'',
       'lastName':'',
       'image':'',
       'country':'',
       'jerseyNumber':'',
       'matchesPlayed':'',
       'totalRunScored':'',
       'highestScore':'',
       'fifties':'',
       'hundreds':'',
       'teamsList':'',
       'isError':false,
       'errorMessage':'',
       'isSuccess':false
     };
     this.onSubmiHandler = this.onSubmiHandler.bind(this);
     this.fileChangeHandler = this.fileChangeHandler.bind(this);
     this.teamChangeHandler = this.teamChangeHandler.bind(this);
     this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
     this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
     this.countryChangeHandler = this.countryChangeHandler.bind(this);
     this.jerseyNumberChangeHandler = this.jerseyNumberChangeHandler.bind(this);
     this.matchesPlayedChangeHandler = this.matchesPlayedChangeHandler.bind(this);
     this.totalsRunScoredChangeHandler = this.totalsRunScoredChangeHandler.bind(this);
     this.highestScoreChangeHandler = this.highestScoreChangeHandler.bind(this);
     this.hundredsChangeHandler = this.hundredsChangeHandler.bind(this);
     this.fiftiesChangeHandler = this.fiftiesChangeHandler.bind(this);
   }
   async componentDidMount(){
        try{
            const playerData = await this.loadData();
            const player = playerData.data.player; 
            this.setState({
                'team_id':player.team_id,
                'firstName':player.firstName,
                'lastName':player.lastName,
                'image':player.image,
                'country':player.country,
                'jerseyNumber':player.jerseyNumber,
                'matchesPlayed':player.matchesPlayed,
                'totalsRunScored':player.lastName,
                'highestScore':player.highestScore,
                'fifties':player.fifties,
                'hundreds':player.hundreds,
                'teamsList':playerData.data.teamList,
                'isError':false,
                'errorMessage':'',
                'isSuccess':false
            });
           
        }catch(error){
            console.log(error.response);
        }
    }
   async loadData(){
       let param =window.location.pathname.split('/');
        return API.get('/player/edit/'+param[param.length-1],{
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN':csrf_token
        }
      });
    }
   async onSubmiHandler(e){
      e.preventDefault();
      try{
          
           const {res} = await this.addPlayer(this.state);
           this.setState({
                'isError':false,
                'isSuccess':true
                
          });
          this.props.history.push("/players/"+this.state.team_id);
        }catch (error) {
            this.setState({
                'isError':true,
                'errorMessage':error.response.data.message,
                'isSuccess':false
            });
        }
   }
   async addPlayer(stateData){
       const formdata = new FormData();
      formdata.append('team_id',stateData. team_id );
      formdata.append('firstName',stateData.firstName);
      formdata.append('lastName',stateData.lastName);
      formdata.append('image',stateData.image);
      formdata.append('country',stateData.country);
      formdata.append('jerseyNumber',stateData.jerseyNumber);
      formdata.append('matchesPlayed',stateData.matchesPlayed);
      formdata.append('totalsRunScored',stateData.totalRunScored);
      formdata.append('highestScore',stateData.highestScore);
      formdata.append('fifties',stateData.fifties);
      formdata.append('hundreds',stateData.hundreds);
       let param =window.location.pathname.split('/');
  return API.post('players/update/'+param[param.length-1],formdata,{
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN':csrf_token
        }
      });

   }
   fileChangeHandler(e){
      this.setState({'image':e.target.files[0]});
   }
   teamChangeHandler(e){
      this.setState({'team_id':e.target.value});
   }
   firstNameChangeHandler(e){
      this.setState({'firstName':e.target.value}); 
    }
   lastNameChangeHandler(e){
      this.setState({'lastName':e.target.value}); 
    }
   countryChangeHandler(e){
      this.setState({'country':e.target.value}); 
    }
   jerseyNumberChangeHandler(e){
      this.setState({'jerseyNumber':e.target.value}); 
    }
   matchesPlayedChangeHandler(e){
      this.setState({'matchesPlayed':e.target.value}); 
    }
   totalsRunScoredChangeHandler(e){
      this.setState({'totalRun':e.target.value}); 
    }
   highestScoreChangeHandler(e){
      this.setState({'highestScore':e.target.value}); 
    }
   fiftiesChangeHandler(e){
      this.setState({'fifties':e.target.value}); 
    }
   hundredsChangeHandler(e){
      this.setState({'hundreds':e.target.value}); 
    }
   
   render(){
        let msgDiv='';
        let teamsdd = '';

        if (this.state.isError) {
          msgDiv = <div className="alert alert-warning">{this.state.errorMessage}</div>;
        } 
        if (this.state.isSuccess){
          msgDiv = <div className="alert alert-success">Player added Succesfully</div>;
        }
        if(this.state.teamsList.length>0){
            teamsdd =this.state.teamsList.map((team,i)=>{
                 return <option selected={ this.state.team_id==team.id?'selected':''} key={team.id} value={team.id}>{team.name}</option>;
            });
        }
    return(
          <React.Fragment>
            <h3>Add Player</h3>
            {msgDiv}
          <form name="player-form" onSubmit={this.onSubmiHandler}>
              
              <div className="form-group">
                <label >First Name</label>
                <input required type="text" name="fname" value={this.state.firstName} onChange={this.firstNameChangeHandler} className="form-control"/>
              </div>
              <div className="form-group">
                <label >Last Name</label>
                <input required type="text" name="lname" value={this.state.lastName}  onChange={this.lastNameChangeHandler} className="form-control" />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input  type="file" onChange={this.fileChangeHandler}   name="image" className="form-control-file" />
              </div>
              <div className="form-group">
                <label className="form-label" for="state" >Teams</label>
                <select required name="state"  onChange={this.teamChangeHandler}  className="form-control" id="state">
                    <option value="">Select State</option>
                    {teamsdd}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" for="state" >Country</label>
                <select required name="state" value={this.state.country}  onChange={this.countryChangeHandler}  className="form-control" id="country">
                    <option value="">Select State</option>
                    <option>India</option>
                    <option>Pakistan</option>
                    <option>Australia</option>
                    <option>Westindies</option>
                    <option>Srilanksa</option>
                </select>
              </div>
              <div className="form-group">
                <label >Jersey Number</label>
                <input  type="text" value={this.state.jerseyNumber}  name="jerseyNumber" onChange={this.jerseyNumberChangeHandler} className="form-control" />
              </div>
              <div className="form-group">
                <label >Matches Played</label>
                <input  type="text" value={this.state.matchesPlayed}  name="matchesPlayed" onChange={this.matchesPlayedChangeHandler} className="form-control" />
              </div>
              <div className="form-group">
                <label >Totals Run Scored</label>
                <input  type="text" value={this.state.totalsRunScored}  name="totalsRunScored" onChange={this.totalsRunScoredChangeHandler} className="form-control" />
              </div>
              <div className="form-group">
                <label >Highest Score</label>
                <input  type="text" value={this.state.highest}  name="fifties" onChange={this.highestScoreChangeHandler} className="form-control" />
              </div>
              <div className="form-group">
                <label >Fifties</label>
                <input  type="text" value={this.state.fifties}  name="fifties" onChange={this.fiftiesChangeHandler} className="form-control" />
              </div>
              <div className="form-group">
                <label >Hundreds</label>
                <input  type="text" value={this.state.hundreds}  name="hundreds" onChange={this.hundredsChangeHandler} className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </React.Fragment>
    
     );
    }
}
export default playerAdd;