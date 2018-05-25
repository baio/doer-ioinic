const chalk = require("chalk");
const fs = require('fs');
const path = require('path');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const env = process.env.IONIC_ENV;

const aliases = {
  "@doer/core": path.resolve('./src/app/libs/doer-core/'),
  "@doer/ionic-core": path.resolve('./src/app/libs/doer-ionic-core/'),
  "@doer/ngx-core": path.resolve('./src/app/libs/doer-ngx-core/'),
  "@doer/native": path.resolve('./src/app/libs/doer-native/'),
  "@doer/common": path.resolve('./src/app/modules/doer-common/'),
  "@doer/user": path.resolve('./src/app/modules/doer-user/'),
  "@app": path.resolve('./src/app/'),
  "@assets": path.resolve('./src/assets/'),
  "@pages": path.resolve('./src/pages/'),
  "@theme": path.resolve('./src/theme/'),
}

if (env === 'prod' || env === 'dev') {

  useDefaultConfig[env].resolve.alias = aliases;

} else {

  // Default to dev config
  useDefaultConfig[env] = useDefaultConfig.dev;
  useDefaultConfig[env].resolve.alias = aliases;

}

module.exports = function () {
  return useDefaultConfig;
};