import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ActivityLogController::index
 * @see app/Http/Controllers/ActivityLogController.php:16
 * @route '/activity-logs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/activity-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ActivityLogController::index
 * @see app/Http/Controllers/ActivityLogController.php:16
 * @route '/activity-logs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivityLogController::index
 * @see app/Http/Controllers/ActivityLogController.php:16
 * @route '/activity-logs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ActivityLogController::index
 * @see app/Http/Controllers/ActivityLogController.php:16
 * @route '/activity-logs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ActivityLogController::show
 * @see app/Http/Controllers/ActivityLogController.php:36
 * @route '/activity-logs/{activity}'
 */
export const show = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/activity-logs/{activity}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ActivityLogController::show
 * @see app/Http/Controllers/ActivityLogController.php:36
 * @route '/activity-logs/{activity}'
 */
show.url = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { activity: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: typeof args.activity === 'object'
                ? args.activity.id
                : args.activity,
                }

    return show.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivityLogController::show
 * @see app/Http/Controllers/ActivityLogController.php:36
 * @route '/activity-logs/{activity}'
 */
show.get = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ActivityLogController::show
 * @see app/Http/Controllers/ActivityLogController.php:36
 * @route '/activity-logs/{activity}'
 */
show.head = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const ActivityLogController = { index, show }

export default ActivityLogController