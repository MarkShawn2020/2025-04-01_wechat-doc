# Hyperlink Converter

一个用于转换特殊格式超链接的工具，将文档中特定格式的超链接转换为更易读的格式。

## 问题说明

在一些从微信文档导出的 Markdown 文件中，超链接会以特殊格式出现：

```
\u0013HYPERLINK https://drive.weixin.qq.com/s?k=AJcAfAclAAYnJITNKgAcgAdQaqABs docLink \\tdfe 1004 \\tdfu https://drive.weixin.qq.com/s?k=AJcAfAclAAYnJITNKgAcgAdQaqABs \\l  \\tdft Wedrive \\tdfid i.1970324940094615.1688854619387336_f.742099757wvVK \\tdfn 01.mp4 \\tdlt preview \\tdlf FromUploadFile \\tdtf 0 \\tdh 4505.625 \\tdw 8010 \u001401.mp4\u0015
```

这种格式不易阅读且难以使用。

## 解决方案

此工具将上述格式的超链接转换为更清晰的格式：

```
文件：01.mp4，链接： https://drive.weixin.qq.com/s?k=AJcAfAclAAYnJITNKgAcgAdQaqABs
```

## 文件结构

```
hyperlink-converter/
├── README.md                      # 项目文档
├── hyperlink_converter.js         # 命令行工具入口
├── hyperlink_converter_module.js  # 模块化实现，可导入到其他脚本
├── example.js                     # 使用示例
└── example_input.md               # 示例输入文件（运行示例后生成）
└── example_output.md              # 示例输出文件（运行示例后生成）
```

## 安装

要使用此工具，您需要安装 Node.js。

1. 克隆此仓库或下载源代码
2. 不需要额外安装依赖，工具仅使用 Node.js 内置模块

## 使用方法

### 命令行使用

通过命令行运行脚本：

```bash
node hyperlink_converter.js <输入文件> [输出文件]
```

#### 参数说明

- `<输入文件>`: 必须参数，包含特殊格式超链接的文件路径
- `[输出文件]`: 可选参数，转换后的输出文件路径。如果不指定，将创建与输入文件同目录下的 `.converted` 后缀文件

#### 示例

```bash
# 基本用法
node hyperlink_converter.js document.md

# 指定输出文件
node hyperlink_converter.js document.md cleaned_document.md
```

### 作为模块使用

您也可以将此工具作为模块引入到您的项目中：

```javascript
const { processFile, convertHyperlinks, convertSingleHyperlink } = require('./hyperlink_converter_module');

// 处理整个文件
const convertedCount = processFile('input.md', 'output.md');
console.log(`转换了 ${convertedCount} 个超链接`);

// 处理字符串内容
const content = '\\u0013HYPERLINK https://example.com ... \\u0014file.mp4\\u0015';
const { convertedText, count } = convertHyperlinks(content);
console.log(convertedText);

// 处理单个超链接
const singleLink = '\\u0013HYPERLINK https://example.com ... \\u0014file.mp4\\u0015';
const converted = convertSingleHyperlink(singleLink);
console.log(converted);
```

## 运行示例

提供了一个示例脚本，展示如何使用转换工具：

```bash
node example.js
```

这将创建一个示例输入文件和转换后的输出文件。

## 工作原理

1. 脚本使用正则表达式查找文档中的特殊格式超链接
2. 提取链接 URL 和文件名
3. 将其替换为更友好的格式
4. 保存到新文件

## 示例

### 输入示例

```markdown
课程中讲解（含全流程讲解）：

\u0013HYPERLINK https://drive.weixin.qq.com/s?k=AJcAfAclAAYnJITNKgAcgAdQaqABs docLink \\tdfe 1004 \\tdfu https://drive.weixin.qq.com/s?k=AJcAfAclAAYnJITNKgAcgAdQaqABs \\l  \\tdft Wedrive \\tdfid i.1970324940094615.1688854619387336_f.742099757wvVK \\tdfn 01.mp4 \\tdlt preview \\tdlf FromUploadFile \\tdtf 0 \\tdh 4505.625 \\tdw 8010 \u001401.mp4\u0015
```

### 输出示例

```markdown
课程中讲解（含全流程讲解）：

文件：01.mp4，链接： https://drive.weixin.qq.com/s?k=AJcAfAclAAYnJITNKgAcgAdQaqABs
```

## 注意事项

- 脚本保留文档中的所有其他文本内容
- 仅转换匹配特定模式的超链接
- 适用于从微信文档导出的 Markdown 文件 