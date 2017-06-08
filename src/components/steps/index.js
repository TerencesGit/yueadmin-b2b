import LinkSteps from './src/steps';

/* istanbul ignore next */
LinkSteps.install = function(Vue) {
  Vue.component(LinkSteps.name, LinkSteps);
};

export default LinkSteps;
