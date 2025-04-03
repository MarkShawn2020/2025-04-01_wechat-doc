# 微信文档转换工具集 (WeChat Doc Conversion Tools)

这个项目是一套工具集，用于处理从微信文档导出的内容，包括超链接转换、图片URL提取、以及将文档内容转换为更易读的格式。

## 项目结构

```
./
├── data/                          # 数据文件目录
│   └── 【杭州】极睿素人AI短视频训练营精华册 - 数据.json # 原始微信文档数据
├── extract-urls/                  # 提取URL的工具
│   ├── find_embed_urls.py         # 从JSON文件中提取嵌入的URL
│   ├── extract_text_and_images.py # 提取文本内容和图片，生成网站
│   ├── convert_to_markdown.js     # 将提取的URL转换为Markdown格式
│   └── markdown_images.md         # 生成的Markdown图片展示
├── hyperlink-converter/           # 超链接转换工具
│   ├── README.md                  # 超链接转换工具说明
│   ├── hyperlink_converter.js     # 命令行工具入口
│   ├── hyperlink_converter_module.js # 模块化实现
│   ├── example.js                 # 使用示例
│   └── ...                        # 其他示例文件和测试
├── website/                       # 生成的网站展示文档内容
│   └── index.html                 # 包含文本和图片的HTML页面
└── README.md                      # 本文件，项目总体说明
```

## 功能模块说明

### 1. 超链接转换工具 (hyperlink-converter)

这个工具专门用于处理从微信文档导出的特殊格式超链接，将其转换为更易读的格式。

#### 转换前后示例：

**转换前**：
```
\u0013HYPERLINK https://drive.weixin.qq.com/s?k=AJcAfAclAAYnJITNKgAcgAdQaqABs docLink \\tdfe 1004 \\tdfu https://drive.weixin.qq.com/s?k=AJcAfAclAAYnJITNKgAcgAdQaqABs \\l  \\tdft Wedrive \\tdfid i.1970324940094615.1688854619387336_f.742099757wvVK \\tdfn 01.mp4 \\tdlt preview \\tdlf FromUploadFile \\tdtf 0 \\tdh 4505.625 \\tdw 8010 \u001401.mp4\u0015
```

**转换后**：
```
文件：01.mp4，链接： https://drive.weixin.qq.com/s?k=AJcAfAclAAYnJITNKgAcgAdQaqABs
```

#### 使用方法
```bash
cd hyperlink-converter
node hyperlink_converter.js <输入文件> [输出文件]
```

详细说明可查看 `hyperlink-converter/README.md` 文件。

### 2. URL提取工具 (extract-urls)

这套工具用于从微信文档JSON数据中提取嵌入的图片URL，并处理这些URL。

#### 主要功能：
- `find_embed_urls.py` - 从JSON中提取所有嵌入的URL，并保存为不同格式(TXT, CSV, JSON)
- `extract_text_and_images.py` - 提取文档文本内容和图片，生成展示网站
- `convert_to_markdown.js` - 将提取的URL转换为Markdown格式图片引用

#### 使用方法
```bash
cd extract-urls
python find_embed_urls.py                  # 提取URL
python extract_text_and_images.py          # 生成网站
node convert_to_markdown.js                # 转换为Markdown格式
```

### 3. 网站展示 (website)

从处理后的数据自动生成的网站，展示文档内容和相关图片。

#### 查看方法
在浏览器中打开 `website/index.html` 文件即可查看。

## 如何开始使用

1. 确保已安装所需依赖：
   - Python 3.x
   - Node.js

2. 克隆或下载此仓库

3. 根据需要使用不同的工具：
   - 转换超链接：使用 hyperlink-converter 目录下的工具
   - 提取图片URL：使用 extract-urls 目录下的工具
   - 查看网站展示：直接打开 website/index.html

## 工作流程示例

1. 将微信文档数据保存为JSON格式
2. 使用 `find_embed_urls.py` 提取所有嵌入图片URL
3. 使用 `extract_text_and_images.py` 生成网站展示
4. 使用 `hyperlink_converter.js` 转换文档中的特殊格式超链接
5. 使用 `convert_to_markdown.js` 将图片URL转换为Markdown格式

## 注意事项

- 这套工具专为处理从微信文档导出的特定格式设计
- 工具之间可以配合使用，形成完整的文档处理流程
- 转换后的内容便于分享和在其他平台使用 