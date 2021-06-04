# Vue3

#### 认识Vue3

1. ##### 相关信息

   1. 正式版在2020年九月发布
   2. 支持Vue2中大部分的特性
   3. 更好的支持了typescript

2. ##### 提升

   1. 打包大小减少41%
   2. 初次渲染快55%，更新渲染快133%
   3. 内存减少54%
   4. 使用Proxy代替defineProperty实现数据响应式
   5. 重写虚拟DOM和Tree-Shaking

3. ##### 新增特性

   1. Composition（组合）API
   2. setup
      - ref和reactive
      - computed和watch
      - 新的生命周期函数
      - provide和reject
      - ...
   3. 新组件
      - Fragment 文档碎片
      - Teleport  瞬移组件的位置
      - Suspense 异步组件
   4. 其他API更新
      - 全局API修改
      - 将原来的全局API转移到应用对象
      - 模板语法变化

#### 生命周期

1. ##### 与 2.x 版本生命周期相对应的组合式 API

   - `beforeCreate` -> 使用 `setup()`
   - `created` -> 使用 `setup()`
   - `beforeMount` -> `onBeforeMount`
   - `mounted` -> `onMounted`
   - `beforeUpdate` -> `onBeforeUpdate`
   - `updated` -> `onUpdated`
   - `beforeDestroy` -> `onBeforeUnmount`
   - `destroyed` -> `onUnmounted`
   - `errorCaptured` -> `onErrorCaptured`

2. ##### 图示

   - Vue2

     ![Vue2 实例生命周期](https://cn.vuejs.org/images/lifecycle.png)

   - Vue3

     ![vue3实例的生命周期](https://v3.cn.vuejs.org/images/lifecycle.svg)

     

#### 创建项目

1. ##### 使用vue-cli创建 https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

   ```
   npm install -g @vue/cli
   // 必须保证vue cli 版本在4.5.0以上
   vue create my-project
   ```

   

2. ##### 使用vite创建 https://v3.cn.vuejs.org/guide/installation.html

   ```
   yarn create @vitejs/app
   ```



#### Composition API https://composition-api.vuejs.org/zh/api.html

1. ##### setup

   - 新的option, 所有的组合API函数都在此使用, 只在初始化时执行一次
   - 在beforeCreated之前执行, 此时组件对象还没有创建,this是undefined,不能通过this来访问data/computed/methods / props 
   - 函数如果返回对象, 对象中的属性或方法, 模板中可以直接使用,
     - 返回对象中的属性会与data函数返回对象的属性合并成为组件对象的属性
     - 返回对象中的方法会与methods中的方法合并成功组件对象的方法.
     - 如果有重名, setup优先
     - 一般不要混合使用: methods中可以访问setup提供的属性和方法, 但在setup方法中不能访问data和methods
   - setup的参数
     - setup(props, context) / setup(props, {attrs, slots, emit})
     - props: 包含props配置声明且传入了的所有属性的对象
     - attrs: 包含没有在props配置中声明的属性的对象, 相当于 this.$attrs
     - slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
     - emit: 用来分发自定义事件的函数, 相当于 this.$emit

   ```vue
   <script>
   export default {
     setup () {
       return {}
     }
   }
   </script>
   ```

   

2. ##### ref

   - 作用: 定义一个数据的响应式
   - 语法: const xxx = ref(initValue):
     - 创建一个包含响应式数据的引用(reference)对象
     - js中操作数据: xxx.value
     - 模板中操作数据: 不需要.value
   - 一般用来定义一个基本类型的响应式数据
   - 如果用ref对象/数组, 内部会自动将对象/数组转换为reactive的代理对象
   - 递归深度响应式

   ```vue
   <script>
   import {
     ref
   } from 'vue'
   export default {
     setup () {
   
       // 定义响应式数据 ref对象
       const count = ref(1)
       console.log(count)
   
       // 更新响应式数据的函数
       function update () {
         // alert('update')
         count.value = count.value + 1
       }
   
       return {
         count,
         update
       }
     }
   }
   </script>
   ```

3. ##### reactive

   - 作用: 定义多个数据的响应式
   - const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
   - 通过使用Proxy来实现对对象内部所有数据的劫持, 并通过Reflect操作对象内部数据
   - 递归深度响应式

   ```vue
   <template>
     <h2>name: {{state.name}}</h2>
     <h2>age: {{state.age}}</h2>
     <h2>wife: {{state.wife}}</h2>
     <hr>
     <button @click="update">更新</button>
   </template>
   
   <script>
   /* 
   reactive: 
       作用: 定义多个数据的响应式
       const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
       响应式转换是“深层的”：会影响对象内部所有嵌套的属性
       内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
   */
   import {
     reactive,
   } from 'vue'
   export default {
     setup () {
       /* 
       定义响应式数据对象
       */
       const state = reactive({
         name: 'tom',
         age: 25,
         wife: {
           name: 'marry',
           age: 22
         },
       })
       console.log(state, state.wife)
   
       const update = () => {
         state.name += '--'
         state.age += 1
         state.wife.name += '++'
         state.wife.age += 2
       }
   
       return {
         state,
         update,
       }
     }
   }
   </script>
   ```

4. ##### 计算属性和监视

   - computed
     - 与computed配置功能一致
   - watch
     - 与watch配置功能一致
     - 监视指定的一个或多个响应式数据, 一旦数据变化, 就自动执行监视回调
     - 默认初始时不执行回调, 但可以通过配置immediate为true, 来指定初始时立即执行第一次
     - 通过配置deep为true, 来指定深度监视
   - watchEffect
     - 不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
     - 默认初始时就会执行第一次, 从而可以收集需要监视的数据
     - 监视数据发生变化时回调

   ```vue
   <template>
     <h2>App</h2>
     fistName: <input v-model="user.firstName"/><br>
     lastName: <input v-model="user.lastName"/><br>
     fullName1: <input v-model="fullName1"/><br>
     fullName2: <input v-model="fullName2"><br>
     fullName3: <input v-model="fullName3"><br>
   
   </template>
   
   <script lang="ts">
   /*
   计算属性与监视
   1. computed函数: 
     与computed配置功能一致
     只有getter
     有getter和setter
   2. watch函数
     与watch配置功能一致
     监视指定的一个或多个响应式数据, 一旦数据变化, 就自动执行监视回调
     默认初始时不执行回调, 但可以通过配置immediate为true, 来指定初始时立即执行第一次
     通过配置deep为true, 来指定深度监视
   3. watchEffect函数
     不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
     默认初始时就会执行第一次, 从而可以收集需要监视的数据
     监视数据发生变化时回调
   */
   
   import {
     reactive,
     ref,
     computed,
     watch,
     watchEffect
   } from 'vue'
   
   export default {
   
     setup () {
       const user = reactive({
         firstName: 'A',
         lastName: 'B'
       })
   
       // 只有getter的计算属性
       const fullName1 = computed(() => {
         console.log('fullName1')
         return user.firstName + '-' + user.lastName
       })
   
       // 有getter与setter的计算属性
       const fullName2 = computed({
         get () {
           console.log('fullName2 get')
           return user.firstName + '-' + user.lastName
         },
   
         set (value: string) {
           console.log('fullName2 set')
           const names = value.split('-')
           user.firstName = names[0]
           user.lastName = names[1]
         }
       })
   
       const fullName3 = ref('')
   
       /* 
       watchEffect: 监视所有回调中使用的数据
       */
       /* 
       watchEffect(() => {
         console.log('watchEffect')
         fullName3.value = user.firstName + '-' + user.lastName
       }) 
       */
   
       /* 
       使用watch的2个特性:
         深度监视
         初始化立即执行
       */
       watch(user, () => {
         fullName3.value = user.firstName + '-' + user.lastName
       }, {
         immediate: true,  // 是否初始化立即执行一次, 默认是false
         deep: true, // 是否是深度监视, 默认是false
       })
   
       /* 
       watch一个数据
         默认在数据发生改变时执行回调
       */
       watch(fullName3, (value) => {
         console.log('watch')
         const names = value.split('-')
         user.firstName = names[0]
         user.lastName = names[1]
       })
   
       /* 
       watch多个数据: 
         使用数组来指定
         如果是ref对象, 直接指定
         如果是reactive对象中的属性,  必须通过函数来指定
       */
       watch([() => user.firstName, () => user.lastName, fullName3], (values) => {
         console.log('监视多个数据', values)
       })
   
       return {
         user,
         fullName1,
         fullName2,
         fullName3
       }
     }
   }
   </script>
   ```

5. ##### toRefs

   - 把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref
   - 当从合成函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用

   ```vue
   <template>
     <h2>App</h2>
     <h3>foo: {{foo}}</h3>
     <h3>bar: {{bar}}</h3>
     <h3>foo2: {{foo2}}</h3>
     <h3>bar2: {{bar2}}</h3>
   
   
   </template>
   
   <script lang="ts">
   import { reactive, toRefs } from 'vue'
   /*
   toRefs:
     将响应式对象中所有属性包装为ref对象, 并返回包含这些ref对象的普通对象
     应用: 当从合成函数返回响应式对象时，toRefs 非常有用，
           这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用
   */
   export default {
   
     setup () {
   
       const state = reactive({
         foo: 'a',
         bar: 'b',
       })
   
       const stateAsRefs = toRefs(state)
   
       setTimeout(() => {
         state.foo += '++'
         state.bar += '++'
       }, 2000);
   
       const {foo2, bar2} = useReatureX()
   
       return {
         // ...state,
         ...stateAsRefs,
         foo2, 
         bar2
       }
     },
   }
   
   function useReatureX() {
     const state = reactive({
       foo2: 'a',
       bar2: 'b',
     })
   
     setTimeout(() => {
       state.foo2 += '++'
       state.bar2 += '++'
     }, 2000);
   
     return toRefs(state)
   }
   
   </script>
   ```

6. ##### ref

   - 利用ref函数获取组件中的标签元素

   ```vue
   <template>
     <h2>App</h2>
     <input type="text">---
     <input type="text" ref="inputRef">
   </template>
   
   <script lang="ts">
   import { onMounted, ref } from 'vue'
   /* 
   ref获取元素: 利用ref函数获取组件中的标签元素
   功能需求: 让输入框自动获取焦点
   */
   export default {
     setup() {
       const inputRef = ref<HTMLElement|null>(null)
   
       onMounted(() => {
         inputRef.value && inputRef.value.focus()
       })
   
       return {
         inputRef
       }
     },
   }
   </script>
   ```

7. ##### shallowReactive 与 shallowRef

   - shallowReactive : 只处理了对象内最外层属性的响应式(也就是浅响应式)
   - shallowRef: 只处理了value的响应式, 不进行对象的reactive处理
   - 什么时候用浅响应式呢?
     - 一般情况下使用ref和reactive即可
     - 如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
     - 如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef

   ```vue
   <template>
     <h2>App</h2>
   
     <h3>m1: {{m1}}</h3>
     <h3>m2: {{m2}}</h3>
     <h3>m3: {{m3}}</h3>
     <h3>m4: {{m4}}</h3>
   
     <button @click="update">更新</button>
   </template>
   
   <script lang="ts">
   import { reactive, ref, shallowReactive, shallowRef } from 'vue'
   /* 
   shallowReactive与shallowRef
     shallowReactive: 只处理了对象内最外层属性的响应式(也就是浅响应式)
     shallowRef: 只处理了value的响应式, 不进行对象的reactive处理
   总结:
     reactive与ref实现的是深度响应式, 而shallowReactive与shallowRef是浅响应式
     什么时候用浅响应式呢?
       一般情况下使用ref和reactive即可,
       如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
       如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef
   */
   
   export default {
   
     setup () {
   
       const m1 = reactive({a: 1, b: {c: 2}})
       const m2 = shallowReactive({a: 1, b: {c: 2}})
   
       const m3 = ref({a: 1, b: {c: 2}})
       const m4 = shallowRef({a: 1, b: {c: 2}})
   
       const update = () => {
         // m1.b.c += 1
         // m2.b.c += 1
   
         // m3.value.a += 1
         m4.value.a += 1
       }
   
       return {
         m1,
         m2,
         m3,
         m4,
         update,
       }
     }
   }
   </script>
   ```

   

8. ##### readonly 与 shallowReadonly

   - readonly:
     - 深度只读数据
     - 获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
     - 只读代理是深层的：访问的任何嵌套 property 也是只读的。
   - shallowReadonly
     - 浅只读数据
     - 创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换
   - 应用场景:
     - 在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除

   ```vue
   <template>
     <h2>App</h2>
     <h3>{{state}}</h3>
     <button @click="update">更新</button>
   </template>
   
   <script lang="ts">
   import { reactive, readonly, shallowReadonly } from 'vue'
   /*
   readonly: 深度只读数据
     获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
     只读代理是深层的：访问的任何嵌套 property 也是只读的。
   shallowReadonly: 浅只读数据
     创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 
   应用场景: 
     在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除
   */
   
   export default {
   
     setup () {
   
       const state = reactive({
         a: 1,
         b: {
           c: 2
         }
       })
   
       // const rState1 = readonly(state)
       const rState2 = shallowReadonly(state)
   
       const update = () => {
         // rState1.a++ // error
         // rState1.b.c++ // error
   
         // rState2.a++ // error
         rState2.b.c++
       }
       
       return {
         state,
         update
       }
     }
   }
   </script>
   ```

9. ##### toRaw 与 markRaw

   - toRaw
     - 返回由 `reactive` 或 `readonly` 方法转换成响应式代理的普通对象。
     - 这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发界面更新。
   - markRaw
     - 标记一个对象，使其永远不会转换为代理。返回对象本身
     - 应用场景:
       - 有些值不应被设置为响应式的，例如复杂的第三方类实例或 Vue 组件对象。
       - 当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能。

   ```vue
   <template>
     <h2>{{state}}</h2>
     <button @click="testToRaw">测试toRaw</button>
     <button @click="testMarkRaw">测试markRaw</button>
   </template>
   
   <script lang="ts">
   /* 
   toRaw: 得到reactive代理对象的目标数据对象
   */
   import {
     markRaw,
     reactive, toRaw,
   } from 'vue'
   export default {
     setup () {
       const state = reactive<any>({
         name: 'tom',
         age: 25,
       })
   
       const testToRaw = () => {
         const user = toRaw(state)
         user.age++  // 界面不会更新
   
       }
   
       const testMarkRaw = () => {
         const likes = ['a', 'b']
         // state.likes = likes
         state.likes = markRaw(likes) // likes数组就不再是响应式的了
         setTimeout(() => {
           state.likes[0] += '--'
         }, 1000)
       }
   
       return {
         state,
         testToRaw,
         testMarkRaw,
       }
     }
   }
   </script>
   ```

10. ##### toRef

    - 为源响应式对象上的某个属性创建一个 ref对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
    - 区别ref: 拷贝了一份新的数据值单独操作, 更新时相互不影响
    - 应用: 当要将 某个prop 的 ref 传递给复合函数时，toRef 很有用

    ```vue
    <template>
      <h2>App</h2>
      <p>{{state}}</p>
      <p>{{foo}}</p>
      <p>{{foo2}}</p>
    
      <button @click="update">更新</button>
    
      <Child :foo="foo"/>
    </template>
    
    <script lang="ts">
    /*
    toRef:
      为源响应式对象上的某个属性创建一个 ref对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
      区别ref: 拷贝了一份新的数据值单独操作, 更新时相互不影响
      应用: 当要将某个 prop 的 ref 传递给复合函数时，toRef 很有用
    */
    
    import {
      reactive,
      toRef,
      ref,
    } from 'vue'
    import Child from './Child.vue'
    
    export default {
    
      setup () {
    
        const state = reactive({
          foo: 1,
          bar: 2
        })
    
        const foo = toRef(state, 'foo')
        const foo2 = ref(state.foo)
    
        const update = () => {
          state.foo++
          // foo.value++
          // foo2.value++  // foo和state中的数据不会更新
        }
    
        return {
          state,
          foo,
          foo2,
          update,
        }
      },
    
      components: {
        Child
      }
    }
    </script>
    ```

    ```vue
    <template>
      <h2>Child</h2>
      <h3>{{foo}}</h3>
      <h3>{{length}}</h3>
    </template>
    
    <script lang="ts">
    import { computed, defineComponent, Ref, toRef } from 'vue'
    
    const component = defineComponent({
      props: {
        foo: {
          type: Number,
          require: true
        }
      },
    
      setup (props, context) {
        const length = useFeatureX(toRef(props, 'foo'))
    
        return {
          length
        }
      }
    })
    
    function useFeatureX(foo: Ref) {
      const lenth = computed(() => foo.value.length)
    
      return lenth
    }
    
    export default component
    </script>
    ```

11. ##### customRef

    - 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制，它需要一个工厂函数，该函数接收 `track` 和 `trigger` 函数作为参数，并且应该返回一个带有 `get` 和 `set` 的对象。
    - 需求: 使用 customRef 实现 debounce 的示例

    ```vue
    <template>
      <div>
        <h3>CustomRef的使用</h3>
        <input type="text" v-model="keyword" />
        <h4>{{ keyword }}</h4>
      </div>
    </template>
    
    <script lang="ts">
    import { customRef, defineComponent } from "vue";
    // 自定义hook防抖函数
    function useDebounceRef<T>(value: T, delay: number = 200) {
      // 准备存储定时器id的变量
      let timer: number;
      return customRef((track, tigger) => {
        return {
          // 返回数据
          get() {
            // 告诉Vue追踪数据
            track();
            return value;
          },
          set(newVal: T) {
            // 清除定时器
            clearTimeout(timer);
            // 开启定时器
            timer = setTimeout(() => {
              value = newVal;
              // 告诉Vue更新界面
              tigger();
            }, delay);
          }
        };
      });
    }
    
    export default defineComponent({
      setup() {
        const keyword = useDebounceRef("111", 500);
        return {
          keyword
        };
      }
    });
    </script>
    
    <style scoped>
    </style>
    ```

12. ##### provide 与 inject

    - provide`和`inject`提供依赖注入，功能类似 2.x 的`provide/inject
    - 实现跨层级组件(祖孙)间通信

13. ##### 响应式数据的判断

    - isRef: 检查一个值是否为一个 ref 对象
    - isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
    - isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
    - isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

#### 新组件

1. ##### Fragment（代码片段）

   - 在Vue2中: 组件必须有一个根标签
   - 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
   - 好处: 减少标签层级, 减小内存占用

   ```vue
   <template>
       <h2>aaaa</h2>
       <h2>aaaa</h2>
   </template>
   ```

2. ##### Teleport(瞬移)

   - Teleport 提供了一种干净的方法, 让组件的html在父组件界面外的特定标签(很可能是body)下插入显示

3. ##### Suspense(不确定的)

   - 它们允许我们的应用程序在等待异步组件时渲染一些后备内容，可以让我们创建一个平滑的用户体验

#### 模板语法变化

1. v-model的本质变化

   - prop：value -> modelValue；
   - event：input -> update:modelValue；

   ```vue
   <template>
     <div>
       <h3>v-model</h3>
   
       <button @click="openVisible = true">显示数据</button>
       <Child v-model:show="openVisible"></Child>
     </div>
   </template>
   
   <script lang="ts">
   import { defineComponent, ref } from "vue";
   import Child from "./components/child.vue";
   export default defineComponent({
     components: {
       Child
     },
     setup() {
       const openVisible = ref(false);
       return {
         openVisible
       };
     }
   });
   </script>
   
   <style scoped>
   </style>
   ```

   ```vue
   <template>
     <div>
       <transition name="fade">
         <!-- <div v-if="modelValue">
           <p>hello</p>
           <button @click="hideModal">关闭</button>
         </div> -->
         <div v-if="show">
           <p>hello</p>
           <button @click="hideModal">关闭</button>
         </div>
       </transition>
     </div>
   </template>
   
   <script lang="ts">
   import {
     defineComponent,
     onRenderTriggered,
     onActivated,
     onDeactivated,
     onErrorCaptured
   } from "vue";
   
   export default defineComponent({
     //   props: {
     //     modelValue: Boolean
     //   },
     //   emit: ["update:modelValue"],
     //   setup(props, context) {
     //     const hideModal = () => {
     //       context.emit("update:modelValue", false);
     //     };
   
     //     return {
     //       hideModal
     //     };
     //   }
     props: {
       show: Boolean
     },
     emits: ["update:show"],
     renderTriggered() {
       console.log(21321312);
     },
     setup(props, context) {
       const hideModal = () => {
         context.emit("update:show", false);
       };
       return {
         hideModal
       };
     }
   });
   </script>
   
   <style scoped>
   .fade-enter-active,
   .fade-leave-active {
     transition: opacity 0.5s ease;
   }
   
   .fade-enter-from,
   .fade-leave-to {
     opacity: 0;
   }
   </style>
   ```

   

2. .sync修改符已移除, 由v-model代替

3. v-if优先v-for解析

