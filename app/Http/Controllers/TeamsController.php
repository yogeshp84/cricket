<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Team;
use App\Http\Resources\MyCollection;
use Illuminate\Support\Facades\Storage;
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
      //validate form data
      $this->_validateForm($request,false);
      
      $team = Team::find($id);
      //dd($team);
      $team->name = $request->post('team_name');
      $team->state = $request->post('state');
      //upload file
      if($request->file('logo')){
      $team->logo = $this->_uploadFile($request);
      }
        //store teams
       $team->update($request->all());

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
