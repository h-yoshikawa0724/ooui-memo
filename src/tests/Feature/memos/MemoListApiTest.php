<?php

namespace Tests\Feature;

use App\Memo;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MemoListApiTest extends TestCase
{
    use RefreshDatabase;

    private const DATE_TIME_FORMAT = 'Y-m-d H:i:s';

    private function setExpectedData($memos)
    {
        return $memos->map(function ($memo) {
            return [
                'memo_id' => $memo->memo_id,
                'title' => $memo->title,
                'content' => $memo->content,
                'created_at' => $memo->created_at->format(self::DATE_TIME_FORMAT),
                'updated_at' => $memo->updated_at->format(self::DATE_TIME_FORMAT),
            ];
        })
        ->all();
    }

    public function setUp(): void
    {
        parent::setUp();

        // ログインユーザ
        $this->authUser = factory(User::class)->create();
        $this->authUser->markEmailAsVerified();
        // 他のユーザ
        $this->user = factory(User::class)->create();
        $this->user->markEmailAsVerified();
    }

    /**
     * @test
     * ログインユーザのメモ一覧情報を取得できるか（検索キーワードなし）
     */
    public function testGetMemoList()
    {
        factory(Memo::class, 6)->create(['user_id' => $this->authUser->user_id]);
        factory(Memo::class, 4)->create(['user_id' => $this->user->user_id]);

        $response = $this->actingAs($this->authUser)->json('GET', route('memo.index'));

        $memos = Memo::where('user_id', $this->authUser->user_id)->orderBy('updated_at', 'desc')->get();

        // data項目の期待値
        $expected_data = $this->setExpectedData($memos);

        $response->assertStatus(200)
            // レスポンスJSONのdata項目に含まれる要素が5つであること
            ->assertJsonCount(6, 'data')
            // レスポンスJSONのdata項目が期待値と合致すること
            ->assertJsonFragment([
                "data" => $expected_data,
            ]);
    }

    /**
     * @test
     * メモ一覧情報取得でページネーションが機能しているか（検索キーワードなし）
     */
    public function testGetMemoListPages()
    {
        factory(Memo::class, 32)->create(['user_id' => $this->authUser->user_id]);

        // 1ページ目
        $response = $this->actingAs($this->authUser)->json('GET', route('memo.index'));

        $memos = Memo::where('user_id', $this->authUser->user_id)->orderBy('updated_at', 'desc')->limit(30)->get();

        $expected_data_first = $this->setExpectedData($memos);

        $response->assertStatus(200)
            ->assertJsonCount(30, 'data')
            ->assertJsonFragment([
                "data" => $expected_data_first,
            ]);

        // 2ページ目
        $response = $this->actingAs($this->authUser)->json('GET', route('memo.index', ['page' => 2]));

        $memos = Memo::where('user_id', $this->authUser->user_id)
            ->orderBy('updated_at', 'desc')
            ->offset(30)
            ->limit(30)
            ->get();

        $expected_data_second = $this->setExpectedData($memos);

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data')
            ->assertJsonFragment([
                "data" => $expected_data_second,
            ]);
    }

    /**
     * @test
     * ログインユーザのメモ一覧情報を取得できるか（検索キーワードあり）
     */
    public function testGetMemoListBySearchWord()
    {
        $searchWord = 'OOUI-MEMO%_\\';
        factory(Memo::class, 3)->create(['user_id' => $this->authUser->user_id]);
        factory(Memo::class)->create(['user_id' => $this->authUser->user_id, 'title' => $searchWord]);
        factory(Memo::class)->create(['user_id' => $this->authUser->user_id, 'title' => 'a' . $searchWord]);
        factory(Memo::class)->create(['user_id' => $this->authUser->user_id, 'title' => $searchWord . 'b']);
        factory(Memo::class)->create(['user_id' => $this->authUser->user_id, 'title' => 'c' . $searchWord . 'd']);
        factory(Memo::class)->create(['user_id' => $this->authUser->user_id, 'content' => $searchWord]);
        factory(Memo::class)->create(['user_id' => $this->authUser->user_id, 'content' => 'e' . $searchWord]);
        factory(Memo::class)->create(['user_id' => $this->authUser->user_id, 'content' => $searchWord . 'f']);
        factory(Memo::class)->create(['user_id' => $this->authUser->user_id, 'content' => 'g' . $searchWord . 'h']);
        factory(Memo::class, 4)->create(['user_id' => $this->user->user_id]);
        factory(Memo::class)->create(['user_id' => $this->user->user_id, 'title' => $searchWord]);
        factory(Memo::class)->create(['user_id' => $this->user->user_id, 'title' => 'i' . $searchWord]);
        factory(Memo::class)->create(['user_id' => $this->user->user_id, 'title' => $searchWord . 'j']);
        factory(Memo::class)->create(['user_id' => $this->user->user_id, 'title' => 'k' . $searchWord . 'l']);
        factory(Memo::class)->create(['user_id' => $this->user->user_id, 'content' => $searchWord]);
        factory(Memo::class)->create(['user_id' => $this->user->user_id, 'content' => 'm' . $searchWord]);
        factory(Memo::class)->create(['user_id' => $this->user->user_id, 'content' => $searchWord . 'n']);
        factory(Memo::class)->create(['user_id' => $this->user->user_id, 'content' => 'o' . $searchWord . 'p']);

        $response = $this->actingAs($this->authUser)->json('GET', route('memo.index', ['searchWord' => $searchWord]));

        $memos = Memo::where('user_id', $this->authUser->user_id)
                        ->whereLikes($searchWord)
                        ->orderBy('updated_at', 'desc')
                        ->get();

        // data項目の期待値
        $expected_data = $this->setExpectedData($memos);

        $response->assertStatus(200)
            // レスポンスJSONのdata項目に含まれる要素が5つであること
            ->assertJsonCount(8, 'data')
            // レスポンスJSONのdata項目が期待値と合致すること
            ->assertJsonFragment([
                "data" => $expected_data,
            ]);
    }

    /**
     * @test
     * メモ一覧情報取得でページネーションが機能しているか（検索キーワードあり）
     */
    public function testGetMemoListPagesBySearchWord()
    {
        $searchWord = 'OOUI-MEMO';
        factory(Memo::class, 32)->create(['user_id' => $this->authUser->user_id]);
        factory(Memo::class, 18)->create(['user_id' => $this->authUser->user_id, 'title' => 'a' . $searchWord . 'b']);
        factory(Memo::class, 20)
            ->create(['user_id' => $this->authUser->user_id, 'content' => 'a' . $searchWord . 'b']);

        // 1ページ目
        $response = $this->actingAs($this->authUser)->json('GET', route('memo.index', ['searchWord' => $searchWord]));

        $memos = Memo::where('user_id', $this->authUser->user_id)
                        ->whereLikes($searchWord)
                        ->orderBy('updated_at', 'desc')
                        ->limit(30)
                        ->get();

        $expected_data_first = $this->setExpectedData($memos);

        $response->assertStatus(200)
            ->assertJsonCount(30, 'data')
            ->assertJsonFragment([
                "data" => $expected_data_first,
            ]);

        // 2ページ目
        $response = $this->actingAs($this->authUser)
                         ->json('GET', route('memo.index', ['searchWord' => $searchWord, 'page' => 2]));

        $memos = Memo::where('user_id', $this->authUser->user_id)
            ->whereLikes($searchWord)
            ->orderBy('updated_at', 'desc')
            ->offset(30)
            ->limit(30)
            ->get();

        $expected_data_second = $this->setExpectedData($memos);

        $response->assertStatus(200)
            ->assertJsonCount(8, 'data')
            ->assertJsonFragment([
                "data" => $expected_data_second,
            ]);
    }

    /**
     * @test
     * ログインしていない時は401を返すか
     */
    public function testGetMemoListNotLogined()
    {
        $response = $this->json('GET', route('memo.index'));

        $response->assertStatus(401);
    }
}
