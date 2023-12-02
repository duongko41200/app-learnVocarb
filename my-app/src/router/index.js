
import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '@/store';
// import dashboard from '../pages/master/dashboard';

 
// import home from '../pages/home';
// import HomeLayout from '@/components/HelloWorld.vue';
import homeLayout from '@/views/homeLayout.vue'
// import profile from '../pages/profile';

const routes = [
	{
		name: 'HomeLayout',
		path: '/',
		component: homeLayout,
		// children: [
		// 	{
		// 		name: 'profile',
		// 		path: '/profileDetail',
		// 		component: profileDetail,
		// 	},
		// 	{
		// 		name: 'userInfo',
		// 		path: '/userInfo',
		// 		component: userInfo,
		// 	},
		// 	{
		// 		name: 'searchLayout',
		// 		path: '/',
		// 		component: searchLayout,
		// 	},
		// 	{
		// 		name: 'userDesign',
		// 		path: '/user/:userId',
		// 		component: userDesign,
		// 	},
		// ],
	},
	// {
	// 	name: 'Login',
	// 	path: '/login',
	// 	component: login,
	// },
	// {
	// 	name: 'signup',
	// 	path: '/signup',
	// 	component: signup,
	// },
	// {
	// 	name: 'design',
	// 	path: '/design',
	// 	component: design,
	// },
];

Vue.use(VueRouter);
const router = new VueRouter({
	routes, // short for routes: routes
	linkActiveClass: 'active',
	scrollBehavior: (to, from, savedPosition) => {
		if (savedPosition) {
			return savedPosition;
		}
		if (to.hash) {
			return { selector: to.hash };
		}
		return { x: 0, y: 0 };
	},
});



export default router;
