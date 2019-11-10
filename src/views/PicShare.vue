<template>
  <div>
    <van-tabs v-model="activeName" @click="toggleTabs">
      <van-tab title="全部">
        <ul class="img_list">
          <li v-for="img in picsList" :key="img.id" @click="goPicDetail(img.id)">
            <div class="imgBox">
              <img v-lazy="img.img_url">
            </div>
            <div class="preBox">
              <p>{{img.title}}</p>
              <p>{{img.zhaiyao}}</p>
            </div>
          </li>
        </ul>
      </van-tab>
      <van-tab v-for="item in navList" :title="item.title" :key="item.id" :name="item.id">
        <ul class="img_list">
          <li v-for="img in picsList" :key="img.id" @click="goPicDetail(img.id)">
            <div class="imgBox">
              <img v-lazy="img.img_url">
            </div>
            <div class="preBox">
              <p>{{img.title}}</p>
              <p>{{img.zhaiyao}}</p>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 图片分类数据
      navList: [],
      // 当前标签页
      activeName: '',
      // 所有图片数据
      picsList: []
    };
  },
  created() {
    this.getPicCategory();
  },
  methods: {
    // 获取图片分类数据
    async getPicCategory() {
      const { data: res } = await this.$http.get('/api/getimgcategory');
      // console.log(res);
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      this.navList = res.message;
      this.getAllPicList();
    },
    async toggleTabs() {
      if (this.activeName === 0) {
        this.getAllPicList();
      }
      // console.log(this.activeName);
      const { data: res } = await this.$http.get(`/api/getimages/${this.activeName}`);
      // console.log(res);
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      this.picsList = res.message;
      console.log(this.picsList);
    },
    // 获取全部图片数据
    getAllPicList() {
      console.log(this.navList);
      this.navList.forEach(async item => {
        const { data: res } = await this.$http.get(`/api/getimages/${item.id}`);
        // console.log(res.message);
        if (res.status !== 0) {
          this.$toast('服务器异常');
        }
        this.picsList.push(...res.message);
      });
      console.log(this.picsList);
    },
    // 前往图片详情页面
    goPicDetail(picID) {
      this.$router.push({ path: '/picDetail', query: { id: picID } });
    }
  }
};
</script>

<style lang="less" scoped>
.img_list li {
  width: 100%;
  margin: 10px 0;
  overflow: hidden;
  height: 300px;
  position: relative;
  text-align: center;
  .imgBox img {
    border-radius: 5px;
  }
  .preBox {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    height: 75px;
    p {
      margin: 5px 0;
      font-size: 12px;
    }
  }
}
</style>