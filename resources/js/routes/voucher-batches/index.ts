import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\VoucherBatchController::index
 * @see app/Http/Controllers/VoucherBatchController.php:21
 * @route '/voucher-batches'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/voucher-batches',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoucherBatchController::index
 * @see app/Http/Controllers/VoucherBatchController.php:21
 * @route '/voucher-batches'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherBatchController::index
 * @see app/Http/Controllers/VoucherBatchController.php:21
 * @route '/voucher-batches'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoucherBatchController::index
 * @see app/Http/Controllers/VoucherBatchController.php:21
 * @route '/voucher-batches'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VoucherBatchController::create
 * @see app/Http/Controllers/VoucherBatchController.php:37
 * @route '/voucher-batches/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/voucher-batches/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoucherBatchController::create
 * @see app/Http/Controllers/VoucherBatchController.php:37
 * @route '/voucher-batches/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherBatchController::create
 * @see app/Http/Controllers/VoucherBatchController.php:37
 * @route '/voucher-batches/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoucherBatchController::create
 * @see app/Http/Controllers/VoucherBatchController.php:37
 * @route '/voucher-batches/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VoucherBatchController::store
 * @see app/Http/Controllers/VoucherBatchController.php:50
 * @route '/voucher-batches'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/voucher-batches',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VoucherBatchController::store
 * @see app/Http/Controllers/VoucherBatchController.php:50
 * @route '/voucher-batches'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherBatchController::store
 * @see app/Http/Controllers/VoucherBatchController.php:50
 * @route '/voucher-batches'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VoucherBatchController::show
 * @see app/Http/Controllers/VoucherBatchController.php:113
 * @route '/voucher-batches/{voucher_batch}'
 */
export const show = (args: { voucher_batch: string | number | { id: string | number } } | [voucher_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/voucher-batches/{voucher_batch}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoucherBatchController::show
 * @see app/Http/Controllers/VoucherBatchController.php:113
 * @route '/voucher-batches/{voucher_batch}'
 */
show.url = (args: { voucher_batch: string | number | { id: string | number } } | [voucher_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { voucher_batch: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { voucher_batch: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    voucher_batch: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        voucher_batch: typeof args.voucher_batch === 'object'
                ? args.voucher_batch.id
                : args.voucher_batch,
                }

    return show.definition.url
            .replace('{voucher_batch}', parsedArgs.voucher_batch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherBatchController::show
 * @see app/Http/Controllers/VoucherBatchController.php:113
 * @route '/voucher-batches/{voucher_batch}'
 */
show.get = (args: { voucher_batch: string | number | { id: string | number } } | [voucher_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoucherBatchController::show
 * @see app/Http/Controllers/VoucherBatchController.php:113
 * @route '/voucher-batches/{voucher_batch}'
 */
show.head = (args: { voucher_batch: string | number | { id: string | number } } | [voucher_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VoucherBatchController::edit
 * @see app/Http/Controllers/VoucherBatchController.php:67
 * @route '/voucher-batches/{voucher_batch}/edit'
 */
export const edit = (args: { voucher_batch: string | number | { id: string | number } } | [voucher_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/voucher-batches/{voucher_batch}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VoucherBatchController::edit
 * @see app/Http/Controllers/VoucherBatchController.php:67
 * @route '/voucher-batches/{voucher_batch}/edit'
 */
edit.url = (args: { voucher_batch: string | number | { id: string | number } } | [voucher_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { voucher_batch: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { voucher_batch: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    voucher_batch: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        voucher_batch: typeof args.voucher_batch === 'object'
                ? args.voucher_batch.id
                : args.voucher_batch,
                }

    return edit.definition.url
            .replace('{voucher_batch}', parsedArgs.voucher_batch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherBatchController::edit
 * @see app/Http/Controllers/VoucherBatchController.php:67
 * @route '/voucher-batches/{voucher_batch}/edit'
 */
edit.get = (args: { voucher_batch: string | number | { id: string | number } } | [voucher_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VoucherBatchController::edit
 * @see app/Http/Controllers/VoucherBatchController.php:67
 * @route '/voucher-batches/{voucher_batch}/edit'
 */
edit.head = (args: { voucher_batch: string | number | { id: string | number } } | [voucher_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VoucherBatchController::update
 * @see app/Http/Controllers/VoucherBatchController.php:77
 * @route '/voucher-batches/{voucher_batch}'
 */
export const update = (args: { voucher_batch: string | number | { id: string | number } } | [voucher_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/voucher-batches/{voucher_batch}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\VoucherBatchController::update
 * @see app/Http/Controllers/VoucherBatchController.php:77
 * @route '/voucher-batches/{voucher_batch}'
 */
update.url = (args: { voucher_batch: string | number | { id: string | number } } | [voucher_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { voucher_batch: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { voucher_batch: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    voucher_batch: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        voucher_batch: typeof args.voucher_batch === 'object'
                ? args.voucher_batch.id
                : args.voucher_batch,
                }

    return update.definition.url
            .replace('{voucher_batch}', parsedArgs.voucher_batch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherBatchController::update
 * @see app/Http/Controllers/VoucherBatchController.php:77
 * @route '/voucher-batches/{voucher_batch}'
 */
update.put = (args: { voucher_batch: string | number | { id: string | number } } | [voucher_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\VoucherBatchController::update
 * @see app/Http/Controllers/VoucherBatchController.php:77
 * @route '/voucher-batches/{voucher_batch}'
 */
update.patch = (args: { voucher_batch: string | number | { id: string | number } } | [voucher_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VoucherBatchController::destroy
 * @see app/Http/Controllers/VoucherBatchController.php:96
 * @route '/voucher-batches/{voucher_batch}'
 */
export const destroy = (args: { voucher_batch: string | number | { id: string | number } } | [voucher_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/voucher-batches/{voucher_batch}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VoucherBatchController::destroy
 * @see app/Http/Controllers/VoucherBatchController.php:96
 * @route '/voucher-batches/{voucher_batch}'
 */
destroy.url = (args: { voucher_batch: string | number | { id: string | number } } | [voucher_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { voucher_batch: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { voucher_batch: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    voucher_batch: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        voucher_batch: typeof args.voucher_batch === 'object'
                ? args.voucher_batch.id
                : args.voucher_batch,
                }

    return destroy.definition.url
            .replace('{voucher_batch}', parsedArgs.voucher_batch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VoucherBatchController::destroy
 * @see app/Http/Controllers/VoucherBatchController.php:96
 * @route '/voucher-batches/{voucher_batch}'
 */
destroy.delete = (args: { voucher_batch: string | number | { id: string | number } } | [voucher_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const voucherBatches = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default voucherBatches