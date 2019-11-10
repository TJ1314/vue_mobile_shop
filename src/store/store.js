import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 商品信息数组
    shopInfo: [],
    // 初始商品数量规格
    beginNum: 1,
    // 所有商品的总数量
    allNum: 0,
    // 搜索关键字数组
    searchKeys: []
  },
  mutations: {
    addShop(state, id) {
      const obj = {
        id: '',
        num: 0
      };
      const index = state.shopInfo.findIndex(item => item.id === id);
      if (index !== -1) {
        // 如果之前存在，直接在原基础上累加数量
        state.shopInfo[index].num += state.beginNum;
        if (state.shopInfo.length === 1) {
          // 计算总数
          state.allNum = state.shopInfo[index].num;
        }
        state.allNum = 0;
        state.shopInfo.forEach(item => {
          state.allNum += item.num;
        });
      } else {
        obj.id = id;
        obj.num = state.beginNum;
        state.shopInfo.push(obj);
        state.allNum = 0;
        state.shopInfo.forEach(item => {
          state.allNum += item.num;
        });
      }
      sessionStorage.setItem('shopCarList', JSON.stringify(state.shopInfo));
    },
    // 商品数量动态变化
    shopNum(state, params) {
      // console.log(params);
      console.log(state.shopInfo);
      state.shopInfo.forEach(item => {
        if (item.id === params.id) {
          // 更新最新的商品数量
          item.num = params.num;
        }
      });
      state.allNum = 0;
      state.shopInfo.forEach(item => {
        state.allNum += item.num;
      });
      // console.log(state.shopInfo);
      sessionStorage.setItem('shopCarList', JSON.stringify(state.shopInfo));
    },
    // 当页面一刷新的时候得到商品总数
    begin(state) {
      if (sessionStorage.getItem('shopCarList') === null) {
        return;
      }
      state.shopInfo = JSON.parse(sessionStorage.getItem('shopCarList'));
      // sessionStorage.setItem('shopCarList', JSON.stringify(state.shopInfo));
      console.log(state.shopInfo);
      // 先清空，防止重复计算
      state.allNum = 0;
      state.shopInfo.forEach(item => {
        state.allNum += item.num;
      });
    },
    // 初始商品规格
    beginNum(state, num) {
      state.beginNum = num;
      console.log(state.beginNum);
    },
    // 删除商品
    deleteShop(state, id) {
      state.shopInfo = JSON.parse(sessionStorage.getItem('shopCarList'));
      console.log(state.shopInfo);
      const index = state.shopInfo.findIndex(item => item.id === id);
      if (index !== -1) {
        if (state.shopInfo.length > 1) {
          state.shopInfo.splice(index, 1);
          sessionStorage.setItem('shopCarList', JSON.stringify(state.shopInfo));
        }
        // 如果只剩一项数据，直接删掉此session
        sessionStorage.removeItem('shopCarList');
      }
    },
    // 添加搜索关键字
    addSearchKey(state, key) {
      if (JSON.parse(sessionStorage.getItem('searchKeysList')) === null) {
        // 如果原来没有数据的话，直接赋值
        state.searchKeys = [key];
      }
      const index = state.searchKeys.findIndex(item => item === key);
      if (index === -1) {
        state.searchKeys.push(key);
      }
      sessionStorage.setItem('searchKeysList', JSON.stringify(state.searchKeys));
    },
    // 当搜索页面刷新时
    beginSearch(state) {
      state.searchKeys = JSON.parse(sessionStorage.getItem('searchKeysList'));
    },
    // 清空历史记录
    clearHistory() {
      sessionStorage.removeItem('searchKeysList');
    }
  }
});
