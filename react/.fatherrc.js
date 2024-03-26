const options = {
  doc: {
    // themeConfig: { mode: 'dark' },
    title: 'react-reactivity',
    base: process.env.NODE_ENV === 'production' ? '/react-reactivity/' : '',
    dest: 'docs',
    typescript: true
  },
  esm: 'rollup',
  cjs: {
    type: 'babel',
    minify: true
  }
};

export default options;
