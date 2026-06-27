import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
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
const redemptions = {
    void: Object.assign(voidMethod, voidMethod),
}

export default redemptions