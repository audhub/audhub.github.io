function detectDeviceType() {
    if(navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)){
        deviceType = "mobile";
    } else {
        deviceType = "desktop";
    }
    return deviceType;
}
window.onload = () => {
    settings = document.getElementById("settings");
    preview = document.getElementById("preview");
    menu = document.querySelector("div[class=\"mobile-hide sub\"]")
    menu.addEventListener("click", screentool.menuclick)
    topscreen = document.getElementById("topscreen");
    updateElement = document.getElementById("update");
    search = document.querySelector("input[type=\"search\"]");
    playhide = document.getElementById("playhide");
    playlistcreator = document.getElementById("createplaylist");
    ctxmenu = document.getElementById("contextmenu");
    playctx = document.getElementById("playcontext");
    display = document.querySelector("#display");
    display.addEventListener("click", screentool.displayClicked);
    updateElement.addEventListener("click", screentool.playlistclick);
    ctxmenu.addEventListener("click", screentool.contextclick);
    playctx.addEventListener("click", user.addToPlaylist);
    display.addEventListener("click", () => screentool.hideall());
    display.addEventListener("contextmenu", screentool.contextmenu);
    display.addEventListener("contextmenu", () => screentool.hideplay());
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
                switch (detectDeviceType()){
                    case "desktop":
                        album = document.createElement("span");
                        item.appendChild(album);
                        album.className = "album";
                        album.innerText = "--"
                        break;
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
        style.innerHTML = 'div.item[key="'+css+'"]{background-image: linear-gradient(to bottom, #5152ff, #0077ff)}';
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
            //Data is for artists
            for(let key in item){
                db = database[item[key]];
                playtab = document.createElement("div")
                updateElement.appendChild(playtab); 
                playtab.className = "playtab";
                playimg = new Image();
                playtab.appendChild(playimg);
                //Generate image from first song
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
            //Do something if data is an album
            //Data contains a name, artist name and image;
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
            //Data is for playlists
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
            cover.style.top = element.getBoundingClientRect().top + "px";
            cover.style.width = element.offsetWidth + "px";
            cover.style.height = element.offsetHeight + "px";
            cover.style.left = element.offsetLeft + "px";
            cover.style.backgroundImage = 'url(\''+media.img.cover+'\')';
        }
    },
    settings: function() {
        settings.style.display == "block" ? settings.style.display = "none" : settings.style.display = "block"
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
            if(X.includes(key)){}
            else {
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
        if(media.played.includes(xxx)){}
        else {
            media.played.push(xxx);
            if(location.hostname.toLowerCase() == "audhub.github.io"){
                tracker = new URL('https://l.linklyhq.com/l/1fiKQ');
                tracker.searchParams.set(media.refine(xxx).k.name, media.refine(xxx).x.name);
                fetch(tracker).catch(error => {});    
            }
        }
        if(user.recent.includes(xxx)){
            user.recent.splice(user.recent.indexOf(xxx), 1);
        }
        user.recent.unshift(xxx);
        user.store.recent();
    },
    recdownload: function(src, xox){
        if(media.downloaded.includes(xox)){}
        else {
            media.downloaded.push(xox);
            if(location.hostname.toLowerCase() == "audhub.github.io"){
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
        cover: database.DaBaby.TOES.img,
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
        fillrange = setInterval(() => {range.value = Math.round(audio.currentTime)}, 100);
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
                    break;
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
        preview.style.backgroundImage = `url(${media.refine(xxx).x.img})`
        screentool.resize();
    },
    end: function() {
        switch(media.checkState().loop){
            case true:
                audio.currentTime = 0;
                audio.play();
                break;
            default:
                switch(media.checkState().shuffle) {
                    case true:
                        media.play(media.shuffle_song());
                        break;
                    default:
                        media.next();
                }
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
        switch(shuffle.getAttribute("src")){
            case media.img.shuffle.off:
                mediastate.shuffle = false;
                break;
            case media.img.shuffle.on:
                mediastate.shuffle = true;
                break;
        }
        switch(state.getAttribute("src")){
            case media.img.play.off:
                mediastate.play = false;
                break;
            case media.img.play.on:
                mediastate.play = true;
                break;
        }
        switch(loop.getAttribute("src")){
            case media.img.loop.off:
                //Shuffle is off
                mediastate.loop = false;
                break;
            case media.img.loop.on:
                //Shuffle is on
                mediastate.loop = true;
                break;
        }
        return mediastate;
    },
    checkplaynext: function(){
        if(media.playnext){
            return true;
        } else {
            return false;
        }
    },
    playnext: false,
    search: {
        focus: function() {
            switch(detectDeviceType()) {
                case "mobile":
                    label = document.querySelector("label");
                    label.style.position = "fixed";
                    label.style.width = '94%';
                    label.style.top = '1.5%';
                    label.style.left = '1%';
                    menu.style.display = 'none';
                    break;
            }
        },
        blur: function() {
            switch(detectDeviceType()) {
                case "mobile":
                    label.style = '';
                    menu.style = '';
                    break;
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
                    if(keyDownEvent.altKey == false){
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
                    if(keyDownEvent.altKey == false){
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
            }
            num = [];
            for(i=0;i<10;i++){
                num.push(i.toString());
            }
            if(num.includes(keyDownEvent.key) && keyDownEvent.ctrlKey == false){
                keyDownEvent.preventDefault();
                if(keyDownEvent.key != 0){
                    no = Number(keyDownEvent.key) - 1;
                    display.children[no].click();
                } else {
                    display.children[9].click();
                }
            }
        }
    }
}
const user = {
    check: {
        id: function() {
            if(localStorage.getItem("id")){} else {
                id = new Date().toString().toUpperCase().split('(').shift().replace(/[ +:]/g, '');
                localStorage.setItem("id", id);
            }
            return localStorage.getItem("id");
        },
        in: function() {
            if (location.hostname.toLowerCase() == "audhub.github.io"){
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
        },
        playlist: function() {
            if(localStorage.getItem("playlist")){
                user.playlist = JSON.parse(localStorage.getItem("playlist"));
                return true;
            } else {
                return false;
            }
        },
    },
    recent: [],
    playlist: {},
    extract: function() {
        user.check.recent();
        user.check.playlist();
    },
    store: {
        recent: function() {
            localStorage.setItem("recent", JSON.stringify(user.recent));
        },
        playlist: function() {
            localStorage.setItem("playlist", JSON.stringify(user.playlist));
        }
    },
    cancelplaylist: function() {
        playlistcreator.style.display = 'none';
    },
    createplaylist: function() {
        listname = playlistcreator.children[1].children[0].value.toString();
        console.log(listname)
        if(user.playlist[listname]){
            alert("Playlist already exists");
        } else {
            anum = [];
            for(i=0;i < 10; i++){
                anum.push(i.toString());
            }
            if(anum.includes(listname.charAt(0))){
                alert("The first character of your playlist cannot be a number")
            } else if(listname.includes(".")) {
                alert("No dots allowed")
            } else {
                user.playlist[listname] = {};
                user.playlist[listname].content = [];
                user.playlist[listname].name = listname;
                if(user.pending){
                    user.playlist[listname].content.unshift(user.pending);
                    user.pending = false;
                }
                user.store.playlist();
                user.cancelplaylist();
                screentool.hideall()
            }
        }
    },
    pending: false,
    addToPlaylist: function(e) {
        switch(e.target.innerText.toLowerCase()){
            case "new playlist":
                user.createnewplaylist(ctxObj.xxx);
                break;
            default:
                if(user.playlist[e.target.innerText].content.includes(ctxObj.xxx)){
                    alert("This song alredy exists in the playlist");
                } else {
                    user.playlist[e.target.innerText].content.push(ctxObj.xxx);
                    user.store.playlist();
                    screentool.hideall();
                }
                break;
        }
    },
    createnewplaylist: function(pend) {
        screentool.hideall();
        user.pending = pend;
        playlistcreator.style.display = "block";
        playlistcreator.children[1].children[0].value = '';
        playlistcreator.children[1].children[0].focus();
    }
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
        if(playctx.style.display == "block" || ctxmenu.style.display == "block" || menu.style.display == "block"){}
        else {
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
            //Find T from a click
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
            case "add to":
                if(user.check.playlist()){
                    screentool.playcontext(e);
                } else {
                    screentool.hidecontext();
                    user.createnewplaylist(ctxObj.xxx);
                }
                break;
            case "download":
                screentool.hidecontext();
                media.recdownload(ctxObj.url, ctxObj.xxx);
                break;
        }
    },
    hidecontext: function(){
        ctxmenu.style = "";
    },
    playcontext: function(e) {
        playctx.innerHTML = '';
        button = document.createElement("button");
        playctx.appendChild(button);
        button.innerText = "New Playlist";
        for(let key in user.playlist){
            button = document.createElement("button");
            playctx.appendChild(button);
            button.innerText = user.playlist[key].name;
        }
        playctx.style.display = "block";
        playctx.style.left = e.pageX + "px";
        playctx.style.top = e.pageY + "px";
        screentool.controlcontext(playctx);
    },
    hideplay: function(){
        playctx.style = "";
    },
    hideall: function() {
        screentool.hidecontext();
        screentool.hideplay();
        if(detectDeviceType() == "mobile"){
            if(menu.style.display == "block"){
                menu.style.display = "none"
                document.body.style.overflow = "auto";
            }
        }
    },
    menuclick: function(e) {
        switch(e.target.innerText.toLowerCase()){
            case "recommended":
                toolbar.state('My Music');
                update.setlist(thislist);
                break;
            case "playlists":
                toolbar.state('Playlists');
                update.playlist(user.playlist);
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
                //Create array showing all the albums in the database
                allAlbums = {};
                for(let key in database){
                    db = database[key]
                    //Artist is db
                    for(let item2 in db) {
                        //Artist data are item2
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
            case "settings":
                update.settings();
                break;
            case "now playing":
                toolbar.state('Now Playing');
                update.setlist(queue);
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
            update.setlist(user.playlist[txt].content);
            toolbar.state('Playlist: '+txt);
        } else if (toolbar.status == "artist"){
            txt = txt.replace(/&amp;/g, '&').replace(/[.]/g, '');
            //generate array of songs from artist
            db = database[txt];
            dbs = [];
            for(let items in db){
                if(!X.includes[items]) dbs.push(txt + "." + items)
            }
            update.setlist(dbs);
            toolbar.state(db.name + '\'s Songs')
        } else if (toolbar.status == "album"){
            //generate a list containg the songs in that album;
            songList = [];
            db = database[allAlbums[txt].artist];
            //DB is the artist itself
            for(let key in db){
                if(!X.includes(key)){
                    //item1 is the data in the artist object
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
        a2z = []
        for(let key in thislist){
            a2z.push(thislist[key].split('.').reverse().join('.'));
        }
        a2z = a2z.sort();
        final = [];
        for(let key in a2z){
            final.push(a2z[key].split('.').reverse().join('.'));
        }
        return final;
    }
}
function createScript(code){
    document.body.appendChild(document.createElement("script")).src = "data:application/javascript;base64," + btoa(code)
}
