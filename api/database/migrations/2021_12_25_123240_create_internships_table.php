<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInternshipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('internships', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->unsignedBigInteger('supervisor_id')->nullable();

            $table->string('title');
            $table->longText('description')->nullable();

            $table->string('supervisor_name')->nullable();
            $table->string('supervisor_phone')->nullable();

            $table->string('draft_report')->nullable();
            $table->string('final_report')->nullable();

            $table->boolean('valid_soutenance')->default(false);
            $table->string('score')->nullable();
            $table->longText('feedback')->nullable();

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
        Schema::dropIfExists('internships');
    }
}
