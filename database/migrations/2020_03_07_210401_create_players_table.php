<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('players', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->smallInteger('team_id');
            $table->string('firstName',100);
            $table->string('lastName',100);
            $table->string('image',255)->nullable();
            $table->string('country',50)->nullable();
            $table->smallInteger('jerseyNumber')->nullable();
            $table->smallInteger('matchesPlayed')->nullable();
            $table->smallInteger('totalsRunScored')->nullable();
            $table->smallInteger('highestScore')->nullable();
            $table->smallInteger('fifties')->nullable();
            $table->smallInteger('hundreds')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('players');
    }
}
