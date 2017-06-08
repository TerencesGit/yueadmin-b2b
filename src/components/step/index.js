import LinkStep from '../steps/src/step';

/* istanbul ignore next */
LinkStep.install = function(Vue) {
  Vue.component(LinkStep.name, LinkStep);
};

export default LinkStep;
