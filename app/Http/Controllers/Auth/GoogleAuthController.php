<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')
            ->stateless()
            ->redirect();
    }

    public function callback()
    {
        try {
            $googleuser = Socialite::driver('google')->stateless()->user();
        } catch (\Exception $e) {
            return redirect()->route('login')
                ->with('error', 'فشل تسجيل الدخول بحساب Google. حاول مرة أخرى.');
        }

        $user = User::updateOrCreate(
            [
                'email' => $googleuser->email,
            ],
            [
                'name' => $googleuser->name,
                'avatar' => $googleuser->avatar,
                'provider' => 'google',
                'provider_id' => $googleuser->id,
                'password' => Hash::make(Str::random(32)),
                'email_verified_at' => now(),
                'xp' => 120,
            ]
        );

        Auth::login($user);

        return redirect()->intended(route('roadmap', ['technology' => 'laravel']))->with('success', 'تم تسجيل الدخول بنجاح');
    }
}
