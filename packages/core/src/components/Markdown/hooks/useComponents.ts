import { h } from 'vue';
import { CodeX, Link } from '../components/index';

function useComponents(slots: any) {
  console.log('🚀 ~ useComponents ~ slots:', slots);
  const components = {
    code: (raw: any) => h(CodeX, { raw }, slots),
    a: (raw: any) => h(Link, { raw })
  };
  return components;
}

export { useComponents };
