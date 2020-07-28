const options = {
  doc: {
    // themeConfig: { mode: 'dark' },
    title: 'react-ivity',
    base: process.env.NODE_ENV === 'production' ? '/react-ivity/' : '',
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
