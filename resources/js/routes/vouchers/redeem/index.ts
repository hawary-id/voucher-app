import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\VoucherRedeemController::check
 * @see app/Http/Controllers/VoucherRedeemController.php:40
 * @route '/vouchers/redeem/check'
 */
export const check = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: check.url(options),
    method: 'post',
})

check.definition = {
    methods: ["post"],
    url: '/vouchers/redeem/check',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoucherRedeemController::check
 * @see app/Http/Controllers/VoucherRedeemController.php:40
 * @route '/vouchers/redeem/check'
 */
check.url = (options?: RouteQueryOptions) => {
    return check.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherRedeemController::check
 * @see app/Http/Controllers/VoucherRedeemController.php:40
 * @route '/vouchers/redeem/check'
 */
check.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: check.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VoucherRedeemController::store
 * @see app/Http/Controllers/VoucherRedeemController.php:68
 * @route '/vouchers/redeem'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/vouchers/redeem',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoucherRedeemController::store
 * @see app/Http/Controllers/VoucherRedeemController.php:68
 * @route '/vouchers/redeem'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherRedeemController::store
 * @see app/Http/Controllers/VoucherRedeemController.php:68
 * @route '/vouchers/redeem'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})
const redeem = {
    check: Object.assign(check, check),
store: Object.assign(store, store),
}

export default redeem