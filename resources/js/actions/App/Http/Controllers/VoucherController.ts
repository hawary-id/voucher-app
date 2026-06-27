import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
const VoucherController = { voidMethod, void: voidMethod }

export default VoucherController