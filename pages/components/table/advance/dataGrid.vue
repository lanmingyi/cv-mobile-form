<template>
  <div ref="table" :id="id" class="advanced-table">
    <!-- 数据表格 -->
    <s-table
      ref="AdvanceTable"
      v-bind="{
        ...$options.propsData,
        columns: visibleColumns,
        title: undefined,
        loading: false,
      }"
      bordered
      :data="loadData"
      :size="size"
      @expandedRowsChange="onExpandedRowsChange"
      @change="onChange"
      @expand="onExpand"
      :rowClassName="rowClassName"
      :rowSelection="rowSelection"
      :customRow="rowClick"
      :customHeaderRow="customHeaderRow"
      :pageSize="pageSize"
    >
      <span v-if="rownumbers" slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <template
        slot-scope="text, record, index"
        :slot="slot"
        v-for="slot in scopedSlots"
      >
        <slot :name="slot" v-bind="{ text, record, index }"></slot>
      </template>
      <template :slot="slot" v-for="slot in slots">
        <slot :name="slot"></slot>
      </template>
      <template
        slot-scope="record, index, indent, expanded"
        :slot="$scopedSlots.expandedRowRender ? 'expandedRowRender' : ''"
      >
        <slot
          v-bind="{ record, index, indent, expanded }"
          :name="$scopedSlots.expandedRowRender ? 'expandedRowRender' : ''"
        ></slot>
      </template>
    </s-table>
    <!-- 右键菜单 start -->
    <div
      v-show="showRightMenu"
      :style="{ top: menuTop + 'px', left: menuLeft + 'px' }"
      class="right-menu"
      @mouseleave="mouseLeave"
    >
      <action-columns :columns="columns" @reset="onColumnsReset" class="action">
        <template :slot="slot" v-for="slot in slots">
          <slot :name="slot"></slot>
        </template>
      </action-columns>
    </div>
  </div>
</template>

<script>
import { STable } from "../../../components";
import ActionSize from "../../../components/table/advance/ActionSize";
import ActionColumns from "../../../components/table/advance/ActionColumns";
import SearchArea from "../../../components/table/advance/SearchArea";
export default {
  name: "AdvanceTable",
  components: { SearchArea, ActionColumns, ActionSize, STable },
  props: {
    url: Object,
    tableLayout: String,
    bordered: Boolean,
    childrenColumnName: Array[String],
    columns: Array,
    components: Object,
    defaultExpandAllRows: Array[String],
    expandedRowKeys: Array[String],
    expandedRowRender: Function,
    expandIcon: Function,
    expandRowByClick: Boolean,
    expandIconColumnIndex: Number,
    footer: Function,
    indentSize: Number,
    loading: Boolean,
    locale: Object,
    pagination: Object,
    customRow: Function,
    rowKey: [String, Function],
    scroll: Object,
    showHeader: Boolean,
    size: {
      default: "small",
      type: String,
    },
    title: String,
    customRow: Function,
    getPopupContainer: Function,
    transformCellText: Function,
    formatConditions: Boolean,
    queryParam: Object,
    customCell: Function,
    rownumbers: {
      default: true,
      type: Boolean,
    },
    type: String,
    showSearch: {
      type: Boolean,
      default: true,
    },
    pageSize: {
      type: Number,
    },
  },
  provide() {
    return {
      table: this,
    };
  },
  data() {
    return {
      id: `${new Date().getTime()}-${Math.floor(Math.random() * 10)}`,
      fullScreen: false,
      conditions: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        const url = this.type
          ? this.type === "master"
            ? this.url.masterList
            : this.url.subList
          : this.url.getPageSet;
        const requestParameters = Object.assign(
          {},
          parameter,
          this.queryParamObj
        );
        return this.$http.post(url, requestParameters).then((res) => {
          return res.data;
        });
      },
      rowKeys: "",
      selectedRowKeys: [],
      selectedRows: [],
      rows: "",
      queryParamObj: {},
      showRightMenu: false,
      menuTop: "",
      menuLeft: "",
    };
  },
  computed: {
    slots() {
      return Object.keys(this.$slots).filter((slot) => slot !== "title");
    },
    scopedSlots() {
      return Object.keys(this.$scopedSlots).filter(
        (slot) => slot !== "expandedRowRender" && slot !== "title"
      );
    },
    visibleColumns() {
      let columns = this.columns;
      let serial = {
        title: "#",
        width: 50,
        align: "center",
        type: "serial",
        key: "serial",
        scopedSlots: {
          customRender: "serial",
        },
      };
      if (
        this.rownumbers &&
        columns.filter((col) => col.type === "serial").length === 0
      ) {
        columns.splice(0, 0, serial);
      }
      return columns.filter((col) => col.visible);
    },
    rowSelection() {
      return {
        columnWidth: 50,
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
        onSelectAll: this.onSelectAll,
        onSelectInvert: this.onSelectInvert,
      };
    },
  },
  created() {
    this.addListener();
  },
  beforeDestroy() {
    this.removeListener();
  },
  watch: {
    queryParam: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        this.queryParamObj = newVal;
      },
    },
  },
  mounted() {},
  methods: {
    onSelectAll(selected, selectedRows, changeRows) {
      this.$emit("onSelectAll", selected, selectedRows, changeRows);
    },
    onSelectInvert(selectedRows) {
      this.$emit("onSelectInvert", selectedRows);
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys, selectedRows);
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
      this.$emit("onSelectChange", selectedRowKeys, selectedRows);
    },
    // 刷新
    refresh(parmar) {
      this.selectedRowKeys = [];
      this.selectedRows = [];
      this.rows = null;
      this.rowKeys = null;
      setTimeout(() => {
        this.$refs.AdvanceTable.refresh(parmar);
      }, 100);
    },
    // 全屏切换
    toggleScreen() {
      if (this.fullScreen) {
        this.outFullScreen();
      } else {
        this.inFullScreen();
      }
    },
    rowClick(record, index) {
      const that = this;
      return {
        on: {
          click: () => {
            that.rowKeys = record.uuid;
            that.rows = record;
            that.$emit("rowClick", record, index);
          },
        },
      };
    },
    customHeaderRow() {
      return {
        on: {
          contextmenu: (e) => {
            e.preventDefault();
            // 显示
            this.showRightMenu = true;
            // 定位
            this.menuTop = e.clientY;
            this.menuLeft = e.clientX;
          },
        },
      };
    },
    mouseLeave(event) {
      this.showRightMenu = false;
      document.removeEventListener(
        "contextmenu",
        this.handleRemoveRightMenu,
        true
      );
    },
    rowClassName(row) {
      return row.uuid === this.rowKeys ? "bg-bray" : ""; // 每条数据的唯一识别值
    },
    // 全屏
    inFullScreen() {
      const el = this.$refs.table;
      el.classList.add("beauty-scroll");
      if (el.requestFullscreen) {
        el.requestFullscreen();
        return true;
      } else if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen();
        return true;
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
        return true;
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
        return true;
      }
      this.$message.warn("对不起，您的浏览器不支持全屏模式");
      el.classList.remove("beauty-scroll");
      return false;
    },
    outFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      this.$refs.table.classList.remove("beauty-scroll");
    },
    onColumnsReset(conditions) {
      this.$emit("reset", conditions);
    },
    onExpandedRowsChange(expandedRows) {
      this.$emit("expandedRowsChange", expandedRows);
    },
    onChange(pagination, filters, sorter, options) {
      this.$emit("change", pagination, filters, sorter, options);
    },
    onExpand(expanded, record) {
      this.$emit("expand", expanded, record);
    },
    addListener() {
      document.addEventListener("fullscreenchange", this.fullScreenListener);
      document.addEventListener(
        "webkitfullscreenchange",
        this.fullScreenListener
      );
      document.addEventListener("mozfullscreenchange", this.fullScreenListener);
      document.addEventListener("msfullscreenchange", this.fullScreenListener);
      document.addEventListener(
        "contextmenu",
        this.handleRemoveRightMenu,
        true
      );
    },
    removeListener() {
      document.removeEventListener("fullscreenchange", this.fullScreenListener);
      document.removeEventListener(
        "webkitfullscreenchange",
        this.fullScreenListener
      );
      document.removeEventListener(
        "mozfullscreenchange",
        this.fullScreenListener
      );
      document.removeEventListener(
        "msfullscreenchange",
        this.fullScreenListener
      );
      document.removeEventListener(
        "contextmenu",
        this.handleRemoveRightMenu,
        true
      );
    },
    fullScreenListener(e) {
      if (e.target.id === this.id) {
        this.fullScreen = !this.fullScreen;
      }
    },
    handleRemoveRightMenu() {
      this.showRightMenu = false;
    },
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>
