import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VoucherClaimController::index
 * @see app/Http/Controllers/VoucherClaimController.php:20
 * @route '/voucher-claims'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/voucher-claims',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoucherClaimController::index
 * @see app/Http/Controllers/VoucherClaimController.php:20
 * @route '/voucher-claims'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherClaimController::index
 * @see app/Http/Controllers/VoucherClaimController.php:20
 * @route '/voucher-claims'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoucherClaimController::index
 * @see app/Http/Controllers/VoucherClaimController.php:20
 * @route '/voucher-claims'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VoucherClaimController::bulkClaim
 * @see app/Http/Controllers/VoucherClaimController.php:124
 * @route '/voucher-claims/bulk-claim'
 */
export const bulkClaim = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkClaim.url(options),
    method: 'post',
})

bulkClaim.definition = {
    methods: ["post"],
    url: '/voucher-claims/bulk-claim',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoucherClaimController::bulkClaim
 * @see app/Http/Controllers/VoucherClaimController.php:124
 * @route '/voucher-claims/bulk-claim'
 */
bulkClaim.url = (options?: RouteQueryOptions) => {
    return bulkClaim.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherClaimController::bulkClaim
 * @see app/Http/Controllers/VoucherClaimController.php:124
 * @route '/voucher-claims/bulk-claim'
 */
bulkClaim.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkClaim.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VoucherClaimController::bulkPay
 * @see app/Http/Controllers/VoucherClaimController.php:159
 * @route '/voucher-claims/bulk-pay'
 */
export const bulkPay = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkPay.url(options),
    method: 'post',
})

bulkPay.definition = {
    methods: ["post"],
    url: '/voucher-claims/bulk-pay',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoucherClaimController::bulkPay
 * @see app/Http/Controllers/VoucherClaimController.php:159
 * @route '/voucher-claims/bulk-pay'
 */
bulkPay.url = (options?: RouteQueryOptions) => {
    return bulkPay.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherClaimController::bulkPay
 * @see app/Http/Controllers/VoucherClaimController.php:159
 * @route '/voucher-claims/bulk-pay'
 */
bulkPay.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkPay.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VoucherClaimController::show
 * @see app/Http/Controllers/VoucherClaimController.php:52
 * @route '/voucher-claims/{voucherRedemption}'
 */
export const show = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/voucher-claims/{voucherRedemption}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoucherClaimController::show
 * @see app/Http/Controllers/VoucherClaimController.php:52
 * @route '/voucher-claims/{voucherRedemption}'
 */
show.url = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{voucherRedemption}', parsedArgs.voucherRedemption.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherClaimController::show
 * @see app/Http/Controllers/VoucherClaimController.php:52
 * @route '/voucher-claims/{voucherRedemption}'
 */
show.get = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoucherClaimController::show
 * @see app/Http/Controllers/VoucherClaimController.php:52
 * @route '/voucher-claims/{voucherRedemption}'
 */
show.head = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VoucherClaimController::claim
 * @see app/Http/Controllers/VoucherClaimController.php:64
 * @route '/voucher-claims/{voucherRedemption}/claim'
 */
export const claim = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: claim.url(args, options),
    method: 'post',
})

claim.definition = {
    methods: ["post"],
    url: '/voucher-claims/{voucherRedemption}/claim',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoucherClaimController::claim
 * @see app/Http/Controllers/VoucherClaimController.php:64
 * @route '/voucher-claims/{voucherRedemption}/claim'
 */
claim.url = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return claim.definition.url
            .replace('{voucherRedemption}', parsedArgs.voucherRedemption.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherClaimController::claim
 * @see app/Http/Controllers/VoucherClaimController.php:64
 * @route '/voucher-claims/{voucherRedemption}/claim'
 */
claim.post = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: claim.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VoucherClaimController::pay
 * @see app/Http/Controllers/VoucherClaimController.php:94
 * @route '/voucher-claims/{voucherRedemption}/pay'
 */
export const pay = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pay.url(args, options),
    method: 'post',
})

pay.definition = {
    methods: ["post"],
    url: '/voucher-claims/{voucherRedemption}/pay',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoucherClaimController::pay
 * @see app/Http/Controllers/VoucherClaimController.php:94
 * @route '/voucher-claims/{voucherRedemption}/pay'
 */
pay.url = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return pay.definition.url
            .replace('{voucherRedemption}', parsedArgs.voucherRedemption.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherClaimController::pay
 * @see app/Http/Controllers/VoucherClaimController.php:94
 * @route '/voucher-claims/{voucherRedemption}/pay'
 */
pay.post = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pay.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VoucherClaimController::voidClaim
 * @see app/Http/Controllers/VoucherClaimController.php:194
 * @route '/voucher-claims/{voucherRedemption}/void-claim'
 */
export const voidClaim = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voidClaim.url(args, options),
    method: 'post',
})

voidClaim.definition = {
    methods: ["post"],
    url: '/voucher-claims/{voucherRedemption}/void-claim',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoucherClaimController::voidClaim
 * @see app/Http/Controllers/VoucherClaimController.php:194
 * @route '/voucher-claims/{voucherRedemption}/void-claim'
 */
voidClaim.url = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return voidClaim.definition.url
            .replace('{voucherRedemption}', parsedArgs.voucherRedemption.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherClaimController::voidClaim
 * @see app/Http/Controllers/VoucherClaimController.php:194
 * @route '/voucher-claims/{voucherRedemption}/void-claim'
 */
voidClaim.post = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voidClaim.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VoucherClaimController::voidPay
 * @see app/Http/Controllers/VoucherClaimController.php:222
 * @route '/voucher-claims/{voucherRedemption}/void-pay'
 */
export const voidPay = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voidPay.url(args, options),
    method: 'post',
})

voidPay.definition = {
    methods: ["post"],
    url: '/voucher-claims/{voucherRedemption}/void-pay',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoucherClaimController::voidPay
 * @see app/Http/Controllers/VoucherClaimController.php:222
 * @route '/voucher-claims/{voucherRedemption}/void-pay'
 */
voidPay.url = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return voidPay.definition.url
            .replace('{voucherRedemption}', parsedArgs.voucherRedemption.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherClaimController::voidPay
 * @see app/Http/Controllers/VoucherClaimController.php:222
 * @route '/voucher-claims/{voucherRedemption}/void-pay'
 */
voidPay.post = (args: { voucherRedemption: string | number | { id: string | number } } | [voucherRedemption: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: voidPay.url(args, options),
    method: 'post',
})
const VoucherClaimController = { index, bulkClaim, bulkPay, show, claim, pay, voidClaim, voidPay }

export default VoucherClaimController