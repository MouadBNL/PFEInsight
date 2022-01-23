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
        $data =  [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'role' => $this->role,
            'profile_picture' => $this->profile_picture 
                                 ? env('APP_URL') . $this->profile_picture
                                 : 'https://ui-avatars.com/api/?name='. $this->first_name. '+'.$this->last_name.'&rounded=true&bold=true',
            'sex' => $this->profile->sex,
            'apogee' => $this->profile->apogee,
            'field' => $this->profile->field,
            'birthday' => $this->profile->birthday,
            'certificate' => $this->profile->certificate,
            'scorecard' => $this->profile->scorecard,
            'internship' => $this->profile ? $this->profile->internship : null,
        ];
        if($data['internship'] && $data['internship']['students']){
            $data['internship']['colleagues'] = $data['internship']['students']->map(function ($student) {
                return [
                    'apogee' => $student->apogee,
                    'first_name' => $student->user->first_name,
                    'last_name' => $student->user->last_name,
                    'profile_picture' =>$student->user->profile_picture 
                                        ? env('APP_URL') . $student->user->profile_picture
                                        : 'https://ui-avatars.com/api/?name='. $student->user->first_name. '+'.$student->user->last_name.'&rounded=true&bold=true',
                ];
            });

        }
        return $data;
        return parent::toArray($request);
    }
}
