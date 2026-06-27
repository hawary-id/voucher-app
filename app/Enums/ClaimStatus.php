<?php

namespace App\Enums;

enum ClaimStatus: string
{
    case PENDING = 'PENDING';
    case CLAIMED = 'CLAIMED';
    case PAID = 'PAID';
}
