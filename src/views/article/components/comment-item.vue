<template>
    <van-cell class="comment-item">
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px;"
        :src="comment.aut_photo"
      />
      <span style="color: #466b9d;" slot="title">{{ comment.aut_name }}</span>
      <div slot="label">
        <p style="color: #363636;">{{ comment.content }}</p>
        <p>
          <span style="margin-right: 10px;">{{ comment.pubdate | relativeTime }}</span>
          <van-button
            v-if="reply"
            size="mini"
            type="default"
            @click="$emit('reply-click', comment)"
          >回复 {{ comment.reply_count }}</van-button>
        </p>
      </div>
      <div slot="right-icon" class="like-container">
        <van-icon
          :color="comment.is_liking ? '#e5645f' : ''"
          :name="comment.is_liking ? 'good-job' : 'good-job-o'"
          :loading="commentLoading"
          @click="onCommentLike()"
        />
        <span>{{ comment.like_count ? comment.like_count : '赞' }}</span>
      </div>
    </van-cell>
  </template>
  
  <script>
  import {
    addCommentLike,
    deleteCommentLike
  } from '@/api/comment'
  export default {
    name: 'CommentItem',
    components: {},
    props: {
      comment: {
        type: Object,
        required: true
      },
      reply: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        commentLoading: false
      }
    },
    computed: {},
    watch: {
    },
    created () {},
    methods: {
      async onCommentLike () {
        this.commentLoading = true
        try {
          // 如果已经赞了则取消点赞
          if (this.comment.is_liking) {
            await deleteCommentLike(this.comment.com_id)
            this.comment.like_count--
          } else {
            // 如果没有赞，则点赞
            await addCommentLike(this.comment.com_id)
            this.comment.like_count++
          }
          // 更新视图状态
          this.comment.is_liking = !this.comment.is_liking;
        } catch (err) {
          this.$toast.fail('操作失败')
        }
        this.commentLoading = false
      }
    }
  }
  </script>
  
  <style scoped>
  .comment-item {
    display: flex;
    align-items: flex-start;
  }
  .like-container {
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
  }
  </style>