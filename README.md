# 通过MEAN技术栈，使用Passport组件，实现本地、FaceBook、Google、Twitter、QQ快捷登陆

This project is build in [mean-book] (https://github.com/strongant/mean_book/releases/tag/v0.1)

##Required by NodeJS,install nodejs
```bash
cd /tmp
wget https://nodejs.org/dist/v4.4.7/node-v4.4.7-linux-x64.tar.xz
tar xvf node-v4.4.7-linux-x64.tar.xz
mv node-v4.4.7-linux-x64 /var/opt/
vi /etc/profile
#add these config
export NODE_HOME=/var/opt/node-v4.4.7-linux-x64s
export PATH=$NODE_HOME/bin:$NODE_HOME/lib/node_modules/npm/bin/node-gyp-bin:$PATH
#:wq
#test node environment
node -v
npm -v
```

## Install, Build, Run

```bash

npm install
npm install -g bower
npm install -g grunt
bower install
npm start
```

## Development
```bash
grunt
```

## Debug
```bash
grunt debug
```

##Test
```bash
grunt test
```

The default task has a nodemon watching for changes.<br/>
To just run server: `node server`
