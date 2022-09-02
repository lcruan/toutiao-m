<template>
  <van-row class="post-comment" type="flex" align="center">
    <van-col span="20">
      <van-field
        ref="post-input"
        rows="2"
        v-model.trim="message"
        autosize
        type="textarea"
        maxlength="50"
        show-word-limit
      />
    </van-col>
    <van-col
      class="post-btn"
      span="4"
      :style="{ color: message.length ? '#4a8ecf' : '#666' }"
      @click="onPostComment"
      :disabled="!message.length"
      >发布</van-col
    >
  </van-row>
</template>
  
  <script>
import { addComments } from "@/api/comment";
export default {
  name: "CommentPost",
  components: {},
  props: {
    target: {
      type: [Number, Object, String],
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {

  },
  watch: {},
  created() {},
  methods: {
    async onPostComment() {
      this.$toast.loading({
        message: "发布中...",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续时间，默认是 2000，如果为 0 则持续展示
      });
      try {
        const { data } = await addComments({
          target: this.target, 
          content: this.message,
          art_id: null, 
        });

        console.log(data);

      // 清空文本框
      this.message = ''
      this.$emit('post-success', data.data)
      this.$toast.success('发布成功！')

      } catch (err) {
        this.$toast.fail("发布失败");
      }
    },
  },
};
</script>
  
  <style scoped>
.post-comment {
  padding: 12px;
}
.van-cell {
  background-color: #f5f7f9;
}
.post-btn {
  font-size: 15px;
  text-align: center;
}
</style>