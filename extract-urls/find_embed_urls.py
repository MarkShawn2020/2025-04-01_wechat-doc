#!/usr/bin/env python3
import json
import os
import csv
from datetime import datetime

def find_values(json_obj, key):
    """递归查找指定key的所有值"""
    results = []
    
    def _extract(obj, results, key):
        """递归函数来提取所有匹配的值"""
        if isinstance(obj, dict):
            for k, v in obj.items():
                if k == key:
                    results.append(v)
                elif isinstance(v, (dict, list)):
                    _extract(v, results, key)
        elif isinstance(obj, list):
            for item in obj:
                if isinstance(item, (dict, list)):
                    _extract(item, results, key)
    
    _extract(json_obj, results, key)
    return results

def save_urls_to_file(urls, output_format='txt'):
    """将URL保存到文件中
    
    Args:
        urls: URL列表
        output_format: 输出格式，支持'txt', 'csv', 'json'
    """
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    if output_format == 'txt':
        filename = f"embed_urls_{timestamp}.txt"
        with open(filename, 'w', encoding='utf-8') as f:
            for i, url in enumerate(urls, 1):
                f.write(f"{i}. {url}\n")
    
    elif output_format == 'csv':
        filename = f"embed_urls_{timestamp}.csv"
        with open(filename, 'w', encoding='utf-8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['序号', 'URL', '宽度', '高度', '类型'])
            
            for i, url in enumerate(urls, 1):
                # 尝试解析URL参数
                width = height = img_type = ''
                if '?' in url:
                    params = url.split('?')[1]
                    for param in params.split('&'):
                        if '=' in param:
                            key, value = param.split('=', 1)
                            if key == 'w': width = value
                            elif key == 'h': height = value
                            elif key == 'type': img_type = value
                
                writer.writerow([i, url, width, height, img_type])
    
    elif output_format == 'json':
        filename = f"embed_urls_{timestamp}.json"
        urls_data = [{
            "id": i,
            "url": url,
            "parsed": {
                "width": url.split('w=')[1].split('&')[0] if 'w=' in url else '',
                "height": url.split('h=')[1].split('&')[0] if 'h=' in url else '',
                "type": url.split('type=')[1] if 'type=' in url else ''
            }
        } for i, url in enumerate(urls, 1)]
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(urls_data, f, ensure_ascii=False, indent=2)
    
    print(f"已将 {len(urls)} 个URL保存到 {filename}")
    return filename

def main():
    # 文件路径
    file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 
                            "data", "【杭州】极睿素人AI短视频训练营精华册 - 数据.json")
    
    # 读取JSON文件
    print(f"正在读取文件: {file_path}")
    with open(file_path, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
            print("文件成功加载")
        except json.JSONDecodeError as e:
            print(f"JSON解析错误: {e}")
            return
    
    # 查找所有的embed值
    target_value = "https://wdcdn.qpic.cn/MTY4ODg1NDYxOTM4NzMzNg_195287_j67BS3o_NXYRRIdb_1742356769?w=2377&h=1245&type=image/png"
    
    # 先找到所有embed值
    embed_values = find_values(data, "embed")
    print(f"找到 {len(embed_values)} 个embed值")
    
    # 检查哪些embed值与目标值匹配
    matching_values = []
    for val in embed_values:
        if isinstance(val, str) and val.startswith("https://wdcdn.qpic.cn/"):
            matching_values.append(val)
    
    # 打印结果
    print(f"\n找到 {len(matching_values)} 个匹配的URL")
    for i, url in enumerate(matching_values, 1):
        print(f"{i}. {url}")
    
    # 特别标出目标URL
    if target_value in matching_values:
        print(f"\n目标URL在结果中的位置: {matching_values.index(target_value) + 1}")
    
    # 保存到不同格式的文件
    save_urls_to_file(matching_values, 'txt')
    save_urls_to_file(matching_values, 'csv')
    save_urls_to_file(matching_values, 'json')

if __name__ == "__main__":
    main()
