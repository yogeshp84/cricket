import React from 'react';
import { useHistory, BrowserRouter, Route, Switch } from 'react-router-dom'
import PrimaryHeader from './header';
import TeamsList from './teamList';
import MatchList from './matchList';
import PlayersList from './playersList';
import PlayerAdd from './playerAdd';
import PlayerEdit from './playerEdit';
import PointsTable from './points';
import TeamAdd from './teamAdd';
//import './App.css';
import TeamEdit from './teamEdit';

function App() {
  return (
    <BrowserRouter histoty={useHistory}>
    <div className="container Container-fluid">
      <header>
        <PrimaryHeader/>
      </header>
      
        <switch>
          <Route exact path="/" component={TeamsList}/>
          <Route exact path="/players/:id" component={PlayersList}/>
          <Route exact path="/player/edit/:id" component={PlayerEdit}/>
          <Route exact path="/player/add" component={PlayerAdd}/>
          <Route exact path="/team/edit/:id" component={TeamEdit} />
          <Route exact path="/team/add" component={TeamAdd}/>
          <Route exact path="/matches" component={MatchList}/>
        </switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
