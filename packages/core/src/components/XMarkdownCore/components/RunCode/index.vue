<script lang="ts" setup>
import type { ElxRunCodeHeaderTypes } from './components/run-code-header.vue';
import type { ElxRunCodeProps } from './type';
import { useVModel } from '@vueuse/core';
import { SELECT_OPTIONS_ENUM } from './components/options';
import RunCodeContent from './components/run-code-content.vue';
import RunCodeHeader from './components/run-code-header.vue';

const props = withDefaults(defineProps<ElxRunCodeProps>(), {
  code: () => [],
  lang: '',
  mode: 'dialog'
});
const emit = defineEmits<{
  (e: 'update:visible'): void;
}>();
const drawer = useVModel(props, 'visible', emit);

const selectValue = ref<ElxRunCodeHeaderTypes['options']>(
  SELECT_OPTIONS_ENUM.VIEW
);

const isView = computed(() => selectValue.value === SELECT_OPTIONS_ENUM.VIEW);
</script>

<template>
  <el-dialog
    v-if="props.mode === 'dialog'"
    v-model="drawer"
    :class="`${props.customClass} ${isView ? 'elx-run-code-dialog-view' : ''}`"
    :close-on-click-modal="props.dialogOptions?.closeOnClickModal ?? true"
    :close-on-press-escape="props.dialogOptions?.closeOnPressEscape ?? true"
    class="elx-run-code-dialog"
    align-center
    destroy-on-close
    append-to-body
  >
    <template #header>
      <RunCodeHeader v-model:value="selectValue" />
    </template>
    <template #default>
      <RunCodeContent v-bind="props" :now-view="selectValue" />
    </template>
  </el-dialog>
  <el-drawer
    v-if="props.mode === 'drawer'"
    v-model="drawer"
    :class="`${props.customClass} ${isView ? 'elx-run-code-drawer-view' : ''}`"
    :close-on-click-modal="props.drawerOptions?.closeOnClickModal ?? true"
    :close-on-press-escape="props.drawerOptions?.closeOnPressEscape ?? true"
    class="elx-run-code-drawer"
    align-center
    destroy-on-close
    append-to-body
  >
    <template #header>
      <RunCodeHeader v-model:value="selectValue" />
    </template>
    <template #default>
      <RunCodeContent v-bind="props" :now-view="selectValue" />
    </template>
  </el-drawer>
</template>

<style src="./style.scss"></style>
