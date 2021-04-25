<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class AuthType extends Enum
{
    public const SOCIAL = 'Social';
    public const MAIL   = 'Mail';
}
