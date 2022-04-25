# 针对gojs 2.1.31版本替换水印。版本替换脚本也需要调整，如无特殊必要勿升级gojs
if [[ `uname` == 'Darwin' ]]; then
  sed -i '' "s/b\.Y\[Ra(\"7eba17a4ca3b1a8346\")\]\[Ra(\"78a118b7\")\](b\.Y,Ik,4,4)/function(){return true;}/g" node_modules/gojs/release/go.js 
  echo 'max os remove go.js watermark successfully!'
fi


if [[ `uname` == 'Linux' ]]; then
  sed -i "s/b\.Y\[Ra(\"7eba17a4ca3b1a8346\")\]\[Ra(\"78a118b7\")\](b\.Y,Ik,4,4)/function(){return true;}/g" node_modules/gojs/release/go.js 
  echo 'remove go.js watermark successfully!'
fi