import { h } from 'vue';
import { CodeX } from '../components/index';

function useComponents() {
  const components = {
    pre: (raw: any) => h(CodeX, { raw })
  };
  return components;
}

export { useComponents };
