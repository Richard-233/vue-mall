export default {
  sidebarMap: {
    1: {
      main: [
        {
          groupTitle: '分组1'
        },
        {
          path: '/main/product/ProductManagement',
          icon: 'suncaper-menu-unfold',
          title: '商品管理'
        },
        {
          path: '/main/communicate/communicator',
          icon: 'suncaper-menu-unfold',
          title: '通讯'
        },
        {
          path: '/main/shop/ShopManagement',
          icon: 'suncaper-menu-unfold',
          title: '店铺管理'
        },
        {
          path: '/main/second',
          icon: 'suncaper-menu-unfold',
          title: '一级菜单2',
          group: 'second',
          children: [
            {
              path: '/main/second/Second',
              icon: 'suncaper-menu-unfold',
              title: '二级菜单'
            }
          ]
        }
      ]
    }
  },
  sidebarTheme: {
    dark: {
      background: '#1f2c35',
      text: '#ffffff',
      activeText: '#ffffff'
    },
    light: {
      background: '#ffffff',
      text: '#000000',
      activeText: '#1890ff'
    }
  }
}
