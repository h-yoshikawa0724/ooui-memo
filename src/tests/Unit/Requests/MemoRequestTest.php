<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\MemoRequest;
use Illuminate\Support\Facades\Validator;
// ファザードを使用するのでLaravelが提供するTestCaseを継承する
use Tests\TestCase;

class MemoRequestTest extends TestCase
{
    /**
     * MemoRequestのバリデーションテスト
     *
     * @param array 項目名の配列
     * @param array 値の配列
     * @param boolean 期待値(true:バリデーションNG、false:バリデーションOK)
     * @dataProvider dataMemoExample
     */
    public function testMemoRequest(array $keys, array $values, bool $expect)
    {
        $dataList = array_combine($keys, $values);

        $request = new MemoRequest();
        $rules = $request->rules();
        $validator = Validator::make($dataList, $rules);

        // バリデーションに引っ掛かるとtrue
        $result = $validator->fails();
        $this->assertEquals($expect, $result);
    }

    public function dataMemoExample()
    {
        return [
            'OK' => [
                ['title', 'content'],
                ['テスト タイトル', 'テスト 内容'],
                false
            ],
            'NG:titleが文字列でない' => [
                ['title', 'content'],
                [123, 'テスト 内容'],
                true
            ],
            'OK:titleが100文字以内' => [
                ['title', 'content'],
                [str_repeat('a', 100), 'テスト 内容'],
                false
            ],
            'NG:titleが100文字より多い' => [
                ['title', 'content'],
                [str_repeat('a', 101), 'テスト 内容'],
                true
            ],
            'NG:contentが文字列でない' => [
                ['title', 'content'],
                ['テスト タイトル', 123],
                true
            ],
            'OK:contentが65535文字以内' => [
                ['title', 'content'],
                ['テスト タイトル', str_repeat('a', 65535)],
                false
            ],
            'NG:contentが65535文字より多い' => [
                ['title', 'content'],
                ['テスト タイトル', str_repeat('a', 65536)],
                true
            ],
        ];
    }
}
