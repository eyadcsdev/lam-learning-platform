<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class XpController extends Controller
{
    public function award(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'amount' => ['required', 'integer', 'min:1', 'max:9999'],
        ]);

        $user = $request->user();
        $user->increment('xp', $validated['amount']);

        return response()->json([
            'total_xp' => $user->fresh()->xp,
        ]);
    }
}
