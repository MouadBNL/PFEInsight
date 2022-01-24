<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Rap2hpoutre\FastExcel\FastExcel;

class ExportController extends Controller
{
    public function students()
    {
        $students = Profile::whereHas('user', function($query){
            $query->where('role', 'student');
        })->with([
            'user',
            'internship', 
            'internship.technologies',
            'internship.supervisor',
            'internship.company'
        ])->get();

        // $students = $students->map(function($student){

        //     return (object) [
        //         'apogee' => $student->apogee,
        //         'first_name' => $student->user->first_name,
        //         'last_name' => $student->user->last_name,
        //         'email' => $student->user->email,
        //         'internship_title' => $student->internship ? $student->internship->title : 'sans stage',
        //         'company' => $student->internship && $student->internship->company ? $student->internship->company->name : 'sans stage',
        //         'company_supervisor' => $student->internship ? $student->internship->supervisor_name : 'sans stage',
        //         'technologies' => $student->internship && $student->internship->technologies ? implode(', ', $student->internship->technologies->map(function($t){
        //             return $t->name;
        //         })->toArray()) : 'sans stage',
        //         'supervisor' => $student->internship && $student->internship->supervisor ? $student->internship->supervisor->first_name . ' ' . $student->internship->supervisor->last_name : 'sans encadrant',
        //         'score' => $student->internship && $student->internship->score ? $student->internship->score : 'non défini',
        //         'soutenance' => $student->internship ? ($student->internship->valid_soutenance ?'Oui' : 'Non' ): 'sans stage'
        //     ];
        // });

        $students = $students->map(function($student){

            return [
                $student->apogee,
                $student->user->first_name,
                $student->user->last_name,
                $student->user->email,
                $student->internship ? $student->internship->title : 'sans stage',
                $student->internship && $student->internship->company ? $student->internship->company->name : 'sans stage',
                $student->internship ? $student->internship->supervisor_name : 'sans stage',
                $student->internship && $student->internship->technologies ? implode(', ', $student->internship->technologies->map(function($t){
                    return $t->name;
                })->toArray()) : 'sans stage',
                $student->internship && $student->internship->supervisor ? $student->internship->supervisor->first_name . ' ' . $student->internship->supervisor->last_name : 'sans encadrant',
                $student->internship && $student->internship->score ? $student->internship->score : 'non défini',
                $student->internship ? ($student->internship->valid_soutenance ?'Oui' : 'Non' ): 'sans stage'
            ];
        });


        $students = collect($students);

        return fastexcel($students)->download('liste_etudiants.xlsx');
    }
}
