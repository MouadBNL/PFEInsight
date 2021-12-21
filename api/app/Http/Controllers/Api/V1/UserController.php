<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Support\Str;

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

    public function uploadProfilePicture()
    {
        request()->validate([
            'profile_picture' => ['present', 'nullable', 'file', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048']
        ]);

        if(!request()->profile_picture){
            auth()->user()->update(['profile_picture' => null]);
            return $this->successResponse([
                'profile_picture' => 'https://ui-avatars.com/api/?name='. auth()->user()->first_name. '+'.auth()->user()->last_name.'&rounded=true&bold=true'
            ]);
        }

        $name = Str::random(20) . '.' . request()->profile_picture->extension();
        request()->profile_picture->storeAs(
            'public/profile_pictures',
            $name
        );
        auth()->user()->update([
            'profile_picture' => "storage/profile_pictures/$name"
        ]);
        return $this->successResponse([
            'profile_picture' => env('APP_URL') . "storage/profile_pictures/$name"
        ]);
    }
}
