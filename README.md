# Blog

Rails 6とSvelteによるフォームのサンプルです。

Vue.js版: https://github.com/kazubon/blog-rails6-vuejs/ <br>
React版: https://github.com/kazubon/blog-rails6-react/ <br>

## 動作環境

Ruby 2.6.5、Ruby on Rails 6.0, Webpacker 4.2, Svelte 3.18

非SPA、Turbolinksあり

## 開発環境の用意

```
$ bundle install
$ yarn install
$ bin/rails db:migrate
$ bin/rails db:seed
```

db/seeds/development/users.rb にあるユーザー（`alice@example.com` / `password` など）でログインしてください。

## 作っていない機能

- ユーザーの新規登録、アカウント管理
