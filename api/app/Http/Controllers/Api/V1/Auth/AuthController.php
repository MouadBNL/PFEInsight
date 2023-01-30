<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Api\V1\ApiController;
use App\Http\Resources\UserResource;
use App\Models\User;

class AuthController extends ApiController
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        
        $credentials = request()->validate([
            'email' => ['email', 'required'],
            'password' => ['required']
        ]);

        if (! $token = auth()->attempt($credentials)) {
            return $this->invalidResponse(['error' => 'Unauthorized'], null, 401);
        }

        return $this->respondWithToken($token);
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return $this->successResponse(new UserResource(auth()->user()->load('profile')));
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return $this->successResponse([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return $this->successResponse([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    protected function generateDemoUser()
    {
        $data = request()->validate([
            'role' => 'string|required|in:admin,professor,student'
        ]);

        $user = User::factory()->create([
            'role' => $data['role']
        ]);

        if($user->role =='student') {
            $user->profile()->create();
        }

        return $this->successResponse([
            'email' => $user->email,
            'password' => 'password'
        ]);
    }
}
