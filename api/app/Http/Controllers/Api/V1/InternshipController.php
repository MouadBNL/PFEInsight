<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\StudentResource;
use App\Models\Internship;
use Illuminate\Http\Request;

class InternshipController extends ApiController
{

    public function index()
    {
        $internships = Internship::has('students')->with(['technologies', 'supervisor', 'company', 'students.user', 'students.user.profile'])->get();
        foreach ($internships as &$intern) {
            for($i = 0; $i < count($intern->students); $i++){
                $intern->students[$i] = new StudentResource($intern->students[$i]->user);
            }
        }
        return $this->successResponse($internships);
    }

    public function show(Internship $internship)
    {
        $internship->load(['technologies', 'supervisor', 'company', 'students.user', 'students.user.profile']);
        for($i = 0; $i < count($internship->students); $i++){
            $internship->students[$i] = new StudentResource($internship->students[$i]->user);
        }
        return $this->successResponse($internship);
    }

    public function store()
    {
        $data = request()->validate([
            'company_id' => ['required', 'exists:companies,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'supervisor_name' => ['required', 'string', 'max:255'],
            'supervisor_phone' => ['nullable', 'string', 'max:20'],
        ]);

        $tech = request()->validate([
            'technologies' => ['array', 'nullable'],
            'technologies.*' => ['required', 'exists:technologies,id']
        ]);


        $internship = Internship::create($data);

        if($tech['technologies']){
            $tech = $tech['technologies'];
            $internship->technologies()->sync($tech);
        }

        auth()->user()->profile()->update([
            'internship_id' => $internship->id
        ]);

        return $this->successResponse($internship);
    }

    public function supervise(Internship $internship)
    {
        if($internship->supervisor_id == auth()->user()->id) {
            return $this->invalidResponse(null, 'vous êtes déjà le superviseur');
        }
        if($internship->supervisor_id != null){
            return $this->invalidResponse(null, 'ce stage a déjà un superviseur');
        }
        $internship->update([
            'supervisor_id' => auth()->user()->id
        ]);

        return $this->successResponse();
    }

    public function unsupervise(Internship $internship)
    {
        if($internship->supervisor_id != auth()->user()->id){
            return $this->invalidResponse(null, 'Vous n\'avez aucun contrôle sur ce stage');
        }
        $internship->update([
            'supervisor_id' => null,
            'valid_soutenance' => false,
            'score' => 0
        ]);

        return $this->successResponse();
    }

    public function valid(Internship $internship)
    {
        if($internship->supervisor_id != auth()->user()->id){
            return $this->invalidResponse(null, 'Vous n\'avez aucun contrôle sur ce stage');
        }

        $internship->update([
            'valid_soutenance' => true
        ]);

        return $this->successResponse();
    }

    public function invalid(Internship $internship)
    {
        if($internship->supervisor_id != auth()->user()->id){
            return $this->invalidResponse(null, 'Vous n\'avez aucun contrôle sur ce stage');
        }

        $internship->update([
            'valid_soutenance' => false
        ]);

        return $this->successResponse();
    }

    public function score(Internship $internship)
    {
        if($internship->supervisor_id != auth()->user()->id){
            return $this->invalidResponse(null, 'Vous n\'avez aucun contrôle sur ce stage');
        }
        $data = request()->validate([
            'score' => ['required', 'numeric', 'max:20', 'min:0']
        ]);

        $internship->update([
            'score' => $data['score']
        ]);

        return $this->successResponse();
    }
}