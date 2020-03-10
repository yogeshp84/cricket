<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Player;
use App\Team;

class PlayersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $players =   Player::All();
        return response()->json($players);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($id)
    {
        $players =   Player::where('team_id','=',$id)->get();
        return response()->json($players);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::enableQueryLog();
        //validate form data
        $this->_validateForm($request);
        //upload file
        $filename = $this->_uploadFile($request);
        //store teams
        $player = new Player(array_merge($request->post(),['image'=>$filename]));
        $player->save();
        //dd(DB::getQueryLog());
        return response()->json('success');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $player = Player::find($id);
        $data['player']=$player;
        $data['teamList']=Team::all();
        return response()->json($data);
        
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
        //validate form data
      $this->_validateForm($request,false);
      
      $player =      Player::find($id);
      
      $player->firstName = $request->post('firstName');
      $player->lastName = $request->post('lastName');
      $player->team_id = $request->post('team_id');
      $player->country = $request->post('country');
      $player->jerseyNumber = $request->post('jerseyNumber');
      $player->matchesPlayed = $request->post('matchesPlayed');
      $player->totalsRunScored = $request->post('totalsRunScored');
      $player->highestScore = $request->post('highestScore');
      $player->fifties = $request->post('fifties');
      $player->hundreds = $request->post('hundreds');
      //upload file
      if($request->file('image')){
      $player->image = $this->_uploadFile($request);
      }
        //store teams
       $player->update();

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
        $team = Player::find($id);

        $team->delete();
        //unlink image as well later
    }
    
    private function _validateForm(Request $request,$fileValid=TRUE){
            
            $rules = [
                'team_id'=>'required',
                'firstName'=>'required|min:3|max:255',
            ];
            
            if($fileValid){
                $rules['image']  = 'required|mimes:png,jpg,jpeg,gif|max:2048';
            }
        return $request->validate($rules);

    }
    private function _uploadFile(Request $request){
        $uploadedFile = $request->file('image');
        $filename = time().$uploadedFile->getClientOriginalName();

        Storage::disk('local')->putFileAs(
          'public/players/',
          $uploadedFile,
          $filename
        );
        return $filename;
    }
}
