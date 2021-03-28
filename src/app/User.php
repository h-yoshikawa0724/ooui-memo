<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use GoldSpecDigital\LaravelEloquentUUID\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $primaryKey = 'user_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be visible for arrays.
     *
     * @var array
     */
    protected $visible = [
        'name',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

     /**
     * リレーション - Memo
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function memos()
    {
        return $this->hasMany('App\Memo', 'user_id');
    }
}
