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
      <template>
        <el-row>
          <el-button icon="el-icon-circle-plus-outline" round>
            <template>
              <router-link :to="`/addressForm`" style="text-decoration: none;">新建收货地址</router-link>
            </template>
          </el-button>
        </el-row>
        <div style="margin: 20px 0;"></div>
        <el-table
            :data="addresses"
            style="width: 100%"
            :default-sort = "{prop: 'userId', order: 'descending'}">
          <el-table-column
              prop="userId"
              label="userId"
              width="80"
              sortable>
          </el-table-column>
          <el-table-column
              prop="status"
              label="地址标签"
              width="120">
            <template slot-scope="scope">
              <el-tooltip effect="dark" placement="right" content="点击设置默认地址">
                <el-button v-if="scope.row.status===0" type="info" @click="setDefaultAddress(scope.row)">无</el-button>
                <el-button v-if="scope.row.status===1" type="success" @click="setDefaultAddress(scope.row)">家</el-button>
                <el-button v-if="scope.row.status===2" type="primary" @click="setDefaultAddress(scope.row)">学校</el-button>
                <el-button v-if="scope.row.status===3" type="danger" @click="setDefaultAddress(scope.row)">公司</el-button>
                <el-button v-if="scope.row.status===4" type="warning">默认</el-button></el-tooltip>
<!--              <el-dialog v-if="scope.row.status===0" title="地址设置" :visible.sync="dialogFormVisible2">-->
<!--                <el-button type="primary" @click="checkId(scope.row);setDefaultAddress(scope.row)">设为默认</el-button>-->
<!--                <el-button type="primary" @click="checkId(scope.row);setHomeAddress(scope.row)">设为家</el-button>-->
<!--                <el-button type="primary" @click="checkId(scope.row);setSchoolAddress(scope.row)">设为学校</el-button>-->
<!--                <el-button type="primary" @click="checkId(scope.row);setCompanyAddress(scope.row)">设为公司</el-button>-->
<!--                <el-button @click="dialogFormVisible2 = false">取 消</el-button>-->
<!--              </el-dialog>-->
            </template>
          </el-table-column>
          <el-table-column
              prop="receiverName"
              label="收件人姓名"
              width="150">
          </el-table-column>
          <el-table-column
              prop="receiverAddress"
              label="收货地址"
              width="350">
          </el-table-column>
          <el-table-column
              prop="receiverMobile"
              label="联系电话"
              width="200">
          </el-table-column>
          <el-table-column
              prop="id"
              label="操作"
              width="150">
            <template slot-scope="scope">
              <el-button  @click="dialogFormVisible=true;updateId(scope.row)" type="text" size="medium" round>编辑地址</el-button>
              <el-dialog title="编辑地址" :visible.sync="dialogFormVisible">
                <el-form :model="updateForm">
                  <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.address" autocomplete="off" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="收件人" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.name" autocomplete="off" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.mobile" autocomplete="off" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="标签" :label-width="formLabelWidth">
                    <el-select v-model="updateForm.status" placeholder="请选择标签">
                      <el-option v-for="item in options"
                                 :key="item.status"
                                 :label="item.label"
                                 :value="item.status"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="onSubmit1(scope.row);dialogFormVisible = false">确 定</el-button>
                </div>
              </el-dialog>
<!--              <router-link :to="`/main/second/update`" style="text-decoration: none;">编辑地址</router-link>-->
            </template>
          </el-table-column>
          <el-table-column
              prop="id"
              width="150">
            <template slot-scope="scope">
                <el-button  @click="removeAddress(scope.row)" type="text" size="medium" round>删除地址
                </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-duplicates
// import {_update, _updateAdmin} from '../../../../api/api'
// // import {deleteAddress} from '../../../../api/api'
// // eslint-disable-next-line import/no-duplicates
// import api from '@/api/api'


export default {
  name: 'userAddress',
  data: function () {
    return {
      addresses: [],
      updateForm: {
        'id': '',
        'address': '',
        'name': '',
        'mobile': '',
        'status': ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
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
      }]
    }
  },
  methods: {
    getAddresses: function () {
      this.axios.get('/api/userAddress/getAddress').then((res) => {
        this.addresses = res
      })

       //addressList().then(res => {
      //   this.addresses = res.data
      // })
    },
    setDefaultAddress (param1) {
      this.$confirm('此操作将把该地址设置为默认地址, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        console.log(param1)
        this.axios.post('/api/userAddress/setDefaultAddress', {
          params: param1
        }
        ).then(() => {
              console.log(param1)
              this.$message.success('设置成功!')
              this.getAddresses()
            }
        ).catch(() => {
          this.$message.error('设置失败!')
        })
      }).catch(() => {
        this.$message.info('已取消操作!')
      })

      //   api._setDefault(param1).then(() => {
      //     console.log(param1)
      //     this.$message.success('设置成功!')
      //     this.getAddresses()
      //   }).catch(() => {
      //     this.$message.error('设置失败!')
      //   })
      // }).catch(() => {
      //   this.$message.info('已取消操作!')
      // })


      //   api._setDefault(param1).then(() => {
      //     console.log(param1)
      //     this.$message.success('设置成功!')
      //     this.getAddresses()
      //   }).catch(() => {
      //     this.$message.error('设置失败!')
      //   })
      // }).catch(() => {
      //   this.$message.info('已取消操作!')
      // })
    },
    // setHomeAddress (param2) {
    //   this.$confirm('此操作将, 是否继续?', '提示', {
    //     type: 'warning'
    //   }).then(() => {
    //     api._setHome(param2).then(() => {
    //       this.$message.success('成功!')
    //       this.getAddresses()
    //     }).catch(() => {
    //       this.$message.error('删除失败!')
    //     })
    //   }).catch(() => {
    //     this.$message.info('已取消操作!')
    //   })
    // },
    // setSchoolAddress (param3) {
    //   this.$confirm('此操作将, 是否继续?', '提示', {
    //     type: 'warning'
    //   }).then(() => {
    //     api._setSchool(param3).then(() => {
    //       this.$message.success('成功!')
    //       this.getAddresses()
    //     }).catch(() => {
    //       this.$message.error('失败!')
    //     })
    //   }).catch(() => {
    //     this.$message.info('已取消操作!')
    //   })
    // },
    // setCompanyAddress (param4) {
    //   this.$confirm('此操作将, 是否继续?', '提示', {
    //     type: 'warning'
    //   }).then(() => {
    //     api._setCompany(param4).then(() => {
    //       this.$message.success('成功!')
    //       this.getAddresses()
    //     }).catch(() => {
    //       this.$message.error('失败!')
    //     })
    //   }).catch(() => {
    //     this.$message.info('已取消操作!')
    //   })
    // },
    onSubmit (row) {
      console.info(row)
      console.info(this.updateForm)
      this.axios.get('/api/userAddress/updateUserAddress', {
        params:
          this.updateForm
      }).then(() => {
        this.$message.success('成功!')
        this.getAddresses()
      }).catch(() => {
        this.$message.error('失败!')
      }).catch(() => {
        this.$message.info('已取消操作!')
      })
    },

    //   _update(this.updateForm).then(() => {
    //     this.$message.success('成功!')
    //     this.getAddresses()
    //   }).catch(() => {
    //     this.$message.error('失败!')
    //   }).catch(() => {
    //     this.$message.info('已取消操作!')
    //   })
    // },
    onSubmit1 (row) {
      console.info(row)
      console.info(this.updateForm)
      this.axios.get('/api/userAddress/admin/updateUserAddress', {
        params:
        this.updateForm
      }).then(() => {
        this.$message.success('成功!')
        this.getAddresses()
      }).catch(() => {
        this.$message.error('失败!')
      }).catch(() => {
        this.$message.info('已取消操作!')
      })

      // console.info(row)
      // console.info(this.updateForm)
      // _updateAdmin(this.updateForm).then(() => {
      //   this.$message.success('成功!')
      //   this.getAddresses()
      // }).catch(() => {
      //   this.$message.error('失败!')
      // }).catch(() => {
      //   this.$message.info('已取消操作!')
      // })
    },
    removeAddress (addresses) {
      this.$confirm('此操作将永久删除此地址, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.axios.delete('/api/userAddress/delete/' + addresses.id, {
          params:
          addresses
        }).then(() => {
          this.$message.success('成功!')
          this.getAddresses()
        }).catch(() => {
          this.$message.error('失败!')
        }).catch(() => {
          this.$message.info('已取消操作!')
        })
        // api._remove(addresses).then(() => {
        //   this.$message.success('成功删除了地址!')
        //   this.getAddresses()
        //   console.log(addresses.id)
        // }).catch(() => {
        //   this.$message.error('删除失败!')
        // })
          }
      ).catch(() => {
        this.$message.info('已取消操作!')
      })
    },


    updateId (row) {
      this.updateForm.id = row.id
    },
    updateId1 (row) {
      this.updateStatus.id = row.id
    },
    checkId (row) {
      console.log(row.id)
      return row.id
    }
  },
  created () {
    this.getAddresses()
  }
}

</script>
