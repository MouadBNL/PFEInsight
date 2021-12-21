<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'role' => $this->role,
            'profile_picture' => $this->profile_picture
                                 ? env('APP_URL') . $this->profile_picture
                                 : 'https://ui-avatars.com/api/?name='. $this->first_name. '+'.$this->last_name.'&rounded=true&bold=true',
        ];
        return parent::toArray($request);
    }
}
