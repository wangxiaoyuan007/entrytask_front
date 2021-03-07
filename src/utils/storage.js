/**
 * 存储sessionStorage、localStorage 
 * 默认sessionStorage
 */
const storages = [window.sessionStorage, window.localStorage];
export const setStorage = (name, content, index = 0) => {
    if (!name) return null;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    if (index !== 0) index = 1;
    storages[index].setItem(name, content);

    // if (index == 0 && window.sendSessionStorage) window.sendSessionStorage();

}

/**
 * 获取localStorage
 */
export const getStorage = (name, index = 0) => {
    if (!name) return null;
    if (index !== 0) index = 1;
    return storages[index].getItem(name);
}

export const getStorageParse = (name, index = 0) => {

    let objStr = getStorage(name, index);
    if (objStr === null) return null;
    return JSON.parse(objStr)
}

/**
 * 删除localStorage
 */
export const removeStorage = (name, index = 0) => {
    if (!name) return null;
    if (index !== 0) index = 1;
    storages[index].removeItem(name);
    // if (index == 0 && window.sendSessionStorage) window.sendSessionStorage();
}
export const removeStorageAll = (index = 0) => {

    if (index !== 0) index = 1;
    storages[index].clear();
    // if (index == 0 && window.sendSessionStorage) window.sendSessionStorage();
}

export const setDayStorage = (name, content, days = 1) => {
    if (days < 1) return null;
    var dt = new Date((new Date()).getTime() + 86400000 * (days - 1))
    var timeStr = dt.getFullYear() + ('0' + (dt.getMonth() + 1)).substr(-2) + ('0' + dt.getDate()).substr(-2);
    if (typeof content !== 'string') content = JSON.stringify(content);
    content = `date-${timeStr}-${content}`;
    setStorage(`${name}-days`, content, 1)

}
export const getDayStorage = (name, days = 1) => {

    if (days < 1) return null;
    let content = getStorage(`${name}-days`, 1);
    if (content === null) return null;
    let dt = new Date((new Date()).getTime() + 86400000 * (days - 1))
    let timeStr = dt.getFullYear() + ('0' + (dt.getMonth() + 1)).substr(-2) + ('0' + dt.getDate()).substr(-2);
    if (content.indexOf(`date-${timeStr}-`) === 0) return content.substr(14);
    return null;

}

export const getDaysStorage = (name, days = 1) => {

    let content = null;
    for (let i = 1; i <= days; i++) {
        content = getDayStorage(name, i);
        if (content !== null && content !== undefined) break;
    }
    return content;
}



export const shareStorage = () => {

    window.sendSessionStorage = () => {

        let obj = JSON.parse(JSON.stringify(sessionStorage));
        obj.storageUpdatedTime = Date.now();

        localStorage.setItem("setSessionStorage", JSON.stringify(obj));

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 100)

        })


    }
    window.getSessionStorage = () => {

        localStorage.setItem("getSessionStorage", Date.now());

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 100)

        })

    }

    window.addEventListener("storage", ev => {

        if (ev.key == 'getSessionStorage') {
            if (Object.keys(sessionStorage).length) {
                let obj = JSON.parse(JSON.stringify(sessionStorage));
                obj.storageUpdatedTime = ev.newValue;

                localStorage.setItem("setSessionStorage", JSON.stringify(obj));

            }

        } else if (ev.key == 'setSessionStorage') {
            let v = ev.newValue;
            if (v) {

                sessionStorage.clear();
                let obj = JSON.parse(v);
                for (let key in obj) {
                    if (key !== 'storageUpdatedTime') sessionStorage.setItem(key, obj[key]);
                }
                localStorage.removeItem('setSessionStorage');



            }

        }


    })

}