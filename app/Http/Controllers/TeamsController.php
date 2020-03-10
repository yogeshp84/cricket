<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Team;
use App\Matches;
use App\Http\Resources\MyCollection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
class TeamsController extends Controller
{
    
   
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $teams =   Team::All();
        return response()->json($teams);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function matches()
    {
            $matches['data'] = DB::table('teams as t1')
            ->join('matches', 't1.id', '=', 'matches.team1')
            ->join('teams', 'teams.id', '=', 'matches.team2')
            ->join('teams as tw', 'tw.id', '=', 'matches.winner')
            ->select(DB::raw('DATE_FORMAT(matches.matchDate, "%b %d, %Y") as matchDate'),'t1.name as teamFirst', 'teams.name as teamTwo','tw.name as teamWinner','matches.points as matchPoints')
            ->get();
            //dd($matches);
            return response()->json($matches);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //validate form data
        $this->_validateForm($request);
        //upload file
        $filename = $this->_uploadFile($request);
        //store teams
        $team = new Team([
        'name' => $request->post('team_name'),
        'logo' => $filename,
        'state' => $request->post('state')
      ]);

      $team->save();

      return response()->json('success');
        
    }
    
    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $teams =   Team::find($id);
        return response()->json($teams);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //dd($request->file('logo'));
      
      
      $team = Team::find($id);
      //validate form data
      $this->_validateForm($request,false);
      $team->name = $request->post('team_name');
      $team->state = $request->post('state');
      //upload file
      
      if($request->file('logo')!=''){
        $team->logo = $this->_uploadFile($request);
      }
        //store teams
       $team->update();

      return response()->json('success');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $team = Team::find($id);

      $team->delete();

      return response()->json('success');
      //unlink image as well later
    }
    
    private function _validateForm(Request $request,$fileValid=TRUE){
            
            $rules = [
                'team_name'=>'required|min:3|max:255',
                'state'=>'required|min:3|max:255',
            ];
            
            if($fileValid){
                $rules['logo']  = 'required|mimes:png,jpg,jpeg,gif|max:2048';
            }
        return $request->validate($rules);

    }
    private function _uploadFile(Request $request){
        $uploadedFile = $request->file('logo');
        $filename = time().$uploadedFile->getClientOriginalName();

        Storage::disk('local')->putFileAs(
          'public/teams/',
          $uploadedFile,
          $filename
        );
        return $filename;
    }
    
}
