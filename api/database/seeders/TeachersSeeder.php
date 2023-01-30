<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class TeachersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * Demo teacher
         */
        User::create([
            'first_name' => 'Teacher',
            'last_name' => 'Demo',
            'role' => 'professor',
            'email' => 'teacher@pfeinsight.com',
            'password' => bcrypt('password')
        ]);

        User::factory()->times(20)->professor()->create();
    }
}
