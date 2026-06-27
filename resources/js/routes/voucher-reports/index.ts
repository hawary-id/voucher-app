import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\VoucherReportController::index
 * @see app/Http/Controllers/VoucherReportController.php:21
 * @route '/voucher-reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/voucher-reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoucherReportController::index
 * @see app/Http/Controllers/VoucherReportController.php:21
 * @route '/voucher-reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherReportController::index
 * @see app/Http/Controllers/VoucherReportController.php:21
 * @route '/voucher-reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoucherReportController::index
 * @see app/Http/Controllers/VoucherReportController.php:21
 * @route '/voucher-reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VoucherReportController::print
 * @see app/Http/Controllers/VoucherReportController.php:65
 * @route '/voucher-reports/print'
 */
export const print = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(options),
    method: 'get',
})

print.definition = {
    methods: ["get","head"],
    url: '/voucher-reports/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoucherReportController::print
 * @see app/Http/Controllers/VoucherReportController.php:65
 * @route '/voucher-reports/print'
 */
print.url = (options?: RouteQueryOptions) => {
    return print.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherReportController::print
 * @see app/Http/Controllers/VoucherReportController.php:65
 * @route '/voucher-reports/print'
 */
print.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoucherReportController::print
 * @see app/Http/Controllers/VoucherReportController.php:65
 * @route '/voucher-reports/print'
 */
print.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: print.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VoucherReportController::exportMethod
 * @see app/Http/Controllers/VoucherReportController.php:82
 * @route '/voucher-reports/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/voucher-reports/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoucherReportController::exportMethod
 * @see app/Http/Controllers/VoucherReportController.php:82
 * @route '/voucher-reports/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherReportController::exportMethod
 * @see app/Http/Controllers/VoucherReportController.php:82
 * @route '/voucher-reports/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoucherReportController::exportMethod
 * @see app/Http/Controllers/VoucherReportController.php:82
 * @route '/voucher-reports/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})
const voucherReports = {
    index: Object.assign(index, index),
print: Object.assign(print, print),
export: Object.assign(exportMethod, exportMethod),
}

export default voucherReports