<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

class CompanyFactory extends Factory
{
    protected $model = Company::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // 'name' => ['string', 'required', 'unique:companies,name'],
        //     'address' => ['string', 'required'],
        //     'city' => ['string', 'required'],
        //     'phone' => ['string', 'required']
        return [
            'name' => $this->faker->company(),
            'address' => $this->faker->address(),
            'city' => $this->faker->city(),
            'phone' => $this->faker->phoneNumber()
        ];
    }
}
