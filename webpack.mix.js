let mix = require('laravel-mix')
const path = require('path')
require('./nova.mix')

mix
  .setPublicPath('dist')
  .js('resources/js/field.js', 'js')
  .vue({ version: 3 })
  .css('resources/css/field.css', 'css')
    .webpackConfig({
        resolve: {
            alias: {
                '@/mixins': path.resolve(__dirname, '../../vendor/laravel/nova/resources/js/mixins'),
                '@/util': path.resolve(__dirname, '../../vendor/laravel/nova/resources/js/util'),
            },
            'modules': [
                path.resolve(__dirname, 'node_modules/'),
                path.resolve(__dirname, '../../vendor/laravel/nova/node_modules/'),
            ],
            symlinks: false,
        }
    })
  .nova('oro/formatted-number')
