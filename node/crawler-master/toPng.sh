#!/bin/bash

# 获取当前目录下所有文件
for file in *; do
    # 判断是否为普通文件
    if [[ -f "$file" ]]; then
        # 获取文件大小
        size=$(stat -c %s "$file")
        # 打印文件名和大小
        echo "File: $file, Size: $size bytes"
    fi
    # 判断是否为普通文件且大小小于 1MB (1000000 字节)
    # if [[ -f "$file" && $(stat -c %s "$file") -lt 1000000 ]]; then
    #     echo "Deleting file: $file"
    #     rm "$file"
    # fi
done
