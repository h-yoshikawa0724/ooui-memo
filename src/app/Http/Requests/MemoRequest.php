<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MemoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'string|max:100',
            'content' => 'string|max:65535'
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'title.string' => 'メモタイトルは文字列である必要があります。',
            'title.max' => 'メモタイトルの最大文字数100を超えています。',
            'content.string' => 'メモ内容は文字列である必要があります。',
            'content.max' => 'メモ内容の最大文字数65535を超えています。'
        ];
    }
}
