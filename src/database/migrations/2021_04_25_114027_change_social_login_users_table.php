<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeSocialLoginUsersTable extends Migration
{
    public function __construct()
    {
        // dbalがenum型のカラム変更に対応していないので、エラー回避策としてstringにマッピングする
        DB::getDoctrineSchemaManager()->getDatabasePlatform()->registerDoctrineTypeMapping('enum', 'string');
    }

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

            $table->enum('auth_type', ['SOCIAL', 'MAIL'])->after('name')->comment('認証タイプ【SOCAIL, MAIL】');
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

            $table->dropColumn('auth_type');
        });
    }
}
