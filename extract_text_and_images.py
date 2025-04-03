#!/usr/bin/env python3
import json
import os

def extract_text_content(file_path):
    """提取指定路径的文本内容"""
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 提取指定路径的文本内容
    try:
        text_content = data["clientVars"]["collab_client_vars"]["initialAttributedText"]["text"][0]["commands"][0]["mutations"][0]["s"]
        print(f"成功提取文本内容，长度为: {len(text_content)}")
        return text_content
    except (KeyError, IndexError) as e:
        print(f"提取文本内容失败: {e}")
        return None

def find_image_positions(data_file, images_file, output_dir="website"):
    """确定图片在文本中的位置，并生成网站所需的文件"""
    # 提取文本内容
    text_content = extract_text_content(data_file)
    if not text_content:
        return
    
    # 读取图片URL
    with open(images_file, 'r', encoding='utf-8') as f:
        try:
            images_data = json.load(f)
            print(f"成功读取图片数据，共有 {len(images_data)} 张图片")
        except json.JSONDecodeError:
            print("图片数据格式错误")
            return
    
    # 创建输出目录
    os.makedirs(output_dir, exist_ok=True)
    
    # 生成HTML文件
    generate_website(text_content, images_data, output_dir)

def generate_website(text_content, images_data, output_dir):
    """生成简单的网站展示文本和图片"""
    # 生成简单的HTML
    html_content = """
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>训练营精华册内容展示</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
            }
            .container {
                display: flex;
                width: 100%;
                height: 100vh;
            }
            .text-column {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                border-right: 1px solid #ddd;
            }
            .image-column {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background-color: #f7f7f7;
            }
            .image-container {
                margin-bottom: 30px;
                text-align: center;
            }
            .image-container img {
                max-width: 100%;
                border: 1px solid #ddd;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h1 {
                text-align: center;
                margin-bottom: 30px;
            }
            p {
                line-height: 1.6;
                margin-bottom: 10px;
            }
            .image-title {
                font-weight: bold;
                margin-bottom: 10px;
            }
            .image-info {
                font-size: 0.8em;
                color: #666;
                margin-top: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="text-column">
                <h1>训练营内容</h1>
                <div id="text-content">
                    <!-- 文本内容将通过JavaScript插入 -->
                </div>
            </div>
            <div class="image-column">
                <h1>相关图片</h1>
                <div id="image-content">
                    <!-- 图片内容将通过JavaScript插入 -->
                </div>
            </div>
        </div>
        <script>
            // 文本内容
            const textContent = `""" + text_content + """`;
            
            // 图片数据
            const imagesData = """ + json.dumps(images_data) + """;
            
            // 将文本内容格式化并插入页面
            document.getElementById('text-content').innerHTML = textContent.split('\\n').map(line => {
                // 如果是空行，添加额外的空间
                if (line.trim() === '') {
                    return '<br>';
                }
                return `<p>${line}</p>`;
            }).join('');
            
            // 将图片插入页面
            const imageHTML = imagesData.map(img => {
                return `
                <div class="image-container">
                    <div class="image-title">图片 ${img.id}</div>
                    <img src="${img.url}" alt="图片 ${img.id}">
                    <div class="image-info">
                        宽度: ${img.parsed.width || 'N/A'}, 
                        高度: ${img.parsed.height || 'N/A'}, 
                        类型: ${img.parsed.type || 'N/A'}
                    </div>
                </div>
                `;
            }).join('');
            
            document.getElementById('image-content').innerHTML = imageHTML;
            
            // 为将来添加图片与文本关联的功能预留
            // TODO: 分析文本中可能的图片位置，并在文本和图片之间创建连接
        </script>
    </body>
    </html>
    """
    
    # 写入HTML文件
    with open(os.path.join(output_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"网站生成完成，请打开 {output_dir}/index.html 查看")

if __name__ == "__main__":
    # 设置文件路径
    current_dir = os.path.dirname(os.path.abspath(__file__))
    data_file = os.path.join(current_dir, "data", "【杭州】极睿素人AI短视频训练营精华册 - 数据.json")
    
    # 使用最后生成的JSON图片文件
    import glob
    image_files = glob.glob("embed_urls_*.json")
    if not image_files:
        print("未找到图片数据文件")
        exit(1)
    
    # 选择最新的图片文件
    latest_image_file = max(image_files, key=os.path.getctime)
    print(f"使用图片数据文件: {latest_image_file}")
    
    find_image_positions(data_file, latest_image_file)
