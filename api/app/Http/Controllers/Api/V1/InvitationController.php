<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Http\Request;

class InvitationController extends Controller
{

    public function store(User $user)
    {
        if($user->role != 'student') {
            return $this->invalidResponse(null, 'Vous ne pouvez inviter que des étudiants');
        }
        if(!auth()->user()->profile->internship) {
            return $this->invalidResponse(null, 'vous ne pouvez pas inviter un autre étudiant sans avoir de stage');
        }

        $invitation = Invitation::create([
            'sender_id' => auth()->user()->id,
            'receiver_id' => $user->id,
            auth()->user()->profile->internship->id
        ]);

        return $this->successResponse($invitation);
    }
    
}
