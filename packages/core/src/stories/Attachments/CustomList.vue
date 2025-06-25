<script setup lang="ts">
import type { AttachmentsProps } from '@components/Attachments/types';
import Attachments from '@components/Attachments/index.vue';
import { useAttachmentStubs } from './useAttachmentStubs';

type Props = Pick<AttachmentsProps, 'items'>;

const props = withDefaults(defineProps<Props>(), {
  items: () => []
});

const attrs = useAttrs();

const { files, handleBeforeUpload, handleHttpRequest, handleUploadDrop } =
  useAttachmentStubs(props.items);
</script>

<template>
  <div class="component-container">
    <div class="component-title">附件上传组件-自定义 列表内容</div>
    <!-- :items="files"
      overflow="scrollX"
      :list-style="{ padding: '0 12px' }"
      :hide-upload="false" -->
    <Attachments
      v-bind="attrs"
      :items="files"
      :before-upload="handleBeforeUpload"
      :http-request="handleHttpRequest"
      @upload-drop="handleUploadDrop"
    >
      <template #file-list="{ items }">
        <div class="custom-list">
          <div v-for="(item, idx) in items" :key="idx" class="custom-item">
            <div class="custom-item-name">
              {{ item.name }}
            </div>
          </div>
        </div>
      </template>
    </Attachments>
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
  overflow-y: auto;

  .component-title {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 12px;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 12px;
    margin-top: 24px;

    &::after {
      position: absolute;
      content: '';
      display: block;
      width: 5px;
      height: 75%;
      border-radius: 15px;
      left: 0;
      background-color: #409eff;
    }
  }
}

.custom-list {
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;

  .custom-item {
    margin: 8px;
    width: 200px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: antiquewhite;
    flex: none;
  }
}
</style>
