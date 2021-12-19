<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        User::create([
            'first_name' => 'admin',
            'last_name' => 'pfe',
            'role' => 'admin',
            'email' => 'admin@pfeinsight.com',
            'password' => bcrypt('password')
        ]);
    }
}
