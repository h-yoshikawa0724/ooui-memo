<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class AuthType extends Enum
{
    public const SOCIAL = 'SOCIAL';
    public const MAIL   = 'MAIL';
    public const BOTH   = 'BOTH';
}
