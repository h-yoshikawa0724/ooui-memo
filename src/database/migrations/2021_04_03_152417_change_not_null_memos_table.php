<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeNotNullMemosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('memos', function (Blueprint $table) {
            // null許容からnot null（デフォルト空文字）へ
            $table->string('title', 100)->nullable(false)->default('')->comment('メモタイトル')->change();
            $table->text('content')->nullable(false)->default('')->comment('メモ内容')->change(); // 65535文字
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('memos', function (Blueprint $table) {
            $table->string('title', 100)->nullable()->comment('メモタイトル')->change();
            $table->text('content')->nullable()->comment('メモ内容')->change(); // 65535文字
        });
    }
}
