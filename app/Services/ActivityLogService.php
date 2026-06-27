<?php

namespace App\Services;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Spatie\Activitylog\Models\Activity;

class ActivityLogService
{
    public function paginate(
        string $search = '',
        string $logName = '',
        string $event = '',
    ): LengthAwarePaginator {
        return Activity::query()
            ->with([
                'causer',
                'subject',
            ])
            ->when(
                filled($search),
                fn($query) => $query->where(
                    'description',
                    'like',
                    "%{$search}%"
                )
            )
            ->when(
                filled($logName),
                fn($query) => $query->where(
                    'log_name',
                    $logName,
                )
            )
            ->when(
                filled($event),
                fn($query) => $query->where(
                    'event',
                    $event,
                )
            )
            ->latest()
            ->paginate()
            ->withQueryString();
    }

    public function find(
        Activity $activity,
    ): Activity {
        return $activity->load([
            'causer',
            'subject',
        ]);
    }
}
