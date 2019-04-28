export default [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      { path: '/', redirect: '/armageddon' },
      {
        path: '/armageddon',
        name: 'armageddon',
        icon: 'fork',
        component: './Armageddon/index',
      },
    ],
  },
];
