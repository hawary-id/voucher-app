<?php

namespace App\Http\Controllers;

use App\Services\ActivityLogService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;

class ActivityLogController extends Controller
{
    public function __construct(
        private readonly ActivityLogService $service,
    ) {}

    public function index(Request $request)
    {
        $this->authorize('viewAny', Activity::class);
        return Inertia::render(
            'activity-logs/index',
            [
                'activities' => $this->service->paginate(
                    search: $request->string('search')->toString(),
                    logName: $request->string('log_name')->toString(),
                    event: $request->string('event')->toString(),
                ),

                'filters' => [
                    'search' => $request->string('search')->toString(),
                    'log_name' => $request->string('log_name')->toString(),
                    'event' => $request->string('event')->toString(),
                ],
            ],
        );
    }
    public function show(Activity $activity)
    {
        $this->authorize('view', $activity);
        return Inertia::render(
            'activity-logs/show',
            [
                'activity' => $this->service->find($activity),
            ],
        );
    }
}
