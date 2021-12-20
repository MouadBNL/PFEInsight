<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\StudentResource;
use App\Models\User;
use Illuminate\Http\Request;

class StudentProfileController extends ApiController
{
    public function index()
    {
        // return User::with('profile')->where('id', auth()->user()->id)->firstOrFail();
        return $this->successResponse( new StudentResource(
            User::with('profile')->where('id', auth()->user()->id)->firstOrFail()
        ));
    }
}
