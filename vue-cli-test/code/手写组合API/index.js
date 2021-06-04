// shallowReactive（浅劫持）与reactive（深度劫持）
// 创建一个处理器（handler）对象
const reactiveHandler = {
    // 通过Reflect实现对数据的劫持操作
    // 获取属性
    get(target, prop) {
        // 判断属性是不是_is_reactive 如果是，返回true
        if (prop === '_is_reactive') return true
        const result = Reflect.get(target, prop)
        console.log('劫持了获取属性', target, prop);
        return result
    },
    // 修改属性值或新增属性
    set(target, prop, value) {
        const result = Reflect.set(target, prop, value)
        console.log('劫持了修改属性值或新增属性', target, prop, value);
        return result
    },
    // 删除属性
    deleteProperty(target, prop) {
        const result = Reflect.deleteProperty(target, prop)
        console.log('劫持了删除属性', target, prop);
        return result
    }
}

// 定义一个shallowReactive函数，传入一个目标对象
// eslint-disable-next-line no-unused-vars
function shallowReactive(target) {
    // 判断传入的是否是数组/对象
    if (target && typeof target === 'object') {
        // 通过proxy来实现数据劫持操作
        return new Proxy(target, reactiveHandler)
    }
    return target
}

// 定义一个reactive函数
// eslint-disable-next-line no-unused-vars
function reactive(target) {
    // 判断传入的是否是数组/对象
    if (target && typeof target === 'object') {
        // 由于reactive是深度劫持，所以要对其内部元素进行递归处理
        // 因为对象和数组的操作方式不一样，所以要进行判断
        if (Array.isArray(target)) {
            target.forEach((item, index) => {
                // 对里面的每个元素都进行递归操作
                target[index] = reactive(item)
            })
        } else {
            // 对象的遍历
            Object.keys(target).forEach(key => {
                target[key] = reactive(target[key])
            })
        }
        // 通过proxy来实现数据劫持操作
        return new Proxy(target, reactiveHandler)
    }
    return target
}


// 定义readonlyHandler对象
const readonlyHandler = {
    // 通过Reflect实现对数据的劫持操作
    // 获取属性
    get(target, prop) {
        // 判断属性是不是_is_readonly 如果是，返回true
        if (prop === '_is_readonly') return true
        const result = Reflect.get(target, prop)
        console.log('劫持了获取属性', target, prop);
        return result
    },
    // 修改属性值或新增属性
    set() {
        console.warn('只能读取数据，不能修改或添加数据');
        return true
    },
    // 删除属性
    deleteProperty() {
        console.warn('只能读取数据，不能删除数据');
        return true
    }
}


// 定义一个shallowReadonly函数
// eslint-disable-next-line no-unused-vars
function shallowReadonly(target) {
    // 判断传入的是否是数组/对象
    if (target && typeof target === 'object') {
        // 通过proxy来实现数据劫持操作
        return new Proxy(target, readonlyHandler)
    }
    return target
}
// 定义一个readonly函数
// eslint-disable-next-line no-unused-vars
function readonly(target) {
    // 判断传入的是否是数组/对象
    if (target && typeof target === 'object') {
        // 由于reactive是深度劫持，所以要对其内部元素进行递归处理
        // 因为对象和数组的操作方式不一样，所以要进行判断
        if (Array.isArray(target)) {
            target.forEach((item, index) => {
                // 对里面的每个元素都进行递归操作
                target[index] = readonly(item)
            })
        } else {
            // 对象的遍历
            Object.keys(target).forEach(key => {
                target[key] = readonly(target[key])
            })
        }
        // 通过proxy来实现数据劫持操作
        return new Proxy(target, readonlyHandler)
    }
    return target
}


// 定义一个shallowRef函数
// eslint-disable-next-line no-unused-vars
function shallowRef(target) {
    return {
        // 保存target数据
        _value: target,
        get value() {
            console.log('劫持到了读取数据');
            return this._value
        },
        set value(val) {
            this._value = val
            console.log('劫持到了修改数据');
        }
    }
}
// 定义一个ref函数
// eslint-disable-next-line no-unused-vars
function ref(target) {
    // ref中传入对象，对数据进行reactive处理，
    target = reactive(target)
    return {
        _is_ref: true, // 标识当前对象是ref对象
        // 保存target数据
        _value: target,
        get value() {
            console.log('劫持到了读取数据');
            return this._value
        },
        set value(val) {
            this._value = val
            console.log('劫持到了修改数据');
        }
    }
}

// 定义一个isRef函数，判断当前函数是不是ref对象
// eslint-disable-next-line no-unused-vars
function isRef(obj) {
    // ref函数中有定义字段
    return obj && obj._is_ref
}
// 定义一个isReactive函数，判断当前函数是不是reactive对象
// eslint-disable-next-line no-unused-vars
function isReactive(obj) {
    // reactiveHandler中有判断
    return obj && obj._is_reactive
}
// 定义一个isReadonly函数，判断当前函数是不是readonly对象
// eslint-disable-next-line no-unused-vars
function isReadonly(obj) {
    // readonlyHandler中有判断
    return obj && obj._is_readonly
}
// 定义一个isProxy函数，判断当前函数是不是reactive对象或者readonly对象 (无论是reactive对象还是readonly对象，他们都属于代理对象)
// eslint-disable-next-line no-unused-vars
function isProxy(obj) {
    return isReactive(obj) || isReadonly(obj)
}