<?php

namespace App\Http\Controllers;

use App\Mail\NewApplicationReceived;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ApplicationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand_name'    => 'required|string|max:255',
            'contact_name'  => 'required|string|max:255',
            'email'         => 'required|email|max:255',
            'tiktok_handle' => 'nullable|string|max:100',
            'monthly_gmv'   => 'nullable|string|max:50',
            'category'      => 'nullable|string|max:100',
            'services'      => 'nullable|array',
            'services.*'    => 'string',
            'referral'      => 'nullable|string|max:100',
            'message'       => 'nullable|string',
        ]);

        $application = Application::create($validated);

        Mail::to('sorielynnapiza.niunorm@gmail.com')
            ->send(new NewApplicationReceived($application));

        return response()->json([
            'message' => 'Application received.',
            'id'      => $application->id,
        ], 201);
    }
}
