<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeSocialLoginUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // ソーシャルログインではメールアドレスとパスワードが入らないことがあるので、null許容にする
            $table->string('email')->nullable()->comment('メールアドレス')->change();
            $table->string('password')->nullable()->comment('パスワード')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('email')->nullable(false)->comment('メールアドレス')->change();
            $table->string('password')->nullable(false)->comment('パスワード')->change();
        });
    }
}
