<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CompanyResource;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends ApiController
{
    public function index()
    {
        return $this->successResponse(
            CompanyResource::collection(Company::all())
        );
    }

    public function store()
    {
        $data = request()->validate([
            'name' => ['string', 'required', 'unique:companies,name'],
            'address' => ['string', 'required'],
            'city' => ['string', 'required'],
            'phone' => ['string', 'required']
        ]);

        $company = Company::create($data);

        return $this->successResponse(new CompanyResource($company));
    }

    public function update(Company $company)
    {
        $data = request()->validate([
            'name' => ['string', 'required', 'unique:companies,name,' . $company->id],
            'address' => ['string', 'required'],
            'city' => ['string', 'required'],
            'phone' => ['string', 'required']
        ]);

        $company->update($data);

        return $this->successResponse();
    }

    public function destroy(Company $company) 
    {
        $company->delete();

        return $this->successResponse();
    }
}
