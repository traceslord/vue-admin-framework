<template>
  <div class="jk-markdown-it" v-html="render(md)"></div>
</template>

<script>
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import MarkdownItSuperscript from "markdown-it-sup";
import MarkdownItSubscript from "markdown-it-sub";
import MarkdownItInsert from "markdown-it-ins";
import MarkdownItMark from "markdown-it-mark";
import MarkdownItTasklists from "markdown-it-task-lists";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItEmoji from "markdown-it-emoji";
import MarkdownItContainer from "markdown-it-container";
import MarkdownItDeflist from "markdown-it-deflist";
import MarkdownItAbbreviation from "markdown-it-abbr";
import MarkdownItKatex from "markdown-it-katex";

const optMarkdownIt = {
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: false,
  typographer: true,
  quotes: "“”‘’"
};

const md = new MarkdownIt(optMarkdownIt)
  .use(MarkdownItSuperscript)
  .use(MarkdownItSubscript)
  .use(MarkdownItInsert)
  .use(MarkdownItMark)
  .use(MarkdownItTasklists, { enabled: true })
  .use(MarkdownItFootnote)
  .use(MarkdownItEmoji)
  .use(MarkdownItContainer, "hljs-left")
  .use(MarkdownItContainer, "hljs-center")
  .use(MarkdownItContainer, "hljs-right")
  .use(MarkdownItDeflist)
  .use(MarkdownItAbbreviation)
  .use(MarkdownItKatex);

// 代码高亮
md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const code = token.content.trim();
  const lang = token.info ? [token.info] : undefined;
  return `<pre><code class="hljs">${
    hljs.highlightAuto(code, lang).value
  }</code></pre>`;
};

// 新窗口打开链接
const defaultRender =
  md.renderer.rules.link_open ||
  function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
  let hIndex = tokens[idx].attrIndex("href");
  if (tokens[idx].attrs[hIndex][1].startsWith("#"))
    return defaultRender(tokens, idx, options, env, self);
  let aIndex = tokens[idx].attrIndex("target");
  if (aIndex < 0) {
    tokens[idx].attrPush(["target", "_blank"]);
  } else {
    tokens[idx].attrs[aIndex][1] = "_blank";
  }
  return defaultRender(tokens, idx, options, env, self);
};

export default {
  props: {
    md: {
      type: String,
      default: ""
    }
  },
  methods: {
    render(val) {
      const value = val ? val : "";
      return md.render(value);
    }
  }
};
</script>

<style lang="less">
/* KATEX 公式： */
@import "../../assets/styles/katex/katex.css";

.jk-markdown-it {
  /* 布局： */
  .hljs-center {
    text-align: center;
  }
  .hljs-right {
    text-align: right;
  }
  .hljs-left {
    text-align: left;
  }
  /* 任务列表： */
  .contains-task-list {
    padding-left: 4px;
    .task-list-item {
      list-style-type: none;
      + .task-list-item {
        margin-top: 4px;
      }
      input {
        margin-right: 4px;
        vertical-align: middle;
      }
    }
  }
}

/* 默认： */
.jk-markdown-it {
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  line-height: 1.5;
  color: #24292e;
  word-wrap: break-word;
  cursor: default;
  > *:first-child {
    margin-top: 0 !important;
  }
  > *:last-child {
    margin-bottom: 0 !important;
  }
  a {
    color: #409eff;
    text-decoration: none;
    word-break: break-all;
  }
  a:hover {
    color: #66b1ff;
    text-decoration: underline;
  }
  a:hover,
  a:active {
    outline: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    color: #000;
  }
  h1 {
    margin: 28px 0 10px 0;
    font-size: 28px;
    line-height: 36px;
  }
  h2 {
    margin: 24px 0 8px 0;
    font-size: 24px;
    line-height: 32px;
  }
  h3 {
    margin: 22px 0 7px 0;
    font-size: 22px;
    line-height: 30px;
  }
  h4 {
    margin: 20px 0 6px 0;
    font-size: 20px;
    line-height: 28px;
  }
  h5 {
    margin: 18px 0 5px 0;
    font-size: 18px;
    line-height: 26px;
  }
  h6 {
    margin: 16px 0 4px 0;
    font-size: 16px;
    line-height: 24px;
  }
  p,
  div {
    margin-bottom: 16px;
  }
  b,
  strong {
    font-weight: bold;
  }
  i,
  em {
    font-style: italic;
  }
  u,
  ins {
    text-decoration: underline;
  }
  strike,
  del,
  s {
    text-decoration: line-through;
  }
  mark {
    background-color: yellow;
    color: black;
  }
  sup {
    font-size: smaller;
    vertical-align: super;
  }
  sub {
    font-size: smaller;
    vertical-align: sub;
  }
  ul {
    list-style: disc outside none;
  }
  ol {
    list-style: decimal;
  }
  ul,
  ol {
    margin-bottom: 16px;
    padding-left: 2em;
    ul {
      margin-bottom: 0;
      list-style: circle outside none;
      ul {
        margin-bottom: 0;
        list-style: square outside none;
      }
      ol {
        margin-bottom: 0;
        list-style-type: lower-alpha;
      }
    }
    ol {
      margin-bottom: 0;
      list-style-type: lower-roman;
      ul {
        margin-bottom: 0;
        list-style: square outside none;
      }
      ol {
        margin-bottom: 0;
        list-style-type: lower-alpha;
      }
    }
  }
  dl {
    margin-bottom: 16px;
    dt {
      font-style: italic;
      font-weight: 600;
    }
    dd {
      margin-bottom: 16px;
      padding: 0 16px;
    }
  }
  blockquote {
    margin-bottom: 16px;
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
    > :first-child {
      margin-top: 0;
    }
    > :last-child {
      margin-bottom: 0;
    }
  }
  code {
    padding: 0.2em;
    font-size: 85%;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
      monospace;
    background-color: #f0f0f0;
    border-radius: 3px;
    &:before,
    &:after {
      letter-spacing: -0.2em;
      content: "\00a0";
    }
  }
  pre {
    display: block;
    margin-bottom: 16px;
    padding: 16px 24px;
    font-size: 85%;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
      monospace;
    line-height: 1.45;
    background-color: #f0f0f0;
    border-radius: 3px;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
    overflow: auto;
    code {
      display: inline;
      padding: 0;
      line-height: inherit;
      background-color: transparent;
      border-radius: 0;
      overflow: visible;
      &:before,
      &:after {
        content: normal;
      }
    }
  }
  hr {
    display: block;
    margin: 24px 0;
    border: 0;
    border-bottom: 2px solid #e8e8e8;
  }
  table {
    display: block;
    margin-bottom: 16px;
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border-spacing: 0;
    overflow: auto;
    thead {
      font-weight: bold;
    }
    tr {
      background-color: #fff;
      &:nth-child(2n) {
        background-color: #fafafa;
      }
      &:hover {
        background-color: #f5f7fa;
      }
    }
    td,
    th {
      padding: 10px 16px;
      font-size: 14px;
      border: 1px solid #ebeef5;
    }
  }
  img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }
  video {
    max-width: 100%;
    max-height: 560px;
  }
}
</style>
