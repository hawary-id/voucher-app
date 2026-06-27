import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import redeem1f6833 from './redeem'
import redemptions from './redemptions'
import inquiry52e922 from './inquiry'
/**
* @see \App\Http\Controllers\VoucherRedeemController::redeem
 * @see app/Http/Controllers/VoucherRedeemController.php:20
 * @route '/vouchers/redeem'
 */
export const redeem = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redeem.url(options),
    method: 'get',
})

redeem.definition = {
    methods: ["get","head"],
    url: '/vouchers/redeem',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoucherRedeemController::redeem
 * @see app/Http/Controllers/VoucherRedeemController.php:20
 * @route '/vouchers/redeem'
 */
redeem.url = (options?: RouteQueryOptions) => {
    return redeem.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherRedeemController::redeem
 * @see app/Http/Controllers/VoucherRedeemController.php:20
 * @route '/vouchers/redeem'
 */
redeem.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redeem.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoucherRedeemController::redeem
 * @see app/Http/Controllers/VoucherRedeemController.php:20
 * @route '/vouchers/redeem'
 */
redeem.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: redeem.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VoucherInquiryController::inquiry
 * @see app/Http/Controllers/VoucherInquiryController.php:19
 * @route '/vouchers/inquiry'
 */
export const inquiry = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inquiry.url(options),
    method: 'get',
})

inquiry.definition = {
    methods: ["get","head"],
    url: '/vouchers/inquiry',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoucherInquiryController::inquiry
 * @see app/Http/Controllers/VoucherInquiryController.php:19
 * @route '/vouchers/inquiry'
 */
inquiry.url = (options?: RouteQueryOptions) => {
    return inquiry.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherInquiryController::inquiry
 * @see app/Http/Controllers/VoucherInquiryController.php:19
 * @route '/vouchers/inquiry'
 */
inquiry.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inquiry.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoucherInquiryController::inquiry
 * @see app/Http/Controllers/VoucherInquiryController.php:19
 * @route '/vouchers/inquiry'
 */
inquiry.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: inquiry.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VoucherController::voidMethod
 * @see app/Http/Controllers/VoucherController.php:13
 * @route '/vouchers/{voucher}/void'
 */
export const voidMethod = (args: { voucher: string | number | { id: string | number } } | [voucher: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voidMethod.url(args, options),
    method: 'post',
})

voidMethod.definition = {
    methods: ["post"],
    url: '/vouchers/{voucher}/void',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoucherController::voidMethod
 * @see app/Http/Controllers/VoucherController.php:13
 * @route '/vouchers/{voucher}/void'
 */
voidMethod.url = (args: { voucher: string | number | { id: string | number } } | [voucher: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { voucher: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { voucher: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    voucher: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        voucher: typeof args.voucher === 'object'
                ? args.voucher.id
                : args.voucher,
                }

    return voidMethod.definition.url
            .replace('{voucher}', parsedArgs.voucher.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherController::voidMethod
 * @see app/Http/Controllers/VoucherController.php:13
 * @route '/vouchers/{voucher}/void'
 */
voidMethod.post = (args: { voucher: string | number | { id: string | number } } | [voucher: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voidMethod.url(args, options),
    method: 'post',
})
const vouchers = {
    redeem: Object.assign(redeem, redeem1f6833),
redemptions: Object.assign(redemptions, redemptions),
inquiry: Object.assign(inquiry, inquiry52e922),
void: Object.assign(voidMethod, voidMethod),
}

export default vouchers