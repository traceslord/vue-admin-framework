<template>
  <div>
    <markdown :value.sync="value" video></markdown>
  </div>
</template>

<script>
import Markdown from "@/components/editor/MarkdownMavon";

export default {
  components: {
    Markdown
  },
  data() {
    return {
      value: ""
    };
  }
};
</script>
