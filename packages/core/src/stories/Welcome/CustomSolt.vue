<script lang="ts" setup>
import type { WelcomeProps } from '@components/Welcome/types';
import { Welcome } from '../../components';

const props = defineProps<
  WelcomeProps & {
    showExtraSlot?: boolean;
    showImageSlot?: boolean;
  }
>();
</script>

<template>
  <div class="Welcome-demo-box">
    <Welcome v-bind="props">
      <template v-if="props.showExtraSlot" #extra>
        <el-button link type="primary">
          关于我
        </el-button>
      </template>
      <template v-if="props.showImageSlot" #image>
        <img src="https://element-plus-x.com/logo.png" style="width: 80px">
      </template>
    </Welcome>
  </div>
</template>
