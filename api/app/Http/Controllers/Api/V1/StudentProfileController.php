<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Support\Str;
use App\Http\Resources\StudentResource;
use App\Models\User;
class StudentProfileController extends ApiController
{
    public function index()
    {
        return $this->successResponse( new StudentResource(
            User::with(
                ['profile', 'profile.internship', 'profile.internship.technologies', 'profile.internship.students', 'profile.internship.students.user']
                )->where('id', auth()->user()->id)->firstOrFail()
        ));
    }

    public function update()
    {
        $data = request()->validate([
            'apogee' => ['present', 'nullable', 'string', 'max:10'],
            'birthday' => ['present', 'nullable', 'date_format:Y-m-d'],
            'sex' => ['present', 'nullable', 'string', 'in:male,female'],
            'field' => ['present', 'nullable', 'string', 'in:GI,GInd,GM,GE,RST'],
        ]);

        auth()->user()->profile()->update($data);

        return $this->successResponse();
    }

    public function uploadCertificate()
    {
        request()->validate([
            'file' => ['present', 'nullable', 'file', 'max:40960', 'mimes:pdf,doc,docx,ppt,pptx']
        ]);

        $user = auth()->user();

        if(!request()->file){
            $user->profile->update(['certificate' => null]);
            return $this->successResponse();
        }

        $name = $this->generateFileName(request()->file);
        request()->file->storeAs(
            'public/certificates',
            $name
        );
        $user->profile->update([
            'certificate' => "storage/certificates/$name"
        ]);
        return $this->successResponse([
            'certificate' => "storage/certificates/$name"
        ]);
    }

    public function uploadScorecard()
    {
        request()->validate([
            'file' => ['present', 'nullable', 'file', 'max:40960', 'mimes:pdf,doc,docx,ppt,pptx']
        ]);

        $user = auth()->user();

        if(!request()->file){
            $user->profile->update(['scorecard' => null]);
            return $this->successResponse();
        }

        $name = $this->generateFileName(request()->file);
        request()->file->storeAs(
            'public/scorecards',
            $name
        );
        $user->profile->update([
            'scorecard' => "storage/scorecards/$name"
        ]);
        return $this->successResponse([
            'scorecard' => "storage/scorecards/$name"
        ]);
    }

    protected function generateFileName($file)
    {
        return Str::random(20) . '_' . auth()->user()->profile->apogee . '_' . auth()->user()->first_name . '_' . auth()->user()->last_name . '.' . $file->getClientOriginalExtension();
    }
}
