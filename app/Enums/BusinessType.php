<?php

namespace App\Enums;

enum BusinessType: string
{
    case SUPERMARKET = 'SUPERMARKET';
    case MINIMARKET = 'MINIMARKET';
    case CAFE = 'CAFE';
    case RESTAURANT = 'RESTAURANT';
    case BAKERY = 'BAKERY';
    case PHARMACY = 'PHARMACY';
    case OTHER = 'OTHER';
}
