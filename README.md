# React组件封装学习

## mini-Calendar

一个使用Date API封装的简易日历组件
- 使用Date API计算一个月有多少天的技巧
  ```js 
  new Date(year, monthIndex - 1, 0)
  ```
- 封装支持受控与非受控两种方式的组件
  - 使用ahooks的useControllableValue
  - 根据参数中是否传入value来判断使用受控方式还是非受控方式 ( 具体代码放和思路放入语雀文档 )

## Calendar

一个使用了dayjs的日历组件，模仿antd的Calendar

