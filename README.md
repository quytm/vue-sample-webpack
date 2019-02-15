# Vuejs base project

<a href="https://web.higgsup.com/"><img src="higgsup-logo.png"></a>

## Introduction

Project được dựng dựa trên [vue-element-admin](http://panjiachen.github.io/vue-element-admin). 

## Command line cơ bản

### Run

```bash
# install dependency
npm install

# develop
npm run dev
```

Truy cập http://localhost:9527.

### Build

```bash
# build for test environment
npm run build:sit

# build for production environment
npm run build:prod
```

### Advanced

```bash
# --report to build with bundle size analytics
npm run build:prod --report

# --generate a bundle size analytics. default: bundle-report.html
npm run build:prod --generate_report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```

## Structure

```

Project/
├── build/     => Chứa thông tin build webpack
├── config/    => Các config của app, bao gồm cả env (dev, test, prod)
└── src/
|   ├── api               => tạo các request tới api, có sử dụng /utils/request
|   ├── assets            => chứa assets, trong đó có custom-theme (multi theme)
|   ├── components        => các components nhỏ của app
|   ├── directive         => các directive như v-permission, ...
|   ├── filters           => filters: format date, time, number, ...
|   ├── icons             => icons của app, ví dụ: dùng cho menubar
|   ├── lang              => chứa data cà config cho i18n
|   ├── mock              => mock api, không cần thiết backend vẫn có thể test
|   ├── router            => định nghĩa router, có thể chia nhỏ route thành nhiều modules để quản lý
|   ├── store             => quản lý state trong app sử dụng Vuex
|   ├── styles            => global styles 
|   ├── utils             => các utils
|   |   ├── auth.js                 => làm việc với token lưu trữ trong cookie
|   |   ├── i18n.js                 => làm mượt title trong sidebar 
|   |   ├── permission              => check permission, sử dụng cho ẩn hiển các element, component 
|   |   ├── request.js              => sử dụng axios để request lên backend
|   |   └── ...
|   ├── views             => mỗi view tương ứng với 1 màn hình
|   ├── App.vue
|   ├── errorLog.js
|   ├── main.js
|   └── permission.js
└─── static/    => static files
    └── tinymce4.7.5/     => tinymce
    
    
```


## Hướng dẫn khi tạo mới một trang

### Tạo trang

Tạo page mới có tên là `Register`

- Tạo thư mục `\views\register` (lowercase)
- Tạo file `Register.vue` (camelcase) định nghĩa component `Register` trong thư mục vừa tạo.

```vue
<template>
  <div>
    <h1>Register</h1>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      username: 'quytm',
      password: '1234',
      confirmPassword: '1234'
    }
  }
}
</script>

<style scoped>
  /*template*/
</style>
``` 

### Khai báo router

- Khai báo Register trong Router (`src/router/index.js`):


```
  # Trang độc lập
  constantRouterMap {
    ...,
    {
      path: '/register',
      component: () => import('@/views/register/Register'),
      hidden: false
    },
    ...
  }
  
  # Pages thuộc sidebar
  asyncRouterMap {
    ...,
    {
      path: '/register',
      component: Layout,
      redirect: 'noredirect',
      children: [
        {
          path: '',
          component: () => import('@/views/register/Register'),
          name: 'Register',
          meta: { title: 'Register', icon: 'Register' }
        }
      ]
    },
    ...
  }
```

Trong trường hợp define pages thuộc sidebar, cần chú ý tới `meta` trong đó `title`
phải được định nghĩa trong `i18n`, `icon='Register'` tương ứng với `Register.svg`

Sau bước này, ta có thể truy cập `http://localhost:9527/#/register` để xem thành quả.

***Chú ý***: *Mặc định, các trang được tạo mới luôn cầu đăng nhập để truy cập
do đó nếu trang này là public, cần phải add nó vào whitelist nằm trong
 `/src/permission.js`*

### i18n

Khi text cần support đa ngôn ngữ, ta chỉ việc thêm chúng vào trong `/src/lang/<language>.js`

Mỗi property trong đó tương ứng với 1 router hoặc 1 page.

Ví dụ: Add thêm pages là `Register`
Update `/src/lang/en.js`
```js
export default {
  route: {
    register: 'Register'
    // ...
  },
  register: {
    register: 'Register',
    title: 'Register Form',
    username: 'Username',
    password: 'Password',
    passwordConfirm: 'Confirm Password'
  }
  // ...
}
```
*(làm tương tự với các language khác)*

Cách sử dụng:
```vue
  <!--Sử dụng cú pháp của `vue-i18n` -->
  $t('register.username')
  $t('register.password')
```

### Call API

Mỗi page tương ứng 1 file trong `/src/api/`
Với trang `Register` ta sẽ có file `/src/api/register.js`

```js
import request from '@/utils/request'

export function register(username, password, confirmPassword) {
  const data = {
    username,
    password,
    confirmPassword
  }
  return request({
    url: '/register',
    method: 'post',
    data
  })
}
```

Sau đó gọi api, 

```vue
import { register } from '../../api/register'

...

  methods: {
    handleRegister() {
      const { username, password, confirmPassword } = this.registerForm
      register(username, password, confirmPassword).then(res => {
        if (res.data.success) {
          this.$router.push({
            path: '/login'
          })
        }
      })
    }
  }
```


## Bonus

### Coding convention

Tham khảo chi tiết tại [Style Guide](https://vuejs.org/v2/style-guide/)

### Theme

Có thể setup nhiều theme trên project

Clone [custom-element-theme](https://github.com/PanJiaChen/custom-element-theme) về
Install `element-theme`
```cmd
npm i element-theme -g
npm i
```
Update theme:
```cmd
remove element-variables.scss
update element-theme-chalk version in package.json
et -i
et
gulp
```
Output nằm trong thư mục `\dist`, sau đó, copy ouput này vào `/src/assets/` của dự án

Tham khảo chi tiết: [Theme](https://panjiachen.github.io/vue-element-admin-site/guide/advanced/theme.html)

## Online Demo

Bản online của [vue-element-admin](http://panjiachen.github.io/vue-element-admin)
