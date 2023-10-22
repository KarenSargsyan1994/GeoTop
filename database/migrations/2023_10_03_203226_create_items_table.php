<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('city', 256);
            $table->string('code', 265);
            $table->bigInteger('phone');
            $table->string('description', 2000);
            $table->string('building', 256);
            $table->string('date', 256);
            $table->string('street', 256);
            $table->bigInteger('roomCount');
            $table->bigInteger('price');
            $table->bigInteger('area');
            $table->string('type',256);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
