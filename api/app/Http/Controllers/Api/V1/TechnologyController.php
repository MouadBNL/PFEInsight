<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\TechnologyResource;
use App\Models\Technology;
use Illuminate\Http\Request;

class TechnologyController extends ApiController
{
    public function index()
    {
        return $this->successResponse(
            TechnologyResource::collection(Technology::all())
        );
    }

    public function store()
    {
        $data = request()->validate([
            'name' => ['required', 'string', 'unique:technologies,name']
        ]);

        $tech = Technology::create($data);

        return $this->successResponse(
            new TechnologyResource($tech)
        );
    }

    public function update(Technology $technology)
    {
        $data = request()->validate([
            'name' => ['required', 'string', 'unique:technologies,name,' . $technology->id]
        ]);

        $technology->update($data);

        return $this->successResponse();
    }

    public function destroy(Technology $technology)
    {
        $technology->delete();

        return $this->successResponse();
    }
}
