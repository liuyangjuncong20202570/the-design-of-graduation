<template>
  <div class="addressWrapper">
    <el-form :model="address" label-width="auto" style="max-width: 600px">
      <el-form-item label="收货人">
        <el-input v-model="address.receiver" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="address.phoneNumber" />
      </el-form-item>
      <el-form-item label="省份/城市/区域">
        <el-select v-model="provin" placeholder="省份" style="width: 110px">
          <el-option
            v-for="item in adress"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select
          v-model="city"
          placeholder="城市"
          style="width: 95px"
          no-data-text="请先选择省份"
        >
          <el-option
            v-for="item in pchilds"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select
          class="last"
          v-model="district"
          placeholder="区域"
          style="width: 95px"
          no-data-text="请先选择城市"
        >
          <el-option
            v-for="item in cchilds"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址、门牌号">
        <el-input v-model="address.desc" type="textarea" @blur="handleBlur" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { position } from '@/assets/js/AddressData';
import { storeToRefs } from 'pinia';
import useAddress from '../../../stores/modules/useAddress.js';
import useGest from '@/stores/modules/useGest';
const adress = ref([]);
const initData = async () => {
  const AddressStore = useAddress();
  const res = await AddressStore.fetchAllCity();
  if (res) {
    const { CHAddress } = storeToRefs(AddressStore);
    adress.value = CHAddress.value.data ? CHAddress.value.data : position.data;
    console.log(CHAddress.value);
  }
};
onMounted(() => initData());
const address = reactive({
  receiver: '',
  phoneNumber: '',
  position: '',
  desc: ''
});

const props = defineProps({});

const city = ref('');
const provin = ref('');
const district = ref('');
const pchilds = ref([]);
const cchilds = ref([]);
const updCchilds = value => {
  pchilds.value.map(item => {
    if (item.code === value) {
      cchilds.value = item.cchilds;
    }
  });
};
watch(
  () => provin.value,
  newVal => {
    console.log(newVal);
    adress.value.map(item => {
      if (item.code === newVal) {
        pchilds.value = item.pchilds;
        updCchilds(pchilds.value[0].code);
      }
    });
  },
  { deep: true }
);
watch(
  () => city.value,
  newVal => updCchilds(newVal),
  { deep: true }
);

const getPosition = (pCode, cCode, dCode) => {
  let PName = '',
    CName = '',
    DName = '';
  adress.value.forEach(i1 => {
    if (i1.code === pCode) {
      PName = i1.name;
      i1.pchilds.forEach(i2 => {
        if (i2.code === cCode) {
          CName = i2.name;
          i2.cchilds.forEach(i3 => {
            if (i3.code === dCode) {
              DName = i3.name;
            }
          });
        }
      });
    }
  });
  return PName + CName + DName;
};

const GestStore = useGest();
const { gestData } = storeToRefs(GestStore);
const emits = defineEmits(['close']);
const handleBlur = () => {
  emits('close', {
    receiver: address.receiver,
    phoneNumber: address.phoneNumber,
    position: getPosition(provin.value, city.value, district.value),
    desc: address.desc,
    gestId: gestData.value._id
  });
};
</script>

<style lang="less" scoped>
:deep(.el-select) {
  margin-right: 5px;
}
.last {
  margin-right: 0px !important;
}
</style>
