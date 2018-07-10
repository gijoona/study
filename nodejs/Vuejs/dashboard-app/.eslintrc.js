// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    // plugin:vue/base : 기본적인 ESLint의 파서를 실행
    // plugin:vue/essential : base 규칙과 함께 에러를 내는 코드와, 예상치 못한 결과를 낳는 코드를 예측
    // plugin:vue/strongly-recommended : 위의 내용과 함께 코드 가독성 및 개발 경험을 높일 수 있는 규칙을 적용
    // plugin:vue/recommended : 위의 내용과 함께 일관성을 위한 커뮤니티에서 추천하는 규칙 적용
    // 'plugin:vue/essential',
    'plugin:vue/recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'html',
    'standard',
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
