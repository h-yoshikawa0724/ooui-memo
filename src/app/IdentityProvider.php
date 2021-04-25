<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IdentityProvider extends Model
{
    protected $primaryKey = ['provider_name', 'provider_user_id'];
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['provider_name', 'provider_user_id'];

    /**
     * リレーション - User
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'user_id');
    }
}
