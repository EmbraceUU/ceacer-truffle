## Solidity 学习笔记

### Mappings

Mapping类型类似于HashMap, 定义为`mapping(_KeyType => _ValueType)`, 其中: 
* `_KeyType`: 不可以是以下类型: mapping / 不定长的数组 / 常量 / 枚举 / 结构体;
* `_ValueType` 可以是任何类型, 包括mappings

Mappings是开箱即用, 按照文档的意思是, 都有可能的Key都存在, 只是默认的Value为0, 并且关键数据没有存储在mapping中, 只是通过keccak256 hash寻找value。

Mapping不能迭代, 需要自己实现。

### memory和storage

### indexed 关键字

### view 关键字