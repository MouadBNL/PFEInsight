<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Api\V1\ApiController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends ApiController
{

    public function index()
    {
        return $this->successResponse(User::all());
    }

    public function store()
    {
        $data = request()->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'apogee' => ['required_if:role,student', 'string'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['min:8', 'confirmed', 'string', 'required'],
            'role' => ['required', 'string', 'in:admin,student,professor']
        ]);

        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);
        $user->profile()->create($data['role'] == 'student' ? ['apogee' => $data['apogee']] : []);

        return $this->successResponse($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return $this->successResponse();
    }
}
