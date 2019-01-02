<template>
  <div id="category">
    <div class="category-searchbar">
      <van-search placeholder="请输入搜索关键词" v-model="value" />
    </div>
    <van-tree-select
      :items="items"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @navclick="onNavClick"
      @itemclick="onItemClick"
    />
  </div>
</template>
<script>
import { TreeSelect, Search } from 'vant';

export default {
  components: {
    [TreeSelect.name]: TreeSelect,
    [Search.name]: Search,
  },
  data() { 
    return {
      // items,
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      activeId: 1
    }
  },

  computed: {
    items() {
      return [{
        text: this.$t('group1'),
        children: [...this.$t('city1'), ...this.$t('city2')]
      }, {
        text: this.$t('group2'),
        children: this.$t('city1')
      }, {
        text: this.$t('group3'),
        children: this.$t('city2')
      }, {
        text: this.$t('group4'),
        children: this.$t('city3')
      }];
    }
  },
  
  methods: {
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
    }
  }
}
</script>
<style lang="scss" scoped>
 #category {
  height: 100%;
  background: #fff;
  .van-tree-select__nav {
    width: 30%;
    background: #efefef;
  }
  .van-tree-select__nitem {
    line-height: 50px;
  }
  .van-tree-select__nitem--active {

  }
  .van-tree-select__content {
    // width: 50%;
    margin-left: 30%;
    // width:70%;
  }
 }
</style>
