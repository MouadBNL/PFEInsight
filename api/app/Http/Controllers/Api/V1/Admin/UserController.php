<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Api\V1\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends ApiController
{

    public function index()
    {
        return $this->successResponse(UserResource::collection(User::all()->load('profile')));
    }

    public function store()
    {
        $data = request()->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['min:8', 'confirmed', 'string', 'required'],
            'role' => ['required', 'string', 'in:admin,student,professor'],
            'apogee' => ['required_if:role,student', 'string', 'nullable']
        ]);
        unset($data['apogee']);
        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);
        $user->profile()->create($data['role'] == 'student' ? ['apogee' => request('apogee')] : []);

        return $this->successResponse(new UserResource($user));
    }

    public function destroy(User $user)
    {
        $user->delete();
        return $this->successResponse();
    }
}
