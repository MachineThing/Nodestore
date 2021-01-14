const date = new Date();
exports.tags = function(urlname) {
  return {
    'NODE':process.versions['node'],
    'URL':urlname,
    'YEAR':date.getFullYear()
  }
}
