<?php

namespace App\Enums;

enum VoucherStatus: string
{
    case ACTIVE = 'ACTIVE';
    case USED = 'USED';
    case EXPIRED = 'EXPIRED';
    case VOID = 'VOID';
}
