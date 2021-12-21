<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends ApiController
{
    public function update()
    {
        $data = request()->validate([
            'email' => ['required', 'email', 'unique:users,email,'.auth()->user()->id.',id'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'password' => ['required', 'confirmed']
        ]);

        $data['password'] = bcrypt($data['password']);

        auth()->user()->update($data);

        return $this->successResponse();
    }
}
