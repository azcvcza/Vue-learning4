import Vue from 'vue'
import Router from 'vue-router'
import Contact from '@/components/Contact'
import Home from '@/components/Home'
import AddMovie from '@/components/AddMovie'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/contact',
            name: 'Contact',
            component: ConstantSourceNode,
        },
        {
            path: '/movies/add',
            name: 'AddMovie',
            component: AddMovie
        }
    ],
    mode: 'history',
})