git pull origin master
yarn test
yarn build
npm version patch
npm publish
yarn buildStorybook
git add -A
git commit -a -m "publish Storybook"
git push origin master
