#!/usr/bin/python
#coding=utf-8
# BIN_RESOURCE_PATH exml文件目录 可以自行配置
# cmd 下 python convert.py  然后加上需要转换的布局文件名称

import os
import xml.dom.minidom
from path import *
global dom;
global ids;



def get_ids(nodes):
    for node in nodes:
        ty = node.nodeName
        if ty != "#text" and ty != 'w:Config':
            print (filePath + ty);
            if node.hasAttribute('id'):
                id = node.getAttribute('id');
                if id != None:
                    id=node._attrs.get('id');
                    value = [id.value, ty]
                ids.append(value)
            else:
                pass
        pass
        if node.childNodes.length > 0:
            if ty!='e:Button':
                get_ids(node.childNodes);
                pass
    pass
    #print ("prase " + filePath + " successfully");
    

def gen_code():
    if(os.path.exists(outPath)):
        os.remove(outPath)
    pass

    fp = open(outPath, "w")
    line = "module game {\n"
    fp.writelines(line)
    line = "	export class " + clsName + "View extends game.ViewBase{\n"
    fp.writelines(line)

    for value in ids:
        id = value[0]
        arr = value[1].split(":");
        if arr[0] == "e":
            arr[0]="eui"
            pass
        elif arr[0]=='tween':
            arr[0]='egret.tween'
            pass
        else:
            pass
        ty = ":" + arr[0] + "." + arr[1];
        line = "		public " + id + ty + ";\n"
        fp.writelines(line)
        pass
    pass
    et = 'this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);'
    if clsName == "ButtonCitySkin" or clsName == "ChatOutSkin":
        et = ''

    line = "\r		public constructor() { \n			super(); \n			this.skinName=\"" + \
        clsName + "\";\n			"+et+" \n		}\n		private onRemove():void{\n			if(this.parent){\n				this.parent.removeChild(this);\n"+"			}\n"+"		}\n"
    fp.writelines(line)
    line = "    }\n}"
    fp.writelines(line);

    fp.flush();
    fp.close();

if __name__ == '__main__':
    clsName = "Demo"
    outPath="Demo"
    filePath = 'Demo'
    
    for root, dirs, files in os.walk(BIN_RESOURCE_PATH):
        for dir in dirs:
            srcDir = os.path.join(OUT_PUT_PATH, dir)
            if not os.path.exists(srcDir):
                os.makedirs(srcDir)
                pass
            else:
                pass
            pass
        
        for f in files:
            filePath = os.path.join(root, f)
            (filepath, tempfilename) = os.path.split(filePath)
            (shotname, extension) = os.path.splitext(tempfilename)
            clsName = shotname
            outPath = os.path.join(root, f).replace(".exml", "View.ts").replace(BIN_RESOURCE_PATH,OUT_PUT_PATH)
            dom = xml.dom.minidom.parse(filePath)
            ids=[];
            get_ids(dom.childNodes)
            gen_code()
