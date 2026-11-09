<?php

namespace App\Http\Controllers;

use App\Mail\NewApplicationReceived;
use App\Models\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ApplicationController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $services = $request->input('services');
        if (is_string($services)) {
            $services = array_values(array_filter(array_map(
                'trim',
                preg_split('/,\s*(?=[A-Z])/', $services) ?: [],
            )));
        }

        $score = rtrim((string) $request->input('matchScore', ''), '%');

        $request->merge([
            'services' => $services ?? [],
            'matchScore' => is_numeric($score) ? (int) $score : null,
        ]);

        $data = $request->validate([
            'name'             => 'required|string|max:255',
            'role'             => 'nullable|string|max:255',
            'brandName'        => 'required|string|max:255',
            'shopLink'         => 'nullable|string|max:500',
            'category'         => 'required|string|max:100',
            'stage'            => 'required|string|max:100',
            'monthlyGmv'       => 'nullable|string|max:50',
            'marketingBudget'  => 'required|string|max:50',
            'services'         => 'required|array|min:1',
            'services.*'       => 'string|max:100',
            'goal90Days'       => 'nullable|string|max:5000',
            'email'            => 'required|email|max:255',
            'mobile'           => 'required|string|max:50',
            'startWhen'        => 'nullable|string|max:50',
            'foundUsVia'       => 'required|string|max:100',
            'referredBy'       => 'nullable|string|max:255',
            'foundUsDetail'    => 'nullable|string|max:255',
            'suggestedPackage' => 'nullable|string|max:50',
            'matchScore'       => 'nullable|integer|between:0,100',
        ]);

        $application = Application::create([
            'contact_name' => $data['name'],
            'contact_role' => $data['role'] ?? null,
            'brand_name' => $data['brandName'],
            'shop_link' => $data['shopLink'] ?? null,
            'category' => $data['category'],
            'stage' => $data['stage'],
            'monthly_gmv' => $data['monthlyGmv'] ?? null,
            'marketing_budget' => $data['marketingBudget'],
            'services' => $data['services'],
            'goal' => $data['goal90Days'] ?? null,
            'email' => $data['email'],
            'mobile' => $data['mobile'],
            'start_when' => $data['startWhen'] ?? null,
            'source' => $data['foundUsVia'],
            'referred_by' => $data['referredBy'] ?? null,
            'source_detail' => $data['foundUsDetail'] ?? null,
            'suggested_package' => $data['suggestedPackage'] ?? null,
            'match_score' => $data['matchScore'] ?? null,
        ]);

        try {
            Mail::to('sorielynnapiza.niunorm@gmail.com')
                ->send(new NewApplicationReceived($application));
        } catch (Throwable $e) {
            report($e);
        }

        return response()->json([
            'message' => 'Application received.',
            'id' => $application->id,
        ], 201);
    }
}
