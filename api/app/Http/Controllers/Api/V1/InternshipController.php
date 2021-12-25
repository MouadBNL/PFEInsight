<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Internship;
use Illuminate\Http\Request;

class InternshipController extends ApiController
{
    public function store()
    {
        $data = request()->validate([
            'company_id' => ['required', 'exists:companies,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'supervisor_name' => ['required', 'string', 'max:255'],
            'supervisor_phone' => ['nullable', 'string', 'max:20'],
        ]);

        $internship = Internship::create($data);

        auth()->user()->profile()->update([
            'internship_id' => $internship->id
        ]);

        return $this->successResponse($internship);
    }
}