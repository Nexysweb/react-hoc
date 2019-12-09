git pull origin master
yarn test
yarn build
npm version patch
npm publish
yarn buildStorybook
git push origin master
