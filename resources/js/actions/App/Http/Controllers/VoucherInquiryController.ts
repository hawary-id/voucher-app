import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VoucherInquiryController::create
 * @see app/Http/Controllers/VoucherInquiryController.php:19
 * @route '/vouchers/inquiry'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/vouchers/inquiry',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoucherInquiryController::create
 * @see app/Http/Controllers/VoucherInquiryController.php:19
 * @route '/vouchers/inquiry'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherInquiryController::create
 * @see app/Http/Controllers/VoucherInquiryController.php:19
 * @route '/vouchers/inquiry'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoucherInquiryController::create
 * @see app/Http/Controllers/VoucherInquiryController.php:19
 * @route '/vouchers/inquiry'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VoucherInquiryController::search
 * @see app/Http/Controllers/VoucherInquiryController.php:39
 * @route '/vouchers/inquiry'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: search.url(options),
    method: 'post',
})

search.definition = {
    methods: ["post"],
    url: '/vouchers/inquiry',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoucherInquiryController::search
 * @see app/Http/Controllers/VoucherInquiryController.php:39
 * @route '/vouchers/inquiry'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherInquiryController::search
 * @see app/Http/Controllers/VoucherInquiryController.php:39
 * @route '/vouchers/inquiry'
 */
search.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: search.url(options),
    method: 'post',
})
const VoucherInquiryController = { create, search }

export default VoucherInquiryController