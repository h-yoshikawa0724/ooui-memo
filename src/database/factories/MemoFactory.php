<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Memo;
use Faker\Generator as Faker;

$factory->define(Memo::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence,
        'content' => $faker->text
    ];
});
