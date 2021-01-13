import * as Mock from 'mockjs';

Mock.mock('/jurisdictionButton','get',{
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    code: 0,
    message: 'success',
    payload: [
      {id: '1', text:'1', disabled: true, checked: true, children:[
        {id: '2', text:'1-1', disabled: true},
        {id: '3', text:'1-2'},
        {id: '4', text:'1-3'},
        {id: '5', text:'1-4'}
      ]},
      {id: '6', text:'2'},
      {id: '7', text:'5',children:[
        {id: '8', text:'3-1'},
        {id: '9', text:'3-2'},
        {id: '10', text:'3-3'},
        {id: '11', text:'3-4'}
      ]},
    ]
});
Mock.mock('/loadJurisdictionPage','get',{
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  code: 0,
  message: 'success',
  payload: [
    {id: '1', text:'1', disabled: true, checked: true, children:[
      {id: '2', text:'1-1', disabled: true},
      {id: '3', text:'1-2'},
      {id: '4', text:'1-3'},
      {id: '5', text:'1-4'}
    ]},
    {id: '6', text:'2'},
    {id: '7', text:'4',children:[
      {id: '8', text:'3-1'},
      {id: '9', text:'3-2'},
      {id: '10', text:'3-3'},
      {id: '11', text:'3-4'}
    ]},
  ]
});
Mock.mock('/loadJurisdictionInterface','get',{
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  code: 0,
  message: 'success',
  payload: [
    {id: '1', text:'1', disabled: true, checked: true, children:[
      {id: '2', text:'1-1', disabled: true},
      {id: '3', text:'1-2'},
      {id: '4', text:'1-3'},
      {id: '5', text:'1-4'}
    ]},
    {id: '6', text:'2'},
    {id: '7', text:'6',children:[
      {id: '8', text:'3-1'},
      {id: '9', text:'3-2'},
      {id: '10', text:'3-3'},
      {id: '11', text:'3-4'}
    ]},
  ]
});