<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Api\V1\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Resources\StudentResource;
use App\Models\User;
use Illuminate\Http\Request;

class StudentController extends ApiController
{
    public function index()
    {
        return $this->successResponse(
            StudentResource::collection(User::where('role', 'student')->get())
        );
    }

    public function show(User $user)
    {
        $user->load('profile');
        return $this->successResponse(
            new StudentResource($user)
        );
    }
}
