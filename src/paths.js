exports.paths = [
  // HTML
  ['/', 'pages/index.html'],
  ['/shop/cpu', '/pages/search.html', {'SHOP_TYPE':'CPU', 'SHOP_COLOR':'Tomato'}],
  ['/shop/gpu', '/pages/search.html', {'SHOP_TYPE':'GPU', 'SHOP_COLOR':'YellowGreen'}],
  ['/shop/os', '/pages/search.html', {'SHOP_TYPE':'Operating System', 'SHOP_COLOR':'Aquamarine'}],
  ['/shop/pc', '/pages/search.html', {'SHOP_TYPE':'Personal Computer', 'SHOP_COLOR':'LightSalmon'}],
  // JS
  ['/js/formatTable.js', '/js/formatTable.js'],
  ['/js/rtSearch.js', '/js/rtSearch.js'],
  // CSS
  ['/index.css', '/css/index.css'],
]
