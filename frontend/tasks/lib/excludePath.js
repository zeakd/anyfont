function excludePath(paths) {
  return paths.map(p => {
    return '!' + p;
  })
}

module.exports = excludePath;