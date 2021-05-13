<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\IdentityProvider;
use Faker\Generator as Faker;

$factory->define(IdentityProvider::class, function (Faker $faker) {
    return [
        'provider_user_id' => uniqid(),
        'provider_name' => collect(['github'])->random()
    ];
});
