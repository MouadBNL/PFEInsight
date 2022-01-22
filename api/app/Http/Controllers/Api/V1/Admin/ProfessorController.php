<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Api\V1\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class ProfessorController extends ApiController
{
    public function index()
    {
        return $this->successResponse(
            UserResource::collection(User::where('role', 'professor')->get())
        );
    }

    public function show(User $user)
    {
        $user->load(['profile', 'internships', 'internships.company']);
        return $this->successResponse(
            new UserResource($user)
        );
    }
}
