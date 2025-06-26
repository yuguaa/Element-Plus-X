<script setup lang="ts">
import { EditorSender } from '../../components';

async function asyncMatchUser(searchVal: string) {
  console.log(searchVal, '在@之后输入的内容');
  if (!searchVal) {
    return [];
  }
  // 查询github用户
  const res = await fetch(
    `https://api.github.com/search/users?q=${searchVal}`
  ).then(res => res.json());
  return (
    res?.items?.map((item: any) => {
      return {
        id: item.id,
        name: item.login,
        avatar: item.avatar_url
      };
    }) ?? []
  );
}
</script>

<template>
  <div class="other-wrap">
    <p>
      异步加载@成员示例（本示例接口调用的是github的接口，一定时间内对ip有访问次数限制）：
    </p>
    <EditorSender
      placeholder="请在@之后随便输入点什么吧"
      :async-match-fun="asyncMatchUser"
    />
  </div>
</template>

<style scoped lang="scss">
.other-wrap {
  width: 100%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
