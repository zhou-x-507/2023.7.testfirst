<template>
  <div class="father">
    <!-- 搜索表单 -->
    <el-form ref="formSearch" :model="formSearch">
      <el-form-item style="width: 200px; position: absolute; left: 0; top: 0">
        <el-input
          v-model="formSearch.number"
          placeholder="身份证号码"
          @change="showSearch"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 150px; position: absolute; left: 210px; top: 0"
      >
        <el-input
          v-model="formSearch.name"
          placeholder="姓名"
          @change="showSearch"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 150px; position: absolute; left: 370px; top: 0"
        ><el-select
          v-model="formSearch.sex"
          placeholder="性别"
          filterable
          clearable
          @change="showSearch"
        >
          <el-option
            v-for="item in optionsSex"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></el-form-item>
      <el-form-item
        style="width: 150px; position: absolute; left: 530px; top: 0"
        ><el-select
          v-model="formSearch.ethnic"
          placeholder="民族"
          filterable
          clearable
          @change="showSearch"
        >
          <el-option
            v-for="item in optionsEthnic.items"
            :key="item.id"
            :label="item.ethnic"
            :value="item.ethnic"
          >
          </el-option> </el-select
      ></el-form-item>
      <el-form-item
        style="width: 150px; position: absolute; left: 690px; top: 0"
      >
        <el-col>
          <el-date-picker
            v-model="formSearch.birthday"
            type="date"
            placeholder="生日"
            value-format="yyyy-MM-dd"
            style="width: 150px"
            @change="showSearch"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item
        style="width: 150px; position: absolute; left: 850px; top: 0"
        ><el-select
          v-model="formSearch.province"
          placeholder="省份"
          filterable
          clearable
          @change="searchProvinceNow"
        >
          <el-option
            v-for="item in optionsProvince.items"
            :key="item.id"
            :label="item.province"
            :value="item.province"
          >
          </el-option> </el-select
      ></el-form-item>
      <el-form-item
        style="width: 150px; position: absolute; left: 1010px; top: 0"
        ><el-select
          v-model="formSearch.city"
          placeholder="城市"
          filterable
          clearable
          :disabled="!formSearch.province"
          @change="showSearch"
        >
          <el-option
            v-for="item in optionsCity.items"
            :key="item.id"
            :label="item.city"
            :value="item.city"
          >
          </el-option> </el-select
      ></el-form-item>
      <el-form-item style="position: absolute; right: 0; top: 0">
        <el-button
          type="primary"
          @click="searchPerson"
          icon="el-icon-search"
          :disabled="disabledSearch"
          >搜索</el-button
        >
        <el-button
          type="danger"
          plain
          @click="clearFormSearch"
          :disabled="disabledSearch"
          >清空</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 返回按钮 -->
    <el-button
      type="primary"
      plain
      @click="backHome"
      style="position: absolute; left: 0px; top: 50px"
      v-if="!isShowAdd"
      icon="el-icon-back"
      >返回</el-button
    >
    <!-- 添加按钮 -->
    <el-button
      type="primary"
      @click="addPerson"
      style="position: absolute; left: 0px; top: 50px"
      v-if="isShowAdd"
      icon="el-icon-plus"
      :disabled="disabledAddUpdateDelete"
      >添加</el-button
    >
    <!-- 添加或编辑表单 -->
    <div class="addOrUpdateForm" v-show="isShowForm">
      <el-form ref="form" :model="form">
        <el-form-item
          label="身份证号码"
          style="width: 200px; position: absolute; left: 25px; top: 20px"
        >
          <el-input
            v-model="form.number"
            placeholder="身份证号码"
            onkeyup="this.value=this.value.replace(/[^\X0-9]/g, '')"
          ></el-input>
          <!-- onkeyup="this.value=this.value.replace(/[^\X0-9]/g, '')" 正则表达式限制输入 -->
        </el-form-item>
        <el-form-item
          label="姓名"
          style="width: 150px; position: absolute; left: 275px; top: 20px"
        >
          <el-input v-model="form.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          style="width: 150px; position: absolute; right: 25px; top: 20px"
        >
          <el-select v-model="form.sex" placeholder="性别" filterable clearable>
            <el-option
              v-for="item in optionsSex"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="民族"
          style="width: 150px; position: absolute; left: 25px; top: 120px"
        >
          <el-select
            v-model="form.ethnic"
            placeholder="民族"
            filterable
            clearable
          >
            <el-option
              v-for="item in optionsEthnic.items"
              :key="item.id"
              :label="item.ethnic"
              :value="item.ethnic"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="生日"
          style="position: absolute; left: 275px; top: 120px"
        >
          <el-col>
            <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="生日"
              value-format="yyyy-MM-dd"
              style="width: 150px"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item
          label="省份"
          style="width: 150px; position: absolute; right: 25px; top: 120px"
        >
          <el-select
            v-model="form.province"
            placeholder="省份"
            filterable
            clearable
            @change="addProvinceNow"
          >
            <el-option
              v-for="item in optionsProvince.items"
              :key="item.id"
              :label="item.province"
              :value="item.province"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="城市"
          style="width: 150px; position: absolute; left: 25px; top: 220px"
        >
          <el-select
            v-model="form.city"
            placeholder="城市"
            filterable
            clearable
            :disabled="!form.province"
          >
            <el-option
              v-for="item in optionsCity.items"
              :key="item.id"
              :label="item.city"
              :value="item.city"
            >
            </el-option> </el-select
        ></el-form-item>
        <el-form-item
          label="详细地址"
          style="width: 200px; position: absolute; left: 275px; top: 220px"
        >
          <el-input v-model="form.address" placeholder="详细地址"></el-input>
        </el-form-item>
        <el-form-item style="position: absolute; right: 25px; top: 260px">
          <el-button type="primary" @click="addSubmit" v-if="isShowButton"
            >提交</el-button
          >
          <el-button type="primary" @click="updateSubmit" v-if="!isShowButton"
            >保存</el-button
          >
          <el-button type="button" @click="hiddenForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <el-table
      :data="personsData.items"
      border
      style="width: 100%; position: absolute; left: 0px; top: 100px"
      height="500"
    >
      <el-table-column prop="number" label="身份证号码" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="65"> </el-table-column>
      <el-table-column prop="ethnic" label="民族" width="100">
      </el-table-column>
      <el-table-column prop="birthday" label="生日" width="110">
      </el-table-column>
      <el-table-column prop="province" label="省份" width="150">
      </el-table-column>
      <el-table-column prop="city" label="城市" width="150"> </el-table-column>
      <el-table-column
        prop="address"
        label="详细地址（县、镇、村）"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="{ row, $index }">
          <el-button
            type="info"
            size="small"
            @click="updatePerson(row, $index)"
            icon="el-icon-edit"
            :disabled="disabledAddUpdateDelete"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            @click="deletePsrson(row, $index)"
            icon="el-icon-delete"
            :disabled="disabledAddUpdateDelete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :disabled="disabledPagination"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "CeShi",
  data() {
    return {
      personsData: [], // 用来存储从后端get到的person数据
      optionsProvince: [], // 省份选择器
      optionsCity: [], // 城市选择器
      optionsSex: [
        { value: 0, label: "女" },
        { value: 1, label: "男" },
      ], // 性别选择器
      optionsEthnic: [], // 民族选择器

      form: {}, // 用户信息表单
      dict: {}, // 用来存储新用户信息表单，然后post给后端
      isShowForm: false, // 用来控制form表单的显示
      isShowButton: false, // 用来控制form表单中（提交按钮/更新按钮）的显示

      formSearch: {}, // 搜索表单
      dictSearch: {}, // 用来存储搜索表单信息，然后post给后端
      isShowAdd: true, // 用来控制（添加按钮/返回按钮）的显示
      disabledSearch: true, // 用来控制搜索按钮是否禁用

      disabledAddUpdateDelete: false, // 当form表单展示时，添加、修改、删除按钮禁用
      disabledPagination: false, // 除了主界面，其他情况下都禁用分页器

      // @size-change="handleSizeChange" // 设置每页显示条数，pageSize改变时触发
      // @current-change="handleCurrentChange" // 设置当前页码，currentPage改变时触发
      // :current-page="currentPage4" // 当前页码
      // :page-sizes="[5, 10, 15]" // 每页显示条数选择器
      // :page-size="10" // 每页显示条数
      // layout="total, sizes, prev, pager, next, jumper" // 组件布局，从左到右依次摆放
      // :total="400" // 数据总条数
      pageSize: 5, // 每页显示条数
      currentPage: 1, // 当前页码
      total: "", // 数据总条数
      dictPagination: {}, // 用来存储pageSize currentPage，然后post给后端
    };
  },
  mounted() {
    this.getJsonData(); // get包括 全部persons（改成了计算人头数）、省份provinces、城市cities
    this.personsDataPagination(); // 专门用来分页获取persons
  },
  methods: {
    // 获取后端数据，get
    getJsonData() {
      // 获取persons，get（基础版）
      axios
        .get("api/persons/", { withCredentials: true })
        .then((response) => {
          // this.personsData = response.data;
          // console.log("从后端拿到的全部person信息", this.personsData);
          // console.log("personsData的items对应的列表", this.personsData.items);
          this.total = response.data.items.length;
          console.log("person数据总条数", this.total);
        })
        .catch((error) => {
          console.error("报错", error);
        });

      // 获取provinces，get
      axios
        .get("api/provinces/", { withCredentials: true })
        .then((response) => {
          this.optionsProvince = response.data;
          console.log("从后端拿到的全部province信息", this.optionsProvince);
          console.log(
            "optionsProvince的items对应的列表",
            this.optionsProvince.items
          );
          console.log(
            "该列表的一个字段",
            this.optionsProvince.items[0].province
          );
        })
        .catch((error) => {
          console.error("报错", error);
        });
      // 获取ethnics，get
      axios
        .get("api/ethnics/", { withCredentials: true })
        .then((response) => {
          this.optionsEthnic = response.data;
          console.log("从后端拿到的全部ethnic信息", this.optionsEthnic);
          console.log(
            "optionsEthnic的items对应的列表",
            this.optionsEthnic.items
          );
          console.log("该列表的一个字段", this.optionsEthnic.items[0].ethnic);
        })
        .catch((error) => {
          console.error("报错", error);
        });
    },
    // 获取persons，post（分页版）
    personsDataPagination() {
      this.dictPagination = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      };
      axios
        .post("api/persons/", this.dictPagination, { withCredentials: true })
        .then((response) => {
          this.personsData = response.data;
          console.log("从后端拿到的当前页person信息", this.personsData);
          console.log("personData的items对应的列表", this.personsData.items);
        })
        .catch((error) => {
          console.log("报错", error);
        });
      this.getJsonData(); // 更新total
    },
    // 添加person按钮
    addPerson() {
      this.isShowForm = true;
      this.isShowButton = true;
      this.formSearch = {}; // 清空搜索表单
      this.disabledSearch = true; // 禁用搜索
      this.disabledAddUpdateDelete = true; // 禁用添加、修改、删除
      this.disabledPagination = true; // 禁用分页器
    },
    // 添加person信息，post
    addSubmit() {
      console.log("获取person的表单信息", this.form);
      this.dict = this.form;
      console.log("将该person信息存到字典中", this.dict);
      axios
        .post("api/add_person/", this.dict, { withCredentials: true })
        .then((response) => {
          console.log("response", response);
          console.log("response.data", response.data);
          // this.personsData = response.data;
          // console.log("从后端拿到的全部person信息", this.personsData);
        })
        .catch((error) => {
          console.error("报错", error);
        });
      this.hiddenForm();
      this.getJsonData(); // 更新total
      this.personsDataPagination(); // 更新personsData
      this.disabledAddUpdateDelete = false; // 启用添加、修改、删除
      this.disabledPagination = false; // 启用分页器
    },
    // 删除person信息，post
    deletePsrson(row) {
      this.dict = cloneDeep(row); // 深拷贝
      console.log("该person的信息", this.dict);
      axios
        .post("api/delete_person/", this.dict, { withCredentials: true })
        .then((response) => {
          console.log("response", response);
          // console.log("response.data", response.data);
          // this.personsData = response.data;
          // console.log("从后端拿到的全部person信息", this.personsData);
        })
        .catch((error) => {
          console.error("报错", error);
        });
      this.getJsonData();
      this.personsDataPagination();
    },
    // 修改person按钮
    updatePerson(row) {
      this.isShowForm = true;
      this.dict = cloneDeep(row); // 深拷贝
      console.log("当前person的全部信息", this.dict);
      this.form = this.dict; // form展示信息=======================================================
      console.log("当前person的表单信息", this.form);
      this.formSearch = {}; // 清空搜索表单
      this.disabledSearch = true; // 禁用搜索
      this.disabledAddUpdateDelete = true; // 禁用添加、修改、删除
      this.disabledPagination = true; // 禁用分页器
    },
    // 修改person信息，post
    updateSubmit() {
      console.log("当前person的表单信息", this.form);
      this.dict = this.form;
      console.log("将该person信息存到字典中", this.dict);
      axios
        .post("api/update_person/", this.dict, { withCredentials: true })
        .then((response) => {
          console.log("response", response);
          // console.log("response.data", response.data);
          // this.personsData = response.data;
          // console.log("从后端拿到的全部person信息", this.personsData);
        })
        .catch((error) => {
          console.error("报错", error);
        });
      this.hiddenForm();
      this.getJsonData();
      this.personsDataPagination();
      this.isShowAdd = true; // 显示添加按钮
      this.disabledAddUpdateDelete = false; // 启用添加、修改、删除
      this.disabledPagination = false; // 启用分页器
    },
    // 取消按钮
    hiddenForm() {
      this.isShowForm = false;
      this.isShowButton = false;
      this.form = {}; // 清空form表单
      this.disabledAddUpdateDelete = false; // 启用添加、修改、删除
      this.disabledPagination = false; // 启用分页器
    },
    // 提交搜索表单，post
    searchPerson() {
      console.log("当前搜索表单信息", this.formSearch);
      this.dictSearch = this.formSearch;
      console.log("将该搜索信息存到字典中", this.dictSearch);
      axios
        .post("api/search_person/", this.dictSearch, { withCredentials: true })
        .then((response) => {
          console.log("response", response);
          console.log("response.data", response.data);
          this.personsData = response.data;
          console.log(
            "从后端拿到的符合搜索条件的全部person信息",
            this.personsData
          );
        })
        .catch((error) => {
          console.log("报错", error);
        });
      this.clearFormSearch(); // 清空搜索表单
      this.disabledSearch = true;
      this.isShowAdd = false;
      this.disabledPagination = true; // 禁用分页器
    },
    // 返回主页面
    backHome() {
      this.personsDataPagination();
      this.isShowAdd = true;
      this.disabledPagination = false; // 启用分页器
    },
    // 启用搜索按钮
    showSearch() {
      this.disabledSearch = false; // 禁用搜索、清空按钮
    },
    // 清空搜索表单
    clearFormSearch() {
      this.formSearch = {};
      this.disabledSearch = true; // 禁用搜索、清空按钮
    },
    // 搜索表单，省份选择器的选择结果 决定 城市选择器的数据
    searchProvinceNow() {
      this.disabledSearch = false;
      console.log("该省份选择器显示", this.formSearch.province);
      this.dictSearch = { province: this.formSearch.province };
      console.log("将该结果存入字典中", this.dictSearch);
      // 获取cities，post（先获取省份，再post给后端，最后get回该省的所有城市）
      axios
        .post("api/cities/", this.dictSearch, { withCredentials: true })
        .then((response) => {
          this.optionsCity = response.data;
          console.log("从后端拿到的该省份的全部city", this.optionsCity);
          console.log("optionsCity的items对应的列表", this.optionsCity.items);
          console.log("该列表的一个字段", this.optionsCity.items[0].city);
        })
        .catch((error) => {
          console.error("报错", error);
        });
    },
    // 添加表单，省份选择器的选择结果 决定 城市选择器的数据
    addProvinceNow() {
      console.log("该省份选择器显示", this.form.province);
      this.dict = { province: this.form.province };
      console.log("将该结果存入字典中", this.dict);
      // 获取cities，post（先获取省份，再post给后端，最后get回该省的所有城市）
      axios
        .post("api/cities/", this.dict, { withCredentials: true })
        .then((response) => {
          this.optionsCity = response.data;
          console.log("从后端拿到的该省份的全部city", this.optionsCity);
          console.log("optionsCity的items对应的列表", this.optionsCity.items);
          console.log("该列表的一个字段", this.optionsCity.items[0].city);
        })
        .catch((error) => {
          console.error("报错", error);
        });
    },
    // pageSize改变时触发
    handleSizeChange(pageSize) {
      console.log("分页器上显示pageSize", pageSize);
      // this.currentPage = 1;
      this.pageSize = pageSize;
      console.log("存储pageSize", this.pageSize);
      this.personsDataPagination();
    },
    // currentPage改变时触发
    handleCurrentChange(currentPage) {
      console.log("分页器上显示currentPage", currentPage);
      this.currentPage = currentPage;
      console.log("存储currentPage", this.currentPage);
      this.personsDataPagination();
    },
  },
};
</script>

<style scoped>
.father {
  width: 80%;
  /* height: 600px; */
  /* background-color: pink; */
  margin: 10px auto;
  position: relative;
}
.addOrUpdateForm {
  width: 700px;
  height: 340px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 100px;
  transform: translate(-50%, 0);
  /* display: none; */
}
.pagination {
  /* width: 600px; */
  height: 30px;
  /* background-color: skyblue; */
  position: absolute;
  top: 60px;
  right: 0;
  /* left: 50%;
  transform: translate(-50%, 0); */
  z-index: 99;
}
</style>
