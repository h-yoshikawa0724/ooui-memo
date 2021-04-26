<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('memos', function (Blueprint $table) {
            $table->uuid('memo_id')->primary()->comment('メモID');
            $table->uuid('user_id')->comment('ユーザID');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');;

            $table->string('title', 100)->nullable()->comment('メモタイトル');
            $table->text('content')->nullable()->comment('メモ内容'); // 65535文字
            $table->dateTime('created_at')->nullable()->comment('作成日時');
            $table->dateTime('updated_at')->nullable()->comment('更新日時');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('memos');
    }
}
