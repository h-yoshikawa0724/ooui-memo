<?php

namespace App;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Model;

class Memo extends Model
{
    protected $primaryKey = 'memo_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'content'
    ];

    /**
     * The attributes that should be visible for arrays.
     *
     * @var array
     */
    protected $visible = [
        'memo_id', 'title', 'content', 'created_at', 'updated_at'
    ];

    /**
     * リレーション - User
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'user_id');
    }

    /**
     * メモタイトルかメモ内容の部分一致クエリのスコープ
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $keyword
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWhereLikes($query, string $keyword)
    {
        return $query->where('title', 'like', '%' . addcslashes($keyword, '%_\\') . '%')
                     ->orWhere('content', 'like', '%' . addcslashes($keyword, '%_\\') . '%');
    }
}
