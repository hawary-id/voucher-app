import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VoucherRedeemController::create
 * @see app/Http/Controllers/VoucherRedeemController.php:20
 * @route '/vouchers/redeem'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/vouchers/redeem',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoucherRedeemController::create
 * @see app/Http/Controllers/VoucherRedeemController.php:20
 * @route '/vouchers/redeem'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherRedeemController::create
 * @see app/Http/Controllers/VoucherRedeemController.php:20
 * @route '/vouchers/redeem'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoucherRedeemController::create
 * @see app/Http/Controllers/VoucherRedeemController.php:20
 * @route '/vouchers/redeem'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

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

/**
* @see \App\Http\Controllers\VoucherRedeemController::voidMethod
 * @see app/Http/Controllers/VoucherRedeemController.php:97
 * @route '/vouchers/redemptions/{voucherRedemption}/void'
 */
export const voidMethod = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voidMethod.url(args, options),
    method: 'post',
})

voidMethod.definition = {
    methods: ["post"],
    url: '/vouchers/redemptions/{voucherRedemption}/void',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoucherRedeemController::voidMethod
 * @see app/Http/Controllers/VoucherRedeemController.php:97
 * @route '/vouchers/redemptions/{voucherRedemption}/void'
 */
voidMethod.url = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { voucherRedemption: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { voucherRedemption: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    voucherRedemption: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        voucherRedemption: typeof args.voucherRedemption === 'object'
                ? args.voucherRedemption.id
                : args.voucherRedemption,
                }

    return voidMethod.definition.url
            .replace('{voucherRedemption}', parsedArgs.voucherRedemption.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherRedeemController::voidMethod
 * @see app/Http/Controllers/VoucherRedeemController.php:97
 * @route '/vouchers/redemptions/{voucherRedemption}/void'
 */
voidMethod.post = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voidMethod.url(args, options),
    method: 'post',
})
const VoucherRedeemController = { create, check, store, voidMethod, void: voidMethod }

export default VoucherRedeemController