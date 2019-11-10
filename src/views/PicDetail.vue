<template>
  <div>
    <van-panel>
      <div slot="header" class="header">
        <h3>{{picDetailList.title}}</h3>
        <p>
          <span>发表时间:{{picDetailList.add_time | dateFormat}}</span>
          <span class="right">点击:{{picDetailList.click}}</span>
        </p>
      </div>
      <div slot="default">
        <div>
          <ul class="picBox">
            <li v-for="(item,index) in thumimages" :key="index" @click="showPrevImage(item.src,index)">
              <img :src="item.src" alt="">
            </li>
          </ul>
        </div>
        <div v-html="picDetailList.content"></div>
      </div>
      <my-comment :Id="picID"></my-comment>
    </van-panel>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import Comment from '../components/comment';
export default {
  data() {
    return {
      picID: '',
      // 图片详情数据对象
      picDetailList: {},
      // 图片缩略图数组
      thumimages: [],
      // 需要预览的图片url地址
      urlList: []
    };
  },
  created() {
    this.picID = this.$route.query.id;
    console.log(this.picID);
    this.getPicDetailList();
    this.getthumimages();
  },
  methods: {
    // 获取图片详情数据
    async getPicDetailList() {
      const { data: res } = await this.$http.get(`/api/getimageInfo/${this.picID}`);
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      console.log(res);
      this.picDetailList = res.message[0];
      console.log(this.picDetailList);
    },
    // 获取图片缩略图数据
    async getthumimages() {
      const { data: res } = await this.$http.get(`/api/getthumimages/${this.picID}`);
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      this.thumimages = res.message;
      console.log(this.thumimages);
      this.thumimages.forEach(item => {
        this.urlList.push(item.src);
      });
      console.log(this.urlList);
    },
    showPrevImage(src, index) {
      ImagePreview({
        images: this.urlList,
        startPosition: index
      });
    }
  },
  components: {
    'my-comment': Comment
  }
};
</script>

<style lang="less" scoped>
.header {
  padding-top: 10px;
  border-bottom: 1px solid lightgray;
  h3 {
    margin: 0;
    font-size: 14px;
    text-align: center;
    color: red;
  }
  p {
    color: red;
    margin: 10px 0 10px;
    span {
      font-size: 12px;
    }
  }
}

.right {
  float: right;
}

.van-panel {
  padding: 0 15px 0;
}

.picBox {
  list-style: none;
  margin: 10px 0;
  padding: 0 5px;
  overflow: hidden;
  li {
    margin-right: 10px;
    display: inline;
    img {
      width: 30%;
      height: 30%;
    }
  }
}
</style>