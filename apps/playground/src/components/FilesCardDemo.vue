<!-- home 首页-使用 Bubble 组件 -->
<script setup lang="ts">
import type { Ref } from 'vue'
import type { FilesCardProps, FilesType } from 'vue-element-plus-x/types/FilesCard'
import FilesCard from 'vue-element-plus-x/src/components/FilesCard/index.vue'
// 模拟数据
import { colorMap1, colorMap2 } from '../assets/mock.ts'

const filesCardRef = ref()
const colorMap = ref({}) as Ref<Record<FilesType, string>>

onMounted(() => {
  // 获取内置颜色
  colorMap.value = filesCardRef.value?.colorMap
})

type ColorKey = keyof typeof colorMap.value
const colorKeys = computed(() => Object.keys(colorMap.value) as ColorKey[])

const filesCardProps = ref<FilesCardProps>({
  uid: '1',
  name: '测试名称',
  description: '测试description',
})

function handleDel(item: FilesCardProps) {
  console.log('删除事件触发，当前卡片的 props 只读 ==> item', item)
  ElMessage.success('删除成功')
}

// 测试图片文件流解析
const imgFile = ref<File | Blob | undefined>()
const imgName = ref('')
const imgSize = ref(0)
function handleImgFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    imgFile.value = file
    imgName.value = file.name
    imgSize.value = file.size
    console.log('imgFile', imgFile.value)
    ElMessage.success('已上传')
  }
}
</script>

<template>
  <div class="component-container">
    <!-- 文件卡片-基础使用 -->
    <div class="component-title">
      文件卡片-基础使用
    </div>
    <div class="files-card-container-wrapper">
      <span>设置 name 属性, 且 name 没有后缀。name="测试文件"</span>
      <FilesCard ref="filesCardRef" name="测试文件" />
      <span>设置 name 属性，有文件后缀。name="测试文件.pdf"</span>
      <FilesCard name="测试文件.pdf" />
      <span>支持更据 name 后缀匹配内置图标 </span>
      <div class="files-card-container">
        <FilesCard name="测试doc后缀.doc" />
        <FilesCard name="测试xls后缀.xls" />
        <FilesCard name="测试ppt后缀.ppt" />
        <FilesCard name="测试txt后缀.txt" />
        <FilesCard name="测试pdf后缀.pdf" />
        <FilesCard name="测试png后缀.png" />
        <FilesCard name="测试jpg后缀.jpg" />
        <FilesCard name="测试gif后缀.gif" />
        <FilesCard name="测试mp4后缀.mp4" />
        <FilesCard name="测试mp3后缀.mp3" />
        <FilesCard name="测试zip后缀.zip" />
        <FilesCard name="测试rar后缀.rar" />
        <FilesCard name="测试7z后缀.7z" />
        <FilesCard name="测试lnk后缀.lnk" />
        <FilesCard name="测试obj后缀.obj" />
        <FilesCard name="测试fbx后缀.fbx" />
        <FilesCard name="测试glb后缀.glb" />
        <FilesCard name="测试sql后缀.sql" />
        <FilesCard name="测试db后缀.db" />
        <FilesCard name="测试md后缀.md" />
        <FilesCard name="测试js后缀.js" />
        <FilesCard name="测试py后缀.py" />
        <FilesCard name="测试java后缀.java" />
        <FilesCard name="测试php后缀.php" />
        <FilesCard name="测试json后缀.json" />
      </div>
      <span>如果有后缀，但是匹配不到常用的图标，则默认为 File 文件</span>
      <FilesCard name="测试未知后缀.self" />
    </div>

    <!-- 文件卡片-状态设置 -->
    <div class="component-title">
      文件卡片-状态设置
    </div>
    <div class="files-card-container-wrapper">
      <span>设置 status 属性，控制文件加载状态 "uploading","done","error"</span>
      <div class="files-card-container">
        <FilesCard name="uploading 测试文件.pdf" status="uploading" />
        <FilesCard name="done 测试文件.pdf" status="done" />
        <FilesCard name="error 测试文件.pdf" status="error" />
      </div>
      <span>"uploading"+"percent" 控制上传进度，"error"+"errorTip"控制自定义失败提示 </span>
      <div class="files-card-container">
        <FilesCard name="uploading 测试文件.doc" status="uploading" :percent="50" />
        <FilesCard name="error 测试文件.doc" status="error" error-tip="自定义失败提示" />
      </div>
    </div>

    <!-- 支持删除-icon 和 删除事件 -->
    <div class="component-title">
      支持删除-icon 和 删除事件
    </div>
    <div class="files-card-container-wrapper">
      <span>设置 showDelIcon 属性，开启 悬停展示删除图标</span>
      <div class="files-card-container">
        <FilesCard name="删除测试文件.md" show-del-icon @delete="handleDel" />
      </div>
    </div>

    <!-- 图片文件展示 -->
    <div class="component-title">
      图片文件专区
    </div>
    <div class="files-card-container-wrapper">
      <span>图片文件 <span style="color: red;">可预览</span> 和 <span style="color: red;">不可预览</span></span>
      <div class="files-card-container">
        <FilesCard name="可预览的图片.jpeg" show-del-icon url="https://avatars.githubusercontent.com/u/76239030?v=4" />
        <FilesCard name="无法预览的图片.jpeg" show-del-icon />
      </div>
      <span>图片文件 <span style="color: red;">正方形变体</span> 其他格式不受变体属性影响</span>
      <div class="files-card-container">
        <FilesCard
          name="可预览的图片.jpeg"
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
          img-variant="square"
          show-del-icon
        />
        <FilesCard name="无法预览的图片.jpeg" img-variant="square" show-del-icon />
        <FilesCard name="其他文件不受变体影响.txt" img-variant="square" show-del-icon :file-size="30000" />
      </div>
      <span>图片文件 默认长方形变体 <span style="color: red;">支持上传状态 、支持预览开启关闭 、支持预览遮罩蒙层开启关闭</span></span>
      <div class="files-card-container">
        <FilesCard name="上传进度.jpeg" :percent="50" status="uploading" show-del-icon url="https://avatars.githubusercontent.com/u/76239030?v=4" />
        <FilesCard name="上传失败.jpeg" status="error" show-del-icon url="https://avatars.githubusercontent.com/u/76239030?v=4" />
        <FilesCard name="关闭预览悬停遮罩.jpeg" :img-preview-mask="false" show-del-icon url="https://avatars.githubusercontent.com/u/76239030?v=4" />
        <FilesCard name="关闭预览功能.jpeg" :img-preview="false" show-del-icon url="https://avatars.githubusercontent.com/u/76239030?v=4" />
      </div>

      <span>图片文件 正方形变体 <span style="color: red;">支持上传状态 、支持预览开启关闭 、支持预览遮罩蒙层开启关闭</span></span>
      <div class="files-card-container">
        <FilesCard name="上传进度.jpeg" img-variant="square" :percent="50" status="uploading" show-del-icon url="https://avatars.githubusercontent.com/u/76239030?v=4" />
        <FilesCard name="上传失败.jpeg" img-variant="square" status="error" show-del-icon url="https://avatars.githubusercontent.com/u/76239030?v=4" />
        <FilesCard name="上传完成.jpeg" img-variant="square" show-del-icon url="https://avatars.githubusercontent.com/u/76239030?v=4" />
        <FilesCard name="关闭预览悬停遮罩.jpeg" img-variant="square" :img-preview-mask="false" show-del-icon url="https://avatars.githubusercontent.com/u/76239030?v=4" />
        <FilesCard name="关闭预览功能.jpeg" img-variant="square" :img-preview="false" show-del-icon url="https://avatars.githubusercontent.com/u/76239030?v=4" />
      </div>
    </div>

    <!-- 测试图片文件流解析  -->
    <div class="component-title">
      可以通过设置 imgFile 属性，接收 File 或 Blob 图片文件流 并自动解析成预览地址 用于卡片展示 画质会被压缩，仅供上传前 预览使用。
    </div>
    <div class="files-card-container-wrapper">
      <span>图片文件流解析</span>
      <input type="file" @change="handleImgFileChange">
      <div class="files-card-container">
        <FilesCard v-if="imgFile" :name="imgName" :img-file="imgFile" :file-size="imgSize" />
      </div>
    </div>

    <!-- 支持自定义插槽和悬停样式  -->
    <div class="component-title">
      支持自定义插槽和样式
    </div>
    <div class="files-card-container-wrapper">
      <span>设置 style 属性, 透传设置 卡片样式</span>
      <div class="files-card-container">
        <FilesCard name="自定义style样式.xls" style="background-color: #f0f9eb; border: 2px solid #67c23a; border-radius: 20px;" />
      </div>

      <span>设置 hoverStyle 属性, 透传设置 卡片悬停样式</span>
      <div class="files-card-container">
        <FilesCard
          name="自定义hoverStyle样式.xls"
          style="background-color: #f0f9eb; border: 1px solid #67c23a; border-radius: 20px;"
          :hover-style="{
            'box-shadow': '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
            'border-color': 'red',
            'background-color': 'rgba(255, 0, 0, 0.1)',
          }"
        />
      </div>
    </div>

    <!-- 文件卡片-自定义文件颜色 -->
    <div class="component-title">
      文件卡片-自定义文件颜色
    </div>
    <div class="files-card-container-wrapper">
      <p>组件库内置颜色</p>
      <div class="files-card-container">
        <FilesCard
          v-for="items in colorKeys" :key="items" v-bind="{ ...filesCardProps }" :icon-color="colorMap[items]"
          :file-type="items"
        />
      </div>
      <p>自定义颜色1</p>
      <div class="files-card-container">
        <FilesCard
          v-for="items in colorKeys" :key="items" v-bind="{ ...filesCardProps }" :icon-color="colorMap1[items]"
          :file-type="items"
        />
      </div>
      <p>自定义颜色2</p>
      <div class="files-card-container">
        <FilesCard
          v-for="items in colorKeys" :key="items" v-bind="{ ...filesCardProps }" :icon-color="colorMap2[items]"
          :file-type="items"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
  height: calc(100vh - 220px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;

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
      background-color: #409EFF;
    }
  }

  .files-card-container-wrapper {
    display: flex;
    gap: 12px;
    flex-direction: column;
    .files-card-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }
}
</style>
