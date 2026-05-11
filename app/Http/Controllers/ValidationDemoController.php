<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValidationDemoRequest;
use Illuminate\Http\JsonResponse;

class ValidationDemoController extends Controller
{
    public function demo(ValidationDemoRequest $request): JsonResponse
    {
        $validated = $request->validated();

        return response()->json([
            'status' => 'launched',
            'mission' => 'OK',
            'data' => $validated,
        ]);
    }
}
