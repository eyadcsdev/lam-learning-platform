<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GitHubAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('github')
            ->scopes(['user:email'])
            ->stateless()
            ->redirect();
    }

    public function callback()
    {
        try {
            $githubuser = Socialite::driver('github')->stateless()->user();
        } catch (\Exception $e) {
            return redirect()->route('login')
                ->with('error', 'فشل تسجيل الدخول بحساب GitHub. حاول مرة أخرى.');
        }

        $email = $githubuser->email ?? "{$githubuser->nickname}@github.com";

        $user = User::updateOrCreate(
            [
                'email' => $email,
            ],
            [
                'name' => $githubuser->name ?? $githubuser->nickname,
                'avatar' => $githubuser->avatar,
                'provider' => 'github',
                'provider_id' => $githubuser->id,
                'password' => Hash::make(Str::random(32)),
                'email_verified_at' => now(),
                'xp' => 120,
            ]
        );

        Auth::login($user);

        return redirect()->intended(route('roadmap'))->with('success', 'تم تسجيل الدخول بنجاح');
    }
}
