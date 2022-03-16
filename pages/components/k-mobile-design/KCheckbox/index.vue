<template>
  <a-checkbox :val="_val" @change="handleChange" :disabled="disabled" :checked="chackboxVal">
    {{ label }} 
  </a-checkbox>
</template>
<script>
/*
 * author huangting
 * date 2020-11-20
 * description 多选框组件,改成v-model Boolean值
 */

export default {
  name: "kCheckbox",
  data() {
    return {
      chackboxVal: false
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
	disabled: {
		type: Boolean,
		default: false
	}
  },
  computed: {
    _val() {
      this.handleSetChackboxVal(this.value);
      return this.value;
    }
  },
  methods: {
    handleChange(e) {
      this.$emit("input", e.target.checked);
      this.$emit("change", e.target.checked);
    },
    handleSetChackboxVal(val) {
      this.chackboxVal = val;
    }
  }
};
</script>
