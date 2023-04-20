# Obsidian BootLoader

## Install

1. Execute script:
```bash
# define your vault dir
VAULT_DIR=~/vault

mkdir $VAULT_DIR/_boot

cd $VAULT_DIR/.obsidian/plugins

git clone https://github.com/zx80live/obsidian-bootloader.git bootloader
```

2. Force reload or restart Obsidian
3. Enable plugin: `Settings` -> `Community plugins` -> enable `BootLoader`


## Usage

### Create library for obsidian
Create your javascript file in `_boot` folder:
```java
// _boot/util.js
'use strict'

// 1. define your classes and constants
class Util {
}

const msg = "Hello"

// 2. Export your classess and constants which be available in obsidian
module.exports = {Util, msg}
```

And then restart Obsidian or execute command: `View` -> `Force reload`

### Use imported libs
All exported objects are contained in `libs` object. Place the following script to `dataviewjs` block:
```java
const util = new libs.Util
const msg = libs.msg
```

## Logs
1. `View` -> `Toggle developer tools`
2. `View` -> `Force reload`
3. Console should be contain logs of BootLoader plugin


## License
This library is distributed under MIT license found in the LICENSE file.