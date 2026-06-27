import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
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
const inquiry = {
    search: Object.assign(search, search),
}

export default inquiry