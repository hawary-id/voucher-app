import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\BusinessSettingController::index
 * @see app/Http/Controllers/BusinessSettingController.php:17
 * @route '/settings/business'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings/business',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusinessSettingController::index
 * @see app/Http/Controllers/BusinessSettingController.php:17
 * @route '/settings/business'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessSettingController::index
 * @see app/Http/Controllers/BusinessSettingController.php:17
 * @route '/settings/business'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BusinessSettingController::index
 * @see app/Http/Controllers/BusinessSettingController.php:17
 * @route '/settings/business'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BusinessSettingController::update
 * @see app/Http/Controllers/BusinessSettingController.php:28
 * @route '/settings/business'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/settings/business',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BusinessSettingController::update
 * @see app/Http/Controllers/BusinessSettingController.php:28
 * @route '/settings/business'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessSettingController::update
 * @see app/Http/Controllers/BusinessSettingController.php:28
 * @route '/settings/business'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})
const businessSetting = {
    index: Object.assign(index, index),
update: Object.assign(update, update),
}

export default businessSetting