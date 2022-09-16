module.exports = {
     devServer: {
        disableHostCheck: true
    },
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions = {
                    ...(options.compilerOptions || {}),
                    isCustomElement: tag => /^h8k-/.test(tag)
                };
                return options;
            });
    }
};
