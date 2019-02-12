# Vuejs base project

## Introduction

Project được dựng dựa trên [vue-element-admin](http://panjiachen.github.io/vue-element-admin). 

## Getting started

```bash
# install dependency
npm install

# develop
npm run dev
```

Truy cập http://localhost:9527.

## Build

```bash
# build for test environment
npm run build:sit

# build for production environment
npm run build:prod
```

## Advanced

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

## Tạo mới một page

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

- Khai báo Register trong Router (`src/router/index.js`):


```json
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

Kết thúc, truy cập `http://localhost:9527/#/register` để xem thành quả.

## i18n

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

## Call API

Mỗi page tương ứng 1 file trong `/src/api/`



## Coding convention

Tham khảo chi tiết tại [Style Guide](https://vuejs.org/v2/style-guide/)

## Theme

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
Output nằm trong thư mục `\dist`

Tham khảo chi tiết: [Theme](https://panjiachen.github.io/vue-element-admin-site/guide/advanced/theme.html)

## Online Demo

[Preview](http://panjiachen.github.io/vue-element-admin)
