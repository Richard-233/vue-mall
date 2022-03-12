<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="16"><el-input placeholder="请输入接收者id" v-model="receiverId"  ></el-input></el-col>
            <el-col :span="8"> <el-button @click="refresh" type="success">查询聊天记录</el-button></el-col>
        </el-row>

        <el-row :gutter="20">1</el-row>
        <el-row :gutter="20">
            <el-col :span="8"> <el-button @click="refresh" type="success">刷新聊天记录</el-button></el-col>
            <el-col :span="8"> <el-button @click="disrefresh" type="success">停止刷新聊天记录</el-button></el-col>
<!--            <el-col :span="8"> <el-button @click="selectAll" type="success">查询所有聊天记录</el-button></el-col>-->
        </el-row>
<!--        <el-row :gutter="20">1</el-row>-->
<!--        <el-row :gutter="20">-->
<!--            <el-col :span="8"> <el-button @click="getWindows" type="success">获取聊天窗口</el-button></el-col>-->
<!--        </el-row>-->
        <el-row :gutter="20">1</el-row>
        <el-row :gutter="20"> <el-table
                :data="windows"
                border
                style="width: 100%">
            <el-table-column
                    prop="senderId"
                    label="好友id"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="senderName"
                    label="好友昵称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="unReadNumber"
                    label="是否有未读消息"
                    width="120">
            </el-table-column>
                        <el-table-column
                                label="操作"
                                width="300">
                            <template slot-scope="scope">

                                    <el-button
                                            @click="seeFriends(scope.row)"
                                            type="success"
                                            size="small">
                                        查看详情
                                    </el-button>
<!--                                <el-button-->
<!--                                        @click="seeFriends(scope.row)"-->
<!--                                        type="success"-->
<!--                                        size="small">-->
<!--                                    查看详情-->
<!--                                </el-button>-->
                                <el-button
                                        @click="beRead(scope.row)"
                                        type="danger"
                                        size="small">
                                    确认已读
                                </el-button>

                            </template>
                        </el-table-column>
        </el-table></el-row>

        <el-row :gutter="20">1</el-row>
        <el-row :gutter="20">
            <el-col :span="16"><el-input placeholder="请输入消息" v-model="message"  ></el-input></el-col>
            <el-col :span="8"> <el-button @click="sendMessage" type="success">发送</el-button></el-col>
        </el-row>
        <el-row :gutter="20">1</el-row>

        <el-row :gutter="20"> <el-table
                :data="messages"
                border
                style="width: 100%">
            <el-table-column
                    prop="senderId"
                    label="发送者id"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="senderName"
                    label="发送者昵称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="receiverId"
                    label="接收者id"
                    width="120">
            </el-table-column>

            <el-table-column
                    prop="receiverName"
                    label="接收者昵称"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="messages"
                    label="消息"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="时间"
                    width="100">
            </el-table-column>

        </el-table></el-row>
<!--        <el-pagination-->
<!--                @size-change="handleSizeChange"-->
<!--                @current-change="handleCurrentChange"-->
<!--                :current-page="pageNo"-->
<!--                :page-sizes="[3, 20, 30, 40]"-->
<!--                :page-size="pSize"-->
<!--                layout="total, sizes, prev, pager, next, jumper"-->
<!--                :total="totals">-->
<!--        </el-pagination>-->
    </div>
</template>

<script>
//import {_getAll, _sendMessage, _selectAll, _windows, _beRead} from './../../src/api/api'
// import {row} from 'element-ui'
// import {_updateProductById} from '@/api/product'
// import {_addNewProduct} from '../../../../api/product'
export default {
  name: 'communicator',
  data () {
    return {
      messages: [],
      windows: [],
      receiverId: '',
      message: '',
      new: 0,
      unread: 999
    }
  },
  methods: {
    getAll (ri) {
      this.new = 0
      ri = this.receiverId
      let ms = {receiverId: ri}
        this.axios.get('/api/communication/selectmessages', {
            params: ms
        }).then(res => {
            console.info(res)
            this.messages = res
        })

      // _getAll(ms).then(res => {
      //   this.messages = res.data
      // })
    },
    sendMessage () {
      let mess = {messages: this.message, receiverId: this.receiverId}
        this.axios.get('/api/communication/add', {
            params: mess
        }).then(() => {
            this.getAll(this.receiverId)
        })


      // _sendMessage(mess).then(() => {
      //   // this.messages = res.data.list
      //   this.getAll(this.receiverId)
      // })
    },
    refresh () {
      this.new = 0
      this.getWindows()
      this.getAll(this.receiverId)
      // console.info(123)
    },
    disrefresh () {
      this.new = 1
      console.info(this.new)
    },
    selectAll () {
        this.axios.get('/api/communication/selectall').then(res => {
            this.messages = res
        })

      // _selectAll().then(
      //   res => {
      //     this.messages = res.data
      //   }
      // )
    },
    getWindows () {
        this.axios.get('/api/communication/windows').then(res => {
            this.windows = res
            // 这里要把unread加进去

        })


      // _windows().then(
      //   res => {
      //     this.windows = res.data
      //     // 这里要把unread加进去
      //   }
      //)
    },
    seeFriends (row) {
      this.receiverId = row.senderId
      this.getAll(row.senderId)
    },
    beRead (row) {
      // console.info(row.senderId)
      let sId = {receiverId: row.senderId}
        this.axios.get('/api/communication/beread', {
            params: sId
        })


      //_beRead(sId)
    }

  },
  created () {
    this.getWindows()
  },
  mounted () {
    this.$nextTick(function () {
      setInterval(() => { if (this.new === 0) { this.refresh() } }, 5000)
    })
  }
}
</script>
