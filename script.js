//import { recStream } from "./firebase.js";
function detectDeviceType() {
    if(navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)){
        deviceType = "mobile";
    } else {
        deviceType = "desktop";
    }
    return deviceType;
}
window.onload = () => {
    tdlink = document.getElementById("tdlink")
    noalbum = document.getElementById("noalbum");
    tableImg = document.querySelector("td>img");
    td = document.getElementsByTagName("td");
    prop = document.getElementById("properties");
    contact = document.getElementById("contact");
    preview = document.getElementById("preview");
    menu = document.querySelector("div[class=\"mobile-hide sub\"]")
    menu.addEventListener("click", screentool.menuclick)
    topscreen = document.getElementById("topscreen");
    updateElement = document.getElementById("update");
    search = document.querySelector("input[type=\"search\"]");
    playhide = document.getElementById("playhide");
    ctxmenu = document.getElementById("contextmenu");
    display = document.querySelector("#display");
    display.addEventListener("click", screentool.displayClicked);
    updateElement.addEventListener("click", screentool.playlistclick);
    ctxmenu.addEventListener("click", screentool.contextclick);
    display.addEventListener("click", () => screentool.hideall());
    display.addEventListener("contextmenu", screentool.contextmenu);
    display.parentElement.addEventListener("scroll", () => screentool.hideall());
    window.addEventListener("scroll", () => screentool.hideall());
    link = document.getElementById("link");
    style = document.getElementById("style");
    audio = document.querySelector("audio");
    state = document.querySelector('img.state');
    loop = document.querySelector('img.loop');
    playicon = document.getElementById("playicon");
    shuffle = document.querySelector('img.shuffle');
    metsong = document.querySelector(".metsong");
    search = document.querySelector("input[type=\"search\"]");
    metartist = document.querySelector(".metartist");
    range = document.querySelector('#control>input');
    track = document.getElementById("track");
    screentool.resize();
    if(detectDeviceType() == "desktop"){
        display.focus();     
    }
    random();
    toolbar.state('My Music');
    update.setlist(thislist);
    update.claimfirst();
    user.check.in();
    user.check.url();
}
const update = {
    prop: function() {
        if(prop.style.display != "block"){
            prop.style.display = "block";
            tableImg.src = ctxObj.x.img;
            td[1].innerText = ctxObj.k.name;
            td[2].innerText = ctxObj.x.name;
            ctxObj.x.album ? td[3].innerText = ctxObj.x.album : td[3].innerText = "...";
            ctxObj.x.feat ? td[5].innerText = ctxObj.x.feat : td[5].innerText = "...";
            tdlink.href = ctxObj.x.url;
        } else {
            prop.style = "";
        }
    },
    hideplay: function() {
        updateElement.style.display = 'none';
        playhide.style.display = 'none';
    },
    hidelist: function() {
        display.style.display = 'none';
    },
    setlist: function(list) {
        update.hideplay();
        display.style.display = "block";
        display.innerHTML = '';
        for(n = 0;list[n]; n++){
            key = list[n].split('.');
            k = database[key.shift()];
            x = k[key.pop()];
            item = document.createElement("div");
            display.appendChild(item);
            if(n % 2 === 0 && detectDeviceType() == "desktop"){
                item.setAttribute("scheme", "light");
            }
            item.className = "item";
            item.setAttribute("key", list[n]);
            if(toolbar.isChart && detectDeviceType() == "desktop"){
                ref = document.createElement("span");
                item.appendChild(ref);
                ref.innerHTML = n + 1 +".";
                ref.className = "ref";
            }
            song = document.createElement("span");
            item.appendChild(song);
            song.className = "song";
            song.innerText = x.name;
            if(toolbar.isChart && detectDeviceType() == "mobile"){
                song.innerText = (n + 1) + ". " +song.innerText
            }
            if(x.feat){
                song.innerText += " (feat. " + x.feat + ")";
            }
            artist = document.createElement("span");
            item.appendChild(artist);
            artist.innerText = k.name;
            artist.className = "artist"
            if(x.album){
                switch (detectDeviceType()) {
                    case "desktop":
                        album = document.createElement("span");
                        item.appendChild(album);
                        album.className = "album";
                        album.innerText = x.album
                        break;
                    case "mobile":
                        artist.innerText += " • " + x.album;
                        break;
                }
            } else {
                if (detectDeviceType() == "desktop"){
                    album = document.createElement("span");
                    item.appendChild(album);
                    album.className = "album";
                    album.innerText = "--"
                }
            }
        }
    },
    revealMenu: function() {
        if(detectDeviceType() == "mobile"){
            if(menu.style.display == "block"){
                menu.style.display = "none";
                document.body.style.overflow = "auto";
            } else {
                menu.style.display = "block";
                document.body.style.overflow = "hidden";
            }
        }
    },
    style: function(css) {
        style.innerHTML = 'div.item[key="'+css+'"]{background-image: var(--gradient)}';
    },
    claimfirst: function() {
        xxx = display.firstElementChild.getAttribute("key");
        k = media.refine(xxx).k;
        x = media.refine(xxx).x;
        media.src(xxx, k, x);
        t = document.querySelector("[key=\""+xxx+"\"]");
        metartist.innerText = k.name;
        media.queue();
        audio.pause();
    },
    buttoncss: function(button) {
        if(document.querySelector("button[on]")){
            document.querySelector("button[on]").removeAttribute("on");
        }
        button.setAttribute("on", '');
    },
    playlist: function(item) {
        update.hidelist();
        playhide.style.display = "block";
        updateElement.style.display = 'block';
        updateElement.innerHTML = '';
        if(toolbar.isArtist){
            for(let key in item){
                db = database[item[key]];
                playtab = document.createElement("div")
                updateElement.appendChild(playtab); 
                playtab.className = "playtab";
                playimg = new Image();
                playtab.appendChild(playimg);
                for(let key in db){
                    if(!X.includes(key)){
                        playimg.src = db[key].img;
                        break;
                    }
                }
                playimg.className = "playimg";
                playname = document.createElement("span");
                playtab.appendChild(playname);
                playname.innerText = db.name;
                playname.className = "playname";
            }
        } else if(toolbar.isAlbum) {
            for(let key in item){
                let entry = item[key];
                let playtab = document.createElement("div");
                updateElement.appendChild(playtab);
                playtab.className = "playtab";  
                let playimg =  new Image();
                playtab.appendChild(playimg);
                playimg.src = entry.img;
                playimg.className = "playimg";
                let playname = document.createElement("span");
                playtab.appendChild(playname);
                playname.innerText = entry.name;
                playname.className = "playname";
            }
        } else {
            for(let key in item){
                playtab = document.createElement("div");
                updateElement.appendChild(playtab);
                playtab.className = "playtab";  
                playimg =  new Image();
                playtab.appendChild(playimg);
                playimg.src = database[item[key].content[0].split('.').shift()][item[key].content[0].split('.').pop()].img;
                playimg.className = "playimg";
                playname = document.createElement("span");
                playtab.appendChild(playname);
                playname.innerText = key;
                playname.className = "playname";
            }
        } 
        playhide.innerHTML = '';
        for(i=0;updateElement.children[i];i++){
            cover = document.createElement("div");
            playhide.appendChild(cover);
            cover.className = "playclass";
            element = updateElement.children[i];
            cover.style.top = element.offsetTop + "px";
            cover.style.width = element.offsetWidth + "px";
            cover.style.height = element.offsetHeight + "px";
            cover.style.left = element.offsetLeft + "px";
        }
    },
    contact: function() {
        contact.style.display == "block" ? contact.style.display = "none" : contact.style.display = "block"
    }
}
const thislist = [];
const queue = [];
function random() {
    X = ["name", "audiomack_url", "boomplay_url", "soundcloud_url", "spotify_url", "yt_url", "ytmusic_url", "facebook_url", "ig_url", "twitter_url"]
    let keyd = [];
    for (let key in database) {
        keyd.push(key);
    }
    let key2 = [];
    for(n = 0; keyd[n]; n++){
        let myObj = database[keyd[n]];
        for (let key in myObj){
            if(!X.includes(key)){
                txt = keyd[n] + "." + key;
                key2.push(txt)
            }
        }
    }
    let H = key2.length - 1;
    let numbers = [];
    for (let i = 0; i <= H; i++) {
        numbers.push(i);
    }
    let selectedNumbers = [];
    while (numbers.length > 0) {
        let randomIndex = Math.floor(Math.random() * numbers.length);
        let randomNumber = numbers[randomIndex];
        selectedNumbers.push(randomNumber);
        numbers.splice(randomIndex, 1);
    }
    for(i=0;selectedNumbers.length != 0;i++){
        thislist.push(key2[selectedNumbers.shift()]);
    }
}
window.onresize = () => {
    screentool.resize();
}
const media = {
    searching: function() {
        searched = search.value.toLowerCase();
        searchArray = thislist.sort();
        result = [];
        for(i=0;searchArray[i];i++){
            kSearch = media.refine(searchArray[i]).k;
            xSearch = media.refine(searchArray[i]).x;
            is = false;
            if(xSearch.album && xSearch.album.toLowerCase().includes(searched)){
                is = true;
            }
            if(xSearch.feat && xSearch.feat.toLowerCase().includes(searched)){
                is = true;
            }
            if(kSearch.name.toLowerCase().includes(searched) || xSearch.name.toLowerCase().includes(searched) || xSearch.name.toLowerCase().replace(/[.]/g, '').includes(searched) || kSearch.name.toLowerCase().replace(/[.]/g, '').includes(searched) || kSearch.name.toLowerCase().replace(/[.]/g, '').replace(/[&]/g, 'and').includes(searched) || kSearch.name.toLowerCase().replace(/[&]/g, 'and').includes(searched) || xSearch.name.toLowerCase().replace(/[.]/g, '').replace(/[&]/g, 'and').includes(searched) || xSearch.name.toLowerCase().replace(/[&]/g, 'and').includes(searched)){
                is = true;
            }
            if(is){
                result.push(searchArray[i]);
            }
        }
        if(result.length == 0){
            switch(detectDeviceType()){
                case "desktop":
                    display.innerHTML = '<p style="font-family: centaur; font-weight: bold; opacity: 0.7; display: block; font-size: xx-large; text-align: center"> Sorry, your requested search "'+ search.value +'" doesn\'t exist <br><br> 🤔 </p>';
                    break;
                case "mobile":
                    display.innerHTML = '<p style="font-family: centaur; font-weight: bold; opacity: 0.7; display: block; font-size: xx-large; text-align: center"> Sorry, your requested search "'+ search.value +'" doesn\'t exist <br><br> 🤔 </p>';
                    break;
            }
            toolbar.state('No Results');
        } else {
            update.setlist(result);
            toolbar.state('Search Results');
        }
    },
    queue: function() {
        for(;queue.length != 0;queue.pop()){}
        for(i=0;display.children[i];i++){
            queue.push(display.children[i].getAttribute("key"));
        }
    },
    played: [],
    downloaded: [],
    rec: function() {
        if(!media.played.includes(xxx)){
            media.played.push(xxx);
            if(!domain.includes(location.hostname)){
                tracker = new URL('https://l.linklyhq.com/l/1fiKQ');
                tracker.searchParams.set(media.refine(xxx).k.name, media.refine(xxx).x.name);
                fetch(tracker).catch(error => {});    
            }
            //recStream(xxx);
        }
        if(user.recent.includes(xxx)){
            user.recent.splice(user.recent.indexOf(xxx), 1);
        }
        user.recent.unshift(xxx);
        user.store.recent();
    },
    recdownload: function(src, xox){
        if(!media.downloaded.includes(xox)){
            media.downloaded.push(xox);
            if(!domain.includes(location.hostname)){
                tracker = new URL('https://l.linklyhq.com/l/1fiKa');
                tracker.set(media.refine(xox).k.name, media.refine(xxx).x.name);
                fetch(tracker).catch(error => {});
            }
        }
        media.download(src);
    },
    refine: function(cc) {
        c = cc.split('.');
        rk = database[c.shift()];
        rx = rk[c.pop()];
        return {k:rk, x:rx};
    },
    play: function(cc) {
        k = media.refine(cc).k;
        x = media.refine(cc).x;
        media.src(xxx, k, x);
    },
    img: {
        play: {
            off: '/svg/play.svg',
            on: '/svg/pause.svg',
        },
        shuffle: {
            off: '/svg/shuffle.svg',
            on: '/svg/shuffle-active.svg',
        },
        loop: {
            off: '/svg/loop.svg',
            on: '/svg/loop-active.svg',
        },
    },
    pp: function() {
        state.getAttribute("src") == media.img.play.on ? audio.pause() : audio.play()
    },
    shuffle: function() {
        shuffle.src = shuffle.getAttribute("src") == media.img.shuffle.off ? media.img.shuffle.on : media.img.shuffle.off
    },
    loop: function() {
        loop.src = loop.getAttribute("src") == media.img.loop.off ? media.img.loop.on : media.img.loop.off
    },
    isPlay: function() {
        state.src = media.img.play.on;
        fillrange = setInterval(() => {
            range.value = Math.round(audio.currentTime)
        }, 100);
        media.rec();
    },
    isPause: function() {
        state.src = media.img.play.off;
    },
    extractplaynext: function() {
        media.playnext.shift();
        if(media.playnext.length == 0){
            media.playnext = false;
        }
        t1 = queue.indexOf(xxx);
        queue.splice(t1,1);
        if(queue[t1]){
            media.ext = t1;
        }
    },
    ext: false,
    next: function() {
        if(media.checkplaynext()){
            t0 = queue.indexOf(xxx);
            xxx = queue[t0 + 1];
            k = media.refine(xxx).k;
            x = media.refine(xxx).x;
            media.src(xxx, k, x);
            media.extractplaynext();
        } else {
            switch(media.checkState().shuffle){
                case true:
                    media.play(media.shuffle_song());
                    break;
                default:
                    if(media.ext){
                        xxx = queue[media.ext];
                        media.ext = false;
                    } else {
                        t0 = queue.indexOf(xxx);
                        if(queue[t0 + 1]){
                            xxx = queue[t0 + 1];
                        } else {
                            xxx = queue[0];
                        }
                    }
                    k = media.refine(xxx).k;
                    x = media.refine(xxx).x;
                    media.src(xxx, k, x);
                    return xxx;
            }
        }
    },
    back: function() {
        switch(media.checkState().shuffle){
            case true:
                media.play(media.shuffle_song());
                break;
            default:
                t0 = queue.indexOf(xxx);
                if(queue[t0 - 1]){
                    xxx = queue[t0 - 1];
                } else {
                    xxx = queue[queue.length - 1];
                }
                k = media.refine(xxx).k;
                x = media.refine(xxx).x;
                media.src(xxx, k, x);
                break;
        }
    },
    seek: function() {
        audio.currentTime = track.value;
    },
    change: function() {
        track.value = 0;
        range.value = 0;
        range.max = Math.round(audio.duration);
        track.max = Math.round(audio.duration);
        preview.style.backgroundImage = `url('${media.refine(xxx).x.img}')`
        screentool.resize();
    },
    end: function() {
        switch(media.checkState().loop){
            case true:
                audio.currentTime = 0;
                audio.play();
                break;
            default:
                media.checkState().shuffle ? media.play(media.shuffle_song()) : media.next();
                break;
        }
    },
    shuffle_song: function() {
        randomIndex = Math.floor(Math.random() * queue.length);
        cx = queue[randomIndex];
        return cx;
    },
    checkState: function() {
        const mediastate = {}
        shuffle.getAttribute("src") == media.img.shuffle.off ? mediastate.shuffle = false : mediastate.shuffle = true;
        state.getAttribute("src") == media.img.play.off ? mediastate.play = false : mediastate.play = true;
        loop.getAttribute("src") == media.img.loop.off ? mediastate.loop = false : mediastate.loop = true;
        return mediastate;
    },
    checkplaynext: function(){
        if(media.playnext){return true} else{return false}
    },
    playnext: false,
    search: {
        focus: function() {
            if (detectDeviceType() == "mobile") {
                label = document.querySelector("label");
                label.style.position = "fixed";
                label.style.width = '94%';
                label.style.top = '1.5%';
                label.style.left = '1%';
                menu.style.display = 'none';
            }
        },
        blur: function() {
            if (detectDeviceType() == "mobile") {
                label.style = '';
                menu.style = '';
            }
        }
    },
    download: function(url) {
        link.href = url;
        link.click();
    },
    src: function(xxx, k, x){
        audio.src = x.url;
        metartist.innerText = k.name;
        switch(detectDeviceType()){
            case "desktop":
                if(x.feat){
                    metsong.innerText = x.name + " (feat. " + x.feat + ")";
                } else {
                    metsong.innerText = x.name;
                }
                playicon.src = x.img;
                break;
            case "mobile":
                metsong.innerText = x.name;
                break;
        }
        update.style(xxx);
    }
}
document.onkeydown = (keyDownEvent) => {
    if(keyDownEvent.altKey && keyDownEvent.key.toLowerCase() == "q"){
        keyDownEvent.preventDefault();
        display.focus();
    } else {
        if(keyDownEvent.target.tagName != "INPUT"){
            switch(keyDownEvent.key.toLocaleLowerCase()){
                case "q":
                    if(keyDownEvent.ctrlKey){
                        search.focus();
                        keyDownEvent.preventDefault();
                    }
                    break;
                case " ":
                    keyDownEvent.preventDefault();
                    media.pp();
                    break;
                case "n":                
                    keyDownEvent.preventDefault();
                    media.next();
                    break;
                case "mediatracknext":
                    keyDownEvent.preventDefault();
                    media.next();
                    break;
                case "arrowright":
                    if(!keyDownEvent.altKey){
                        keyDownEvent.preventDefault();
                        ai = Math.round(audio.currentTime);
                        if((ai + 10) <= Number(range.max)){
                            audio.currentTime = ai + 10;
                        } else {
                            media.next();
                        }
                    }
                    break;
                case "arrowleft":
                    if(!keyDownEvent.altKey){
                        keyDownEvent.preventDefault();
                        ai = Math.round(audio.currentTime);
                        if((Number(range.value) - 10) >= 0){
                            audio.currentTime = ai - 10;
                        } else {
                            audio.currentTime = 0;
                        }
                    }
                    break;
                case "b":
                    keyDownEvent.preventDefault();
                    media.back();
                    break;
                case "mediatrackprevious":
                    keyDownEvent.preventDefault();
                    media.back();
                    break;
                case "d":
                    keyDownEvent.preventDefault();
                    if(keyDownEvent.shiftKey){
                        media.download(x.img);
                    } else {
                        media.recdownload(audio.src, xxx);
                    }
                    break;
                case "escape":
                    //loop through modals;
                    let modals = ['div#contact', 'div#contextmenu', 'div#properties']
                    for(items of modals){
                        let element = document.querySelector(items);
                        element.style = "";
                    }
                    break;
                case "m":
                    if(!keyDownEvent.ctrlKey){
                        keyDownEvent.preventDefault();
                        ctxObj = {};
                        ctxObj.e = screentool.findT.frKey(xxx);
                        ctxObj.xxx = xxx;
                        ctxObj.x = media.refine(ctxObj.xxx).x;
                        ctxObj.k = media.refine(ctxObj.xxx).k;
                        ctxObj.url = ctxObj.x.url;
                        update.prop();
                    }
                    break;
            }
            num = [];
            for(i=0;i<10;i++){
                num.push(i.toString());
            }
            if(num.includes(keyDownEvent.key) && !keyDownEvent.ctrlKey){
                keyDownEvent.preventDefault();
                if(keyDownEvent.key != 0){
                    no = Number(keyDownEvent.key) - 1;
                    display.children[no].click();
                } else {
                    display.children[9].click();
                }
            }
        }
        else if(keyDownEvent.target == search && keyDownEvent.key == "Enter"){
            search.blur();
            display.firstElementChild.click();         
        }
    }
}
const user = {
    check: {
        id: function() {
            if(!localStorage.getItem("id")){
                id = new Date().toString().toUpperCase().split('(').shift().replace(/[ +:]/g, '');
                localStorage.setItem("id", id);
            }
            return localStorage.getItem("id");
        },
        in: function() {
            if (!domain.includes(location.hostname)){
                visit = new URL('https://l.linklyhq.com/l/1fiKY');
                visit.searchParams.set("User", user.check.id());
                fetch(visit).then(response => {}).catch(error => {})
            }
            user.extract();
        },
        url: function() {
            try{
                url = new URL(location.href).searchParams.get("tab").toLowerCase();
                switch(url){
                    case "playlists":
                        document.getElementsByClassName("tab")[4].click();
                        break;
                    case "playlist":
                        document.getElementsByClassName("tab")[4].click();
                        break;
                    case "recent":
                        document.getElementsByClassName("tab")[2].click();
                        break;
                    case "now playing":
                        document.getElementsByClassName("tab")[3].click();
                        break;
                    case "albums":
                        document.getElementsByClassName("tab")[6].click()
                        break;
                    case "album":
                        document.getElementsByClassName("tab")[6].click()
                        break;
                    case "all":
                        document.getElementsByClassName("tab")[7].click();
                        break;
                    case "artists":
                        document.getElementsByClassName("tab")[5].click();
                        break;
                    case "artist":
                        document.getElementsByClassName("tab")[5].click();
                        break;
                    case "chart":
                        document.getElementsByClassName("tab")[1].click();
                        break;
                    case "charts":
                        document.getElementsByClassName("tab")[1].click();
                        break;
                }
                update.revealMenu()
            }catch {}
        },
        recent: function() {
            if(localStorage.getItem("recent")){
                user.recent = JSON.parse(localStorage.getItem("recent"));
                return true;
            } else {
                return false;
            }
        }
    },
    recent: [],
    extract: function() {
        user.check.recent();
    },
    store: {
        recent: function() {
            localStorage.setItem("recent", JSON.stringify(user.recent));
        },
    },
}
const screentool = {
    resize: function() {
        track.style.top = range.getBoundingClientRect().top + 'px';
        track.style.left = range.getBoundingClientRect().left + 'px';
        track.style.width = range.getBoundingClientRect().width + 'px';
        preview.style.width = meta.parentElement.getBoundingClientRect().width + 'px';
        preview.style.left = meta.parentElement.getBoundingClientRect().left + 'px';
        preview.style.height = meta.parentElement.getBoundingClientRect().height + 'px';
    },
    displayClicked: function(e) {
        if(!(ctxmenu.style.display == "block" || menu.style.display == "block")){
            xxx = screentool.findT.click(e.target).xax;
            t = screentool.findT.click(e.target).xtx;
            k = media.refine(xxx).k;
            x = media.refine(xxx).x;
            media.src(xxx, k, x);
        }
        media.queue();
    },
    contextmenu: function(e) {
        e.preventDefault();
        ctxObj = {};
        ctxObj.e = screentool.findT.click(e.target).xtx;
        ctxObj.xxx = screentool.findT.click(e.target).xax;
        ctxObj.x = media.refine(ctxObj.xxx).x;
        ctxObj.k = media.refine(ctxObj.xxx).k;
        ctxObj.url = ctxObj.x.url;
        ctxmenu.style.display = "block";
        ctxmenu.style.left = e.pageX + "px";
        ctxmenu.style.top = e.pageY + "px";
        screentool.controlcontext(ctxmenu);
    },
    controlcontext: function(elem){
        element = elem;
        elementPosition = element.getBoundingClientRect().top;
        elementHeight = element.offsetHeight;
        windowHeight = window.innerHeight;
        elementBottom = elementPosition + elementHeight;
        if(elementHeight >= windowHeight){
            element.style.overflow = "auto";
            element.style.height = elementHeight + "px";
        } else {
            if(elementBottom > windowHeight){
                for(i = Number(element.style.top.replace('px', ''));elementBottom > windowHeight;i--){
                    elementPosition = element.getBoundingClientRect().top;
                    elementBottom = elementPosition + elementHeight;
                    element.style.top = i + "px";
                }
            }
        }
        elementWidth = element.offsetWidth + element.getBoundingClientRect().left;
        windowWidth = window.innerWidth;
        if(elementWidth > windowWidth){
            for(i=Number(element.style.left.replace('px', ''));elementWidth > windowWidth;i--){
                elementWidth = element.offsetWidth + element.getBoundingClientRect().left;
                element.style.left = i + "px";
            }
        }
    },
    findT: {
        click: function(w) {
            xtx = w;
            for(;xtx.className != "item";xtx = xtx.parentElement){}
            xax = xtx.getAttribute("key");
            return{xtx, xax}
        },
        frKey: function(w){
            t = document.querySelector("[key=\""+w+"\"]");
            return t;
        }
    },
    contextclick: function(e){
        switch(e.target.innerText.toLowerCase()){
            case "play":
                ctxObj.e.click();
                ctxObj.e.click();
                screentool.hidecontext();
                break;
            case "play next":
                if(media.checkplaynext()){
                    media.playnext.unshift(ctxObj.xxx);
                } else {
                    media.playnext = [];
                    media.playnext.unshift(ctxObj.xxx);
                }
                t0 = queue.indexOf(xxx);
                queue.splice(t0 + 1,0,ctxObj.xxx)
                screentool.hidecontext();
                break;
            case "download":
                screentool.hidecontext();
                media.recdownload(ctxObj.url, ctxObj.xxx);
                break;
            case "properties":
                screentool.hidecontext();
                update.prop();
                break;
            case "show album":
                screentool.hidecontext();
                if(ctxObj.x.album){
                    let albumList = [];
                    for(song in ctxObj.k){
                        if(!X.includes(song)){
                            if(ctxObj.k[song].album){
                                if(ctxObj.k[song].album == ctxObj.x.album){
                                    albumList.push(`${ctxObj.k.name}.${ctxObj.k[song].name}`);
                                }
                            }
                        }
                    }
                    update.setlist(albumList);
                    update.buttoncss(document.getElementsByClassName("tab")[6]);
                    toolbar.state(`${ctxObj.k.name} - ${ctxObj.x.album}`);
                }
                else {
                    noalbum.style.display = "block";
                    let timer = setTimeout(() => {noalbum.removeAttribute("style")}, 1500);
                }
                break;
            case "show artist":
                screentool.hidecontext();
                songList = [];
                for(song in ctxaObj.k){
                    if(!X.includes(song)){
                        songList.push(`${ctxObj.k.name.replaceAll(".", "")}.${ctxObj.k[song].name}`);
                    }
                }
                update.setlist(songList);
                update.buttoncss(document.getElementsByClassName("tab")[5]);
                toolbar.state(`${ctxObj.k.name}'s Songs`);
                break;
        }
    },
    hidecontext: function(){
        ctxmenu.style = "";
    },
    hideall: function() {
        screentool.hidecontext();
        if(detectDeviceType() == "mobile"){
            if(menu.style.display == "block"){
                menu.style.display = "none"
                document.body.style.overflow = "auto";
            }
        }
    },
    menuclick: function(e) {
        screentool.hideall();
        switch(e.target.innerText.toLowerCase()){
            case "recommended":
                toolbar.state('My Music');
                update.setlist(thislist);
                break;
            case "playlists":
                toolbar.state('Playlists');
                update.playlist(playlist);
                toolbar.status = "playlist"
                break;
            case "charts":
                toolbar.isChart = true;
                toolbar.state('Top 100');
                update.setlist(toolbar.toArray(chart));
                toolbar.isChart = false
                break;
            case "recent plays":
                toolbar.state('Recent Plays');
                update.setlist(user.recent);
                break;
            case "contact":
                update.contact();
                break;
            case "artists":
                toolbar.state('Artist');
                allArtist = []
                for(let key in database){
                    allArtist.push(key);
                }
                toolbar.isArtist = true
                update.playlist(allArtist);
                toolbar.isArtist = false
                toolbar.status = "artist"
                break;
            case "albums":
                toolbar.state('Albums');
                allAlbums = {};
                for(let key in database){
                    db = database[key]
                    for(let item2 in db) {
                        if(!X.includes(item2)){
                            item3 = db[item2];
                            if(item3.album){
                                allAlbums[item3.album] = {};
                                allAlbums[item3.album].name = item3.album;
                                allAlbums[item3.album].img = item3.img;
                                allAlbums[item3.album].artist = key;
                            }
                        }
                    }
                }
                toolbar.isAlbum = true;
                toolbar.status = "album";
                update.playlist(allAlbums);
                toolbar.isAlbum = false;
                break;
            case "contact":
                update.contact();
                break;
            case "now playing":
                toolbar.state('Now Playing');
                update.setlist(queue);
                break;
            case "all":
                toolbar.state('A-Z');
                update.setlist(toolbar.sort());
                break;
        }
        update.buttoncss(e.target);
        if (detectDeviceType() == "mobile") update.revealMenu();
    },
    playlistclick: function(e){
        t = e.target;
        switch(e.target.tagName.toLowerCase()){
            case "playtab":
                txt = e.target.lastElementChild.innerHTML;
                break;
            case "img":
                txt = e.target.nextElementSibling.innerHTML;
                break;
            case "span":
                txt = e.target.innerHTML;
        }
        if(toolbar.status == "playlist"){
            update.setlist(playlist[txt].content);
            toolbar.state('Playlist: '+txt);
        } else if (toolbar.status == "artist"){
            txt = txt.replace(/&amp;/g, '&').replace(/[.]/g, '');
            db = database[txt];
            dbs = [];
            for(let items in db){
                if(!X.includes[items]) dbs.push(txt + "." + items)
            }
            update.setlist(dbs);
            toolbar.state(db.name + '\'s Songs')
        } else if (toolbar.status == "album"){
            songList = [];
            db = database[allAlbums[txt].artist];
            for(let key in db){
                if(!X.includes(key)){
                    let item1 = db[key]
                    if(item1.album){
                        if(item1.album == txt){
                            songList.push(allAlbums[txt].artist + '.' + key);
                        }
                    }
                }
            }
            update.setlist(songList);
            toolbar.state(db.name + ' - ' + txt);
        }
        toolbar.status = "";
    }
}
const toolbar = {
    toArray: function(cc) {
        myArray = [];
        for(i=1;cc[i];i++){
            myArray.push(cc[i]);
        }
        return myArray;
    },
    state: function(cc){
        topscreen.innerHTML = cc;
    },
    sort: function() {
        let a2z = []
        for(let key in thislist){
            a2z.push(thislist[key].split('.').reverse().join('.'));
        }
        a2z = a2z.sort();
        let final = [];
        for(let key in a2z){
            final.push(a2z[key].split('.').reverse().join('.'));
        }
        return final;
    }
}
console.info(`Number => Play Song, D => Download Current Song, Shift+D => Download Current Song's Album Art, SpaceBar => Play/Pause, ArrowKeys => Skip, N => Next song, B => Previous Song, MediaKeys => Previous/Next, M => Display Metadata`)
function pass(array){update.setlist(array)};
