<?php

namespace Database\Seeders;

use App\Models\Internship;
use App\Models\User;
use Illuminate\Database\Seeder;

class StudentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * Demo student
         */
        $demo = User::create([
            'first_name' => 'Students',
            'last_name' => 'Demo',
            'role' => 'student',
            'email' => 'student@pfeinsight.com',
            'password' => bcrypt('password')
        ]);

        User::factory()->times(50)->student()->create();
        foreach (User::where('role', 'student')->get() as $u) {
            $u->profile()->create([
                'internship_id' => Internship::factory()->create()->id
            ]);
        }
    }
}
