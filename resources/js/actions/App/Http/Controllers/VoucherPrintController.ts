import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VoucherPrintController::__invoke
 * @see app/Http/Controllers/VoucherPrintController.php:15
 * @route '/voucher-print'
 */
const VoucherPrintController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: VoucherPrintController.url(options),
    method: 'get',
})

VoucherPrintController.definition = {
    methods: ["get","head"],
    url: '/voucher-print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoucherPrintController::__invoke
 * @see app/Http/Controllers/VoucherPrintController.php:15
 * @route '/voucher-print'
 */
VoucherPrintController.url = (options?: RouteQueryOptions) => {
    return VoucherPrintController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherPrintController::__invoke
 * @see app/Http/Controllers/VoucherPrintController.php:15
 * @route '/voucher-print'
 */
VoucherPrintController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: VoucherPrintController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoucherPrintController::__invoke
 * @see app/Http/Controllers/VoucherPrintController.php:15
 * @route '/voucher-print'
 */
VoucherPrintController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: VoucherPrintController.url(options),
    method: 'head',
})
export default VoucherPrintController