<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class InternshipFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // $data = request()->validate([
        //     'company_id' => ['required', 'exists:companies,id'],
        //     'title' => ['required', 'string', 'max:255'],
        //     'description' => ['nullable', 'string'],
        //     'supervisor_name' => ['required', 'string', 'max:255'],
        //     'supervisor_phone' => ['nullable', 'string', 'max:20'],
        // ]);

        // $tech = request()->validate([
        //     'technologies' => ['array', 'nullable'],
        //     'technologies.*' => ['required', 'exists:technologies,id']
        // ]);
        return [
            'title' => $this->faker->jobTitle(),
            'supervisor_id' => User::where('role', 'professor')->inRandomOrder()->first()->id,
            'company_id' => Company::inRandomOrder()->first()->id,
            'description' => $this->faker->paragraphs(5, true),
            'supervisor_name' => $this->faker->name(),
            'supervisor_phone' => $this->faker->phoneNumber(),
            'draft_report' => (random_int(0,1) == 0) ? null : 'test.pdf',
            'final_report' => (random_int(0,1) == 0) ? null : 'test.pdf',
            'valid_soutenance' => random_int(0,1),
            'score' => random_int(8,20),
            'presentation' => (random_int(0,1) == 0) ? null : 'test.pdf',
        ];
    }
}
