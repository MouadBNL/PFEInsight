<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
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
            'profile_picture' => $this->profile->profile_picture 
                                 ? env('APP_URL') . $this->profile->profile_picture
                                 : null,
            'sex' => $this->profile->sex,
            'apogee' => $this->profile->apogee,
            'field' => $this->profile->field,
            'birthday' => $this->profile->birthday,
        ];
        return parent::toArray($request);
    }
}
