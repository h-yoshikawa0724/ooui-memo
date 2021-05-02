<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIdentityProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('identity_providers', function (Blueprint $table) {
            $table->uuid('user_id')->comment('ユーザID');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade'); // 外部キー制約
            $table->string('provider_name')->comment('プロバイダー名');
            $table->string('provider_user_id')->comment('プロバイダーユーザID');
            $table->primary(['provider_name', 'provider_user_id']); // 複合キー
            $table->unique(['user_id', 'provider_name']); // 複合ユニーク
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
        Schema::dropIfExists('identity_providers');
    }
}
