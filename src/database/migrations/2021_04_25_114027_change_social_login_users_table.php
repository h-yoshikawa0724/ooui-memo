<?php

use App\Enums\AuthType;
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
            // ソーシャルログインではパスワードを使わないのでnull許容にする
            $table->string('password')->nullable()->comment('パスワード')->change();

            $table->enum('auth_type', AuthType::getValues())->after('name')->comment('認証タイプ【' . implode(', ', AuthType::getValues()) . '】');
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
            $table->string('password')->nullable(false)->comment('パスワード')->change();

            $table->dropColumn('auth_type');
        });
    }
}
