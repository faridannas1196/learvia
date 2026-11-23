<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Support\DummyGuruData;
use Inertia\Inertia;
use Inertia\Response;

class UjianController extends Controller
{
    public function index(): Response
    {
        // TODO: query exams milik guru (exams.teacher_id) + class_subject.
        return Inertia::render('Guru/Ujian/Index', ['ujian' => DummyGuruData::ujian()]);
    }
}
