<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;

class InvitationController extends ApiController
{

    public function store(User $user)
    {
        if($user->id == auth()->user()->id){
            return $this->invalidResponse(null, 'Vous ne peux pas vous inviter');
        }
        if($user->role != 'student') {
            return $this->invalidResponse(null, 'Vous ne pouvez inviter que des étudiants' . $user->id);
        }
        if(!auth()->user()->profile->internship) {
            return $this->invalidResponse(null, 'vous ne pouvez pas inviter un autre étudiant sans avoir de stage');
        }

        $inv = Invitation::where('sender_id', auth()->user()->id)->where('internship_id',  auth()->user()->profile->internship->id)->first();
        $count = Profile::where('internship_id', auth()->user()->profile->internship->id)->get()->count();
        if($inv || $count >= 2) { // max users in an internship
            return $this->invalidResponse(null, 'vous ne pouvez inviter qu\'un seul collègue');
        }

        $invitation = Invitation::create([
            'sender_id' => auth()->user()->id,
            'receiver_id' => $user->id,
            'internship_id' => auth()->user()->profile->internship->id
        ]);

        return $this->successResponse($invitation);
    }
    
}
