<template>
  <div>
    <rich-text :value.sync="value"></rich-text>
  </div>
</template>

<script>
import RichText from "@/components/editor/RichTextQuill";

export default {
  components: {
    RichText
  },
  data() {
    return {
      value: ""
    };
  }
};
</script>
