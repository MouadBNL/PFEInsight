<?php

namespace Database\Seeders;

use App\Models\Technology;
use Illuminate\Database\Seeder;

class TechnologiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $techs = [
            [
                'name' => 'Laravel',
            ],
            [
                'name' => 'VueJs',
            ],
            [
                'name' => 'ReactJS',
            ],
            [
                'name' => 'GRANT',
            ],
            [
                'name' => 'TailwindCss',
            ],
            [
                'name' => 'NextJs',
            ],
            [
                'name' => 'Typescript',
            ],
            [
                'name' => 'PHP',
            ],
            [
                'name' => 'BPMN',
            ],
            [
                'name' => 'Arduino',
            ],
            [
                'name' => 'Rasberypi',
            ],
        ];

        Technology::insert($techs);
    }
}
