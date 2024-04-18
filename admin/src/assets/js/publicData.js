export const validateData = {
  title: [
    {
      required: true,
      message: '标题不可为空',
      trigger: 'blur'
    }
  ],
  price: [
    {
      type: 'number',
      required: true,
      message: '价格不可为空并且为数字',
      trigger: 'blur'
    }
  ],
  content: [
    {
      required: true,
      message: '内容不可为空',
      trigger: 'blur'
    }
  ],
  category: [
    {
      required: true,
      message: '请选择类别',
      trigger: 'blur'
    }
  ],
  cover: [
    {
      required: true,
      message: '封面不可为空',
      trigger: 'blur'
    }
  ],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 8,
      message: '密码应在3-8位之间',
      trigger: 'blur'
    }
  ],
  gender: [
    {
      required: true,
      message: '性别为必填项',
      trigger: 'blur'
    }
  ],
  avatar: [
    {
      required: true,
      message: '头像不可为空',
      trigger: 'blur'
    }
  ],
  introduction: [
    {
      required: true,
      message: '个人简介不可为空',
      trigger: 'blur'
    }
  ],
  role: [
    {
      required: true,
      message: '用户角色不可为空',
      trigger: 'blur'
    }
  ],
  author: [
    {
      required: true,
      message: '作者姓名不可为空',
      trigger: 'blur'
    }
  ],
  detail: [
    {
      required: true,
      message: '产品详述不可为空',
      trigger: 'blur'
    }
  ],
  totalStore: [
    {
      required: true,
      message: '总库存不可为空，且子属性所含库存不可超过总库存',
      trigger: 'blur'
    }
  ],
  productBrand: [
    {
      required: true,
      message: '产品品牌不可为空',
      trigger: 'blur'
    }
  ],
  productType: [
    {
      required: true,
      message: '产品类型不可为空',
      trigger: 'blur'
    }
  ],
  productMteri: [
    {
      required: true,
      message: '产品材质不可为空',
      trigger: 'blur'
    }
  ],
  productAge: [
    {
      required: true,
      message: '产品品牌不可为空',
      trigger: 'blur'
    }
  ],
  sideCover: [
    {
      required: true,
      message: '产品图不可为空',
      trigger: 'blur'
    }
  ],
  content: [
    {
      required: true,
      message: '产品内容不可为空',
      trigger: 'blur'
    }
  ]
};

export const SUPERID = '6596501bd03195a3138cde58';

export const DEFAULTURL = '/gestavataruploads/default.png';

export const MAINPORT = 'http://localhost:3000/';
