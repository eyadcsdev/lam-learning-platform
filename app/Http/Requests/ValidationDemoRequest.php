<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValidationDemoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:60'],
            'email' => ['required', 'email'],
            'age' => ['required', 'integer', 'min:21'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'حقل الاسم مطلوب',
            'name.min' => 'الاسم يجب أن لا يقل عن 3 أحرف',
            'name.max' => 'الاسم طويل جداً',
            'email.required' => 'البريد مطلوب',
            'email.email' => 'صيغة البريد غير صحيحة',
            'age.required' => 'العمر مطلوب',
            'age.integer' => 'العمر يجب أن يكون رقماً صحيحاً',
            'age.min' => 'يجب ألا يقل العمر عن 21 سنة',
        ];
    }
}
