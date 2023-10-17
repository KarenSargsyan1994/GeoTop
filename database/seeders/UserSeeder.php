<?php

namespace Database\Seeders;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'Vahe2023',
                'email' =>'test@mail.ru',
                'password'=>'$2y$10$/REtHvaE7veYMq2Pyce5UelYpjVyfMRT78THQkSYmEWsxRF3uSdfC',
                'email_verified_at' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
