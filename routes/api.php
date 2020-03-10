<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

    
    Route::get('/teams', 'TeamsController@index');
    Route::get('/teams/{id}', 'TeamsController@edit');
    Route::post('/teams', 'TeamsController@store');
    Route::post('/teams/update/{id}', 'TeamsController@update');
    Route::delete('/teams/{id}', 'TeamsController@destroy');
    
    Route::get('/players', 'PlayersController@index');
    Route::get('/players/{id}', 'PlayersController@create');
    Route::get('/player/edit/{id}', 'PlayersController@edit');
    Route::post('/players/add', 'PlayersController@store');
    Route::post('/players/update/{id}', 'PlayersController@update');
    Route::delete('/player/{id}', 'PlayersController@destroy');
    
    Route::get('matches', 'MatchesController@show');
    
    Route::view('{path?}', 'index');