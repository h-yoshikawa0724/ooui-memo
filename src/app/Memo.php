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
}
