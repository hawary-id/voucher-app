import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:20
 * @route '/stores'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/stores',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:20
 * @route '/stores'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:20
 * @route '/stores'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StoreController::index
 * @see app/Http/Controllers/StoreController.php:20
 * @route '/stores'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\StoreController::create
 * @see app/Http/Controllers/StoreController.php:36
 * @route '/stores/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/stores/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StoreController::create
 * @see app/Http/Controllers/StoreController.php:36
 * @route '/stores/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StoreController::create
 * @see app/Http/Controllers/StoreController.php:36
 * @route '/stores/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StoreController::create
 * @see app/Http/Controllers/StoreController.php:36
 * @route '/stores/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\StoreController::store
 * @see app/Http/Controllers/StoreController.php:43
 * @route '/stores'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/stores',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StoreController::store
 * @see app/Http/Controllers/StoreController.php:43
 * @route '/stores'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StoreController::store
 * @see app/Http/Controllers/StoreController.php:43
 * @route '/stores'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\StoreController::edit
 * @see app/Http/Controllers/StoreController.php:60
 * @route '/stores/{store}/edit'
 */
export const edit = (args: { store: string | number | { id: string | number } } | [store: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/stores/{store}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StoreController::edit
 * @see app/Http/Controllers/StoreController.php:60
 * @route '/stores/{store}/edit'
 */
edit.url = (args: { store: string | number | { id: string | number } } | [store: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { store: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { store: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    store: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        store: typeof args.store === 'object'
                ? args.store.id
                : args.store,
                }

    return edit.definition.url
            .replace('{store}', parsedArgs.store.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StoreController::edit
 * @see app/Http/Controllers/StoreController.php:60
 * @route '/stores/{store}/edit'
 */
edit.get = (args: { store: string | number | { id: string | number } } | [store: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StoreController::edit
 * @see app/Http/Controllers/StoreController.php:60
 * @route '/stores/{store}/edit'
 */
edit.head = (args: { store: string | number | { id: string | number } } | [store: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\StoreController::update
 * @see app/Http/Controllers/StoreController.php:70
 * @route '/stores/{store}'
 */
export const update = (args: { store: string | number | { id: string | number } } | [store: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/stores/{store}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\StoreController::update
 * @see app/Http/Controllers/StoreController.php:70
 * @route '/stores/{store}'
 */
update.url = (args: { store: string | number | { id: string | number } } | [store: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { store: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { store: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    store: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        store: typeof args.store === 'object'
                ? args.store.id
                : args.store,
                }

    return update.definition.url
            .replace('{store}', parsedArgs.store.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StoreController::update
 * @see app/Http/Controllers/StoreController.php:70
 * @route '/stores/{store}'
 */
update.put = (args: { store: string | number | { id: string | number } } | [store: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\StoreController::update
 * @see app/Http/Controllers/StoreController.php:70
 * @route '/stores/{store}'
 */
update.patch = (args: { store: string | number | { id: string | number } } | [store: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\StoreController::destroy
 * @see app/Http/Controllers/StoreController.php:89
 * @route '/stores/{store}'
 */
export const destroy = (args: { store: string | number | { id: string | number } } | [store: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/stores/{store}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\StoreController::destroy
 * @see app/Http/Controllers/StoreController.php:89
 * @route '/stores/{store}'
 */
destroy.url = (args: { store: string | number | { id: string | number } } | [store: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { store: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { store: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    store: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        store: typeof args.store === 'object'
                ? args.store.id
                : args.store,
                }

    return destroy.definition.url
            .replace('{store}', parsedArgs.store.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StoreController::destroy
 * @see app/Http/Controllers/StoreController.php:89
 * @route '/stores/{store}'
 */
destroy.delete = (args: { store: string | number | { id: string | number } } | [store: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const StoreController = { index, create, store, edit, update, destroy }

export default StoreController