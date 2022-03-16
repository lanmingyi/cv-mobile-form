<!--
 * @Description: 树形选择器
 * @Author: 黄婷
 * @Date: 2021-01-18 15:17:27
 * @LastEditTime: 2021-08-04 09:59:19
 * @LastEditors: 黄婷
 * @FilePath: \vite-demoe:\wwwroot\Vue\MisBoot\misboot-cloud-vue\src\components\TopVUI\custom\TreeSelect.vue
-->
<template>
  <a-tree-select
    allowClear
    :getPopupContainer="(node) => node.parentNode"
    style="width: 100%"
    :disabled="disabled"
    :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
    :placeholder="placeholder"
    :loadData="asyncLoadTreeData"
    tree-default-expand-all
    :value="treeValue"
    :treeData="treeData"
    :multiple="multiple"
    @select="select"
    @change="onChange"
    @search="onSearch"
  >
  </a-tree-select>
</template>
<script>
export default {
  name: "TreeSelect",
  props: {
    value: {
      required: false,
    },
    placeholder: {
      type: String,
      default: "请选择",
      required: false,
    },
    data: {
      type: Array,
    },
    url: {
      type: Object,
      required: false,
    },
    parameter: {
      type: Object,
      required: false,
    },
    idfield: {
      type: String,
      default: "id",
    },
    textfield: {
      type: String,
      default: "text",
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    hasChildField: {
      type: String,
      default: "",
      required: false,
    },
    condition: {
      type: String,
      default: "",
      required: false,
    },
    // 是否支持多选
    multiple: {
      type: Boolean,
      default: false,
    },
    loadTriggleChange: {
      type: Boolean,
      default: false,
      required: false,
    },
    treeValueText: {
      type: String,
      default: undefined,
    },
    treeValueId: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      treeValue: null,
      treeData: [],
    };
  },
  watch: {
    value(val) {
      console.log("this.multiple", !this.multiple, val);
      if (!this.multiple) {
        if (val) this.treeValue = val;
        this.loadItemByCode();
      } else {
        this.loadItemByCode(val);
      }
    },
  },
  created() {
    this.validateProp().then(() => {
      this.loadRoot();
      this.loadItemByCode();
    });
    this.$watch("treeValueText", (val) => {
      this.treeValue = val ? val : null;
    });
    this.$watch("treeValueId", (val) => {
      this.loadItemByCode(val);
    });
  },
  mounted() {
    if (!this.multiple) {
      // if(this.value) this.treeValue = this.value
      this.loadItemByCode();
    } else {
      this.loadItemByCode(this.value);
    }
  },
  methods: {
    loadItemByCode(val) {
      let value = val ? val : this.value;
      let treeData = this.data ? this.data : this.treeData;
      console.log("value----", value);
      if (!value || !treeData || treeData.length === 0) {
        this.treeValue = null;
      } else {
        this.filterListById(value, treeData);
      }
    },
    filterListById(id, data) {
      data.forEach((e) => {
        if (id == e[this.idfield]) {
          this.treeValue = this.textfield ? e[this.textfield] : e.text;
        } else {
          if (e.children) {
            this.filterListById(id, e.children);
          }
        }
      });
    },
    onLoadTriggleChange(text) {
      console.log("text", text);
      //只有单选才会触发
      if (!this.multiple && this.loadTriggleChange) {
        this.$emit("change", this.value, text);
      }
    },
    asyncLoadTreeData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.$vnode.children) {
          resolve();
          return;
        }
        let param = {};
        let pid = treeNode.dataRef.id;
        if (this.parameter.children) param = this.parameter.children;
        param.pid = pid;
        this.$http.post(this.url.expandUrl, param)
          .then((res) => {
            const treeData = res.data;
            treeData.forEach((e, index) => {
              treeData[index].title = e[this.textfield];
              treeData[index].label = e.text;
              treeData[index].index = index;
              treeData[index].value = e.id;
              treeData[index].levelId = e.levelId;
              treeData[index].key = e.id;
            });
            treeNode.dataRef.children = treeData;
            this.treeData = [...this.treeData];
            resolve();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    loadRoot() {
      this.$http.post(this.url.fathersUrl, this.parameter.father).then((res) => {
        if (res.statuCode !== 300) {
          this.treeData = res.data;
          this.treeData.forEach((e, index) => {
            this.treeData[index].title = e[this.textfield];
            this.treeData[index].label = e.text;
            this.treeData[index].index = index;
            this.treeData[index].value = e.id;
            this.treeData[index].key = e.id;
            this.treeData[index].levelId = e.levelId;
          });
        } else {
          console.log("数根节点查询结果-else", res);
        }
      });
    },
    onChange(value, node) {
      if (!value) {
        this.$emit("change", "");
        this.treeValue = null;
      } else if (value instanceof Array && this.multiple) {
        this.treeValue = value;
        this.$emit("change", value.map((item) => item.value).join(","), node);
      } else {
        this.treeValue = node.toString();
        this.$emit("change", value, node);
      }
    },
    select(value, node, extra) {
      // let val = this.textfield?node.dataRef[this.idfield]:node.dataRef.id
      //    this.treeValue = node.dataRef.text
      // this.$emit('change', val)
    },
    onSearch(value) {
      console.log(value);
    },
    getCurrTreeData() {
      return this.treeData;
    },
    validateProp() {
      let mycondition = this.condition;
      return new Promise((resolve, reject) => {
        if (!mycondition) {
          resolve();
        } else {
          try {
            let test = JSON.parse(mycondition);
            if (typeof test == "object" && test) {
              resolve();
            } else {
              this.$message.error(
                "组件TreeSelect-condition传值有误，需要一个json字符串!"
              );
              reject();
            }
          } catch (e) {
            this.$message.error(
              "组件TreeSelect-condition传值有误，需要一个json字符串!"
            );
            reject();
          }
        }
      });
    },
  },
  //2.2新增 在组件内定义 指定父组件调用时候的传值属性和事件类型 这个牛逼
  model: {
    prop: "value",
    event: "change",
  },
};
</script>
