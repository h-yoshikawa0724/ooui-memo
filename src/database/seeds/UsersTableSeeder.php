<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class)->create([
            'name' => 'ooui-memo user',
            'email' => 'dummy@email.com',
            'password' => Hash::make('test1234'),
        ])->each(function ($user) {
            $user->memos()->saveMany(factory(App\Memo::class, 35)->make());
        });
    }
}
