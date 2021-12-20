<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\StudentResource;
use App\Models\User;
use Illuminate\Http\Request;

class StudentProfileController extends ApiController
{
    public function index()
    {
        return $this->successResponse( new StudentResource(
            User::with('profile')->where('id', auth()->user()->id)->firstOrFail()
        ));
    }

    public function update()
    {
        $data = request()->validate([
            'apogee' => ['present', 'nullable', 'string', 'max:10'],
            'birthday' => ['present', 'nullable', 'date_format:Y-n-d'],
            'sex' => ['present', 'nullable', 'string', 'in:male,female'],
            'field' => ['present', 'nullable', 'string', 'in:GI,GInd,GM,GE,RST'],
        ]);

        auth()->user()->profile()->update($data);

        return $this->successResponse();
    }
}
