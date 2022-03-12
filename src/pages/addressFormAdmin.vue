<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/second/second' }">地址</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-form :model="addressForm" :rules="rules" ref="addressForm" label-width="80px" class="addressForm">
        <el-form-item label="地址" prop="receiverAddress">
          <el-input v-model="addressForm.receiverAddress" clearable></el-input>
        </el-form-item>
        <el-form-item label="收件人" prop="receiverName">
          <el-input v-model="addressForm.receiverName" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="receiverMobile">
          <el-input v-model="addressForm.receiverMobile" clearable></el-input>
        </el-form-item>
<!--        <el-form-item label="标签" prop="status">-->
<!--        <el-input v-model.="addressForm.status"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="userid" prop="userId">
        <el-input v-model="addressForm.userId" clearable></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="status">
          <el-select v-model="addressForm.status" placeholder="请选择标签">
            <el-option v-for="item in options"
                       :key="item.status"
                       :label="item.label"
                       :value="item.status"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">立即创建</el-button>
          <el-button type="primary" @click="goPrevious()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import api from '@/api/api'
// import {createForm} from '../../../../api/api'
export default {
  name: 'addressForm',
  data: function () {
    return {
      addressForm: {
        'receiverAddress': '',
        'receiverName': '',
        'receiverMobile': '',
        'status': '',
        'userId': ''
        // status: []
      },
      rules: {
        receiverAddress: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        receiverName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        receiverMobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 1, max: 11, message: '输入长度不超过11位数字', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择标签', trigger: 'change' }
        ],
        userId: [
          { required: true, message: '请输入userId', trigger: 'blur' }
        ]
      },
      options: [{
        status: '0',
        label: '无'
      }, {
        status: '1',
        label: '家'
      }, {
        status: '2',
        label: '学校'
      }, {
        status: '3',
        label: '公司'
      }, {
        status: '4',
        label: '默认'
      }]
      // rules: {
      //   name: [
      //     { required: true, message: '请输入地址名称', trigger: 'blur' },
      //     { min: 0, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //   ],
      //   region: [
      //     { required: true, message: '请输入收件人姓名', trigger: 'change' }
      //   ],
      //   date1: [
      //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
      //   ],
      //   date2: [
      //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
      //   ],
      //   type: [
      //     { type: 'array', required: true, message: '请选择一个标签', trigger: 'change' }
      //   ]
      // }
    }
  },
  methods: {
    onSubmit () {
      this.axios.post('/api/userAddress/createUserAddressAdmin',
          this.addressForm
      ).then(() => {
        this.$message.success('创建地址成功！')
        this.$router.push('/adminAddress')
        console.log(this.addressForm)
      }).catch(() => {
        this.$message.error('新建地址失败!')
      })

      // api._post(this.addressForm).then(() => {
      //   this.$message.success('创建用户成功！')
      //   this.$router.push('/main/second/second')
      //   console.log(this.addressForm)
      // }).catch(() => {
      //   this.$message.error('新建地址失败!')
      // })
    },
    goPrevious () {
      this.$router.push('/adminAddress')
    }
    // created () {
    //   this.onSubmit()
    // }
    // onSubmit1 () {
    //   this.http.post('/api/userAddress/createUserAddress', this.addressForm).then((response) => {
    //     console.log(response)
    //   })
    // }
  }
}
</script>
<style scoped>

</style>
