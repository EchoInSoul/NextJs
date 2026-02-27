// 导航栏配置
export const navConfig = {
  siteName: 'Solitude',
  
  // 分组导航（左侧盒子菜单）
  group: {
    '关于': '/about || fas fa-user',
    '音乐': '/music || fas fa-music',
    '精选': '/featured || fas fa-star',
    '相册': '/gallery || fas fa-images',
  },
  
  // 主菜单（中间）
  menu: {
    '文章': {
      '归档': '/archives || fas fa-folder-closed',
      '分类': '/categories || fas fa-clone',
      '标签': '/tags || fas fa-tags',
    },
    '友链': {
      '朋友圈': '/moments || fas fa-wifi',
      '友情链接': '/links || fas fa-user-group',
    },
  },
  
  // 右侧功能按钮
  showRandom: true,
  showSearch: true,
  showConsole: false, // 暂未实现控制台
  showToTop: true, // 回到顶部
};
