<?php

namespace App\Enums;

enum VoucherBatchStatus: string
{
    case DRAFT = 'DRAFT';
    case GENERATED = 'GENERATED';
    case CANCELLED = 'CANCELLED';
}
