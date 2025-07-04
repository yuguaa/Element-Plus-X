import type { App, Plugin } from 'vue';
import Attachments from './components/Attachments/index.vue';
import Bubble from './components/Bubble/index.vue';
import BubbleList from './components/BubbleList/index.vue';
import ConfigProvider from './components/ConfigProvider/index.vue';
import Conversations from './components/Conversations/index.vue';
import FilesCard from './components/FilesCard/index.vue';
import Markdown from './components/Markdown/index.vue';
import MarkdownAsync from './components/MarkdownAsync/index.vue';
import MentionSender from './components/MentionSender/index.vue';
import Prompts from './components/Prompts/index.vue';
import Sender from './components/Sender/index.vue';
import Thinking from './components/Thinking/index.vue';
import ThoughtChain from './components/ThoughtChain/index.vue';
import Typewriter from './components/Typewriter/index.vue';
import Welcome from './components/Welcome/index.vue';

export * from './components';
export * from './hooks';

const ElementPlusX: Plugin = {
  install(app: App) {
    app.component('Attachments', Attachments);
    app.component('Bubble', Bubble);
    app.component('BubbleList', BubbleList);
    app.component('ConfigProvider', ConfigProvider);
    app.component('Conversations', Conversations);
    app.component('FilesCard', FilesCard);
    app.component('Markdown', Markdown);
    app.component('MarkdownAsync', MarkdownAsync);
    app.component('MentionSender', MentionSender);
    app.component('Prompts', Prompts);
    app.component('Sender', Sender);
    app.component('Thinking', Thinking);
    app.component('ThoughtChain', ThoughtChain);
    app.component('Typewriter', Typewriter);
    app.component('Welcome', Welcome);
  }
};

export default ElementPlusX;
