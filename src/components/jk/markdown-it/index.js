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

export const md = new MarkdownIt(optMarkdownIt)
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

export default function(val) {
  const value = val ? val : "";
  return md.render(value);
}
