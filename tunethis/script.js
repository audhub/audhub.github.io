if(window.innerHeight > window.innerWidth){
    wide = false;
} else {
    wide = true;
}
const mobileHide = (e) => {
    if(e.target.className != "elips"){
        hideMenu();
    }
    if(controls.style.display == "block"){
        if(e.target != controls && e.target.parentElement != controls && e.target != play_case && e.target.parentElement != play_case && e.target.parentElement.parentElement != play_case && e.target != pc_range){
            controls.style.display = "";
        }
    }
    if(menu.style.display == "block"){
        if(e.target != controls && e.target.parentElement != controls && e.target != play_case && e.target.parentElement != play_case && e.target.parentElement.parentElement != play_case && e.target != pc_range){
            controls.style.display = "";
        }
    }
}
function revealControls() {
    if(controls.style.display == "block"){
        controls.style.display = "";
    } else {
        controls.style.display = "block";
    }
}
const displayClicked = (e) => {
    display.focus();
    if(wide){
        w = e.target;
        if(w.className != "list"){
            do{
                w = w.parentElement;
            } while(w.className != "list")
        }
        key = w.getAttribute("key")
        xxx = key;
        n = -1;
        do{
            n++;
        }while(display.children[n] != w)
        NUM = n;
        refineDetails();
        setMusic();
    } else {
        if(e.target.className != "elips" && e.target.parentElement != menu){
            w = e.target;
            if(w.className != "list"){
                do{
                    w = w.parentElement;
                } while(w.className != "list")
            }
            key = w.getAttribute("key")
            xxx = key;
            n = -1;
            do{
                n++;
            }while(display.children[n] != w)
            NUM = n;
            refineDetails();
            setMusic();
        }
    }
}
const customcontextmenu = (e) => {
    keyd = key;
    if(wide){
        if(e.target.tagName.toLowerCase() != "img"){
            e.preventDefault();
            w = e.target;
            if(w.className != "list"){
                do{
                    w = w.parentElement;
                } while(w.className != "list")
            }
            key = w.getAttribute("key");
            menu.style.display = "block";
            menu.style.left = e.pageX + "px";
            menu.style.top = e.pageY + "px";
        }
    } else {
        if(e.target.className == "elips"){
            w = e.target;
            if(w.className != "list"){
                do{
                    w = w.parentElement;
                } while(w.className != "list")
            }
            key = w.getAttribute("key");
            menu.style.display = "block";
            menu.style.right = "15px";
            menu.style.top = e.target.getBoundingClientRect().top + "px";
        }
    }
}
function ex_play() {
    w.click();
}
window.onload= () => {
    isDown = {};
    isPlay = {};
    isReveal = false;
    isModal = false;
    modal = false;
    oldModal = false;
    audio = document.querySelector("audio");
    link = document.getElementById("link");
    menu = document.getElementById("contextmenu");
    stream = document.getElementById("stream");
    meta_data = document.getElementById("meta-data");
    meta_img = document.querySelector("div.img-meta-data");
    search = document.querySelector("input[type=\"search\"]");
    style = document.querySelector("style");	
    meta_tbody = document.querySelector("tbody.meta-data");
    meta_button = document.getElementById("meta-button");
    search.onkeydown  = (keyDownEvent) => {
        if(keyDownEvent.key == "Enter"){
            display.firstElementChild.click();
            if(wide){
                search.blur();
		display.focus();
            } else {
                R();
            }
        }
    }
    pc_range = document.getElementById("pc-range");
    pc_prog = document.getElementById("pc-progress");
    pc_top = document.getElementById("pc-top");
    play_case = document.querySelector('div[id="play case"]');
    case_img = document.querySelector('div[id="play case"]>img');
    case_div = document.querySelector('div[id="play case"]>div');
    display = document.getElementById("display");
    display_section = document.getElementById("display-section");
    case_div.style.width = (play_case.getBoundingClientRect().width - (case_img.getBoundingClientRect().width + 20)) + "px";
    pc_play_artist = document.querySelector("span[class=\"case artist\"]");
    pc_play_song = document.querySelector("span[class=\"case song\"]");
    pc_play_img = document.querySelector('div[id="play case"]>img');
    if(wide){
        button_case = document.querySelector('div[id="button case"]');
        button_case.style.width = (pc_top.getBoundingClientRect().width - (play_case.getBoundingClientRect().width + 5)) + "px";
        display = document.getElementById("display");
        display_section.style.marginTop = pc_top.getBoundingClientRect().height + "px";
        document.body.addEventListener("click", () => hideMenu())
        display.addEventListener("contextmenu", customcontextmenu);
        display.focus();
    } else {
        screenleft = document.getElementById("screen-left");
        screenright = document.getElementById("screen-right");
        display_section = document.getElementById("display-section");
        play_case = document.querySelector('div[id="play case"]');
        display_section.style.marginTop = screenleft.getBoundingClientRect().height + 'px';
        display_section.style.marginBottom = play_case.getBoundingClientRect().height + 'px';
        controls = document.getElementById("controls");
        button_case = controls.firstElementChild;
        document.body.addEventListener("click", mobileHide)
        window.addEventListener("scroll", mobileHide)
        play_case.addEventListener("click", () => revealControls());
        search.addEventListener("blur", () => R());
    }
    listSongs();
    display.addEventListener("click", displayClicked);
    check_userID();
    checkDate();
}
function checkDate() {
    if(location.hostname == "tunethis.w3spaces.com"){
        visit = new URL('https://l.linklyhq.com/l/1fiKY');
        visit.searchParams.set("User", localStorage.getItem("id"));
        fetch(visit).then(response => {}).catch(error => {})
    }
}
function listSongs() {
    n = 1;
    do{
        select = chart[n].split('.');
        key = chart[n];
        k = database[select.shift()];
        x = k[select.shift()];
        if(wide){
            list = document.createElement("div");
            display.appendChild(list);
            list.className = "list";
            if((n/2).toString().replace('.', '=').search('=') != -1 ){
                list.setAttribute("scheme", "dark")
            }
            list.setAttribute("key", key);
            list.id = "n" + n;
            img = document.createElement("img");
            list.appendChild(img);
            img.className = "img";
            img.src = x.img;
            ref = document.createElement("span");
            list.appendChild(ref);
            ref.className = "ref";
            ref.innerText = n;
            song = document.createElement("span");
            list.appendChild(song);
            song.className = "song";
            if(x.feat){
                song.innerText = x.name + " (feat. " + x.feat +")";
            } else {
                song.innerText = x.name;
            }
            artist = document.createElement("span");
            list.appendChild(artist);
            artist.innerText = k.name;
            artist.className = "artist";
            album = document.createElement("span");
            list.appendChild(album);
            album.className = "album";
            if(x.album){
                album.innerText = x.album;
            } else {
                album.innerText = "(Single)"
            }
        } else {
            list = document.createElement("div");
            display.appendChild(list);
            list.setAttribute("tabindex", (8+n));
            list.className = "list";
            if((n/2).toString().replace('.', '=').search('=') != -1 ){
                list.setAttribute("scheme", "dark")
            }
            list.setAttribute("key", key);
            list.id = "n" + n;
            img = document.createElement("img");
            list.appendChild(img);
            img.className = "img";
            img.src = x.img;
            ref = document.createElement("span");
            list.appendChild(ref);
            ref.className = "ref";
            ref.innerText = n;
            container = document.createElement("div");
            list.appendChild(container);
            container.className = "container";
            song = document.createElement("span");
            container.appendChild(song);
            song.className = "song";
            song.innerText = x.name;
            artist = document.createElement("span");
            container.appendChild(artist);
            artist.innerText = k.name;
            artist.className = "artist";
            elips = document.createElement("button");
            list.appendChild(elips);
            elips.innerText = "â€¢â€¢â€¢";
            elips.className = "elips"
            elips.addEventListener("click", customcontextmenu);
        }
        n++;
    } while(chart[n])
    key = display.firstElementChild.getAttribute("key")
    refineDetails();
    key = display.firstElementChild.getAttribute("key")
    setFirst();
    NUM = 0;
    style.innerHTML = '.list[key="'+key+'"] {color: blue; box-shadow: 0px 0px 5px  0px cyan;}'
    xxx = key;
}
function refineDetails() {
    tk = key;
    key = key.split('.');
    k = key.shift();
    x = key.shift();
    k = database[k];
    x = k[x];
    key = tk;
}
function setMusic() {
    pc_play_artist.innerText = k.name;
    pc_play_img.src = x.img;
    if(wide){
        if(x.feat){
            pc_play_song.innerText = x.name + " (feat. " + x.feat + ")";
        } else {
            pc_play_song.innerText = x.name;
        }
    } else {
        pc_play_song.innerText = x.name;
    }
    audio.src = x.url;
    style.innerHTML = '.list[key="'+key+'"] {color: blue; box-shadow: 0px 0px 5px 0px cyan;}'
}
function setFirst() {
    pc_play_artist.innerText = k.name;
    pc_play_img.src = x.img;
    if(wide){
        if(x.feat){
            pc_play_song.innerText = x.name + " (feat. " + x.feat + ")";
        } else {
            pc_play_song.innerText = x.name;
        }
    } else {
        pc_play_song.innerText = x.name;
    }
}
function audiocanplay() {
    pc_prog.value = 0;
    pc_prog.max = Math.round(audio.duration);
    pc_range.value = 0;
    pc_range.max = Math.round(audio.duration);
    prog_maker = setInterval(() => prog_setter(), 100);
}
function setAudio() {
    audio.currentTime = pc_range.value;
}
function prog_setter() {
    pc_prog.value = Math.round(audio.currentTime);
}
function audioNext() {
    NUM++;
    if(display.children[NUM]){
        display.children[NUM].click();
    } else {
        display.firstElementChild.click();
    }
    if(wide == false && isReveal == true) {
        revealControls();
        isReveal = false;
    }
}
function audioBack() {
    NUM--;
    if(display.children[NUM]){
        display.children[NUM].click();
    } else {
        display.lastElementChild.click();
    }
    if(wide == false){
        revealControls();
    }
}
function audioDownload() {
    if(isDown[key]){} else {
        isDown[key] = true;
        if(window.location.hostname == "tunethis.w3spaces.com"){
            tracker = new URL('https://l.linklyhq.com/l/1fiKa');
            data = key.split('.');
            dk = database[data[0]].name;
            dx = database[data.shift()][data.pop()].name;
            tracker.searchParams.set(dk, dx);
            fetch(tracker).catch(error => {});
        }
    }
    link.href = x.url;
    link.click();
    if(wide == false && isReveal == true){
        revealControls();
        isReveal = false;
    }
}
function audioPorP() {
    if(audio.src == "") {
        audio.src = x.url;
    } else {
        if(wide){
            if(audio.src != ""){
                if(button_case.firstElementChild.innerText.toLowerCase() == "play"){
                    audio.play();
                } else {
                    audio.pause();
                }
            } else {
                display.firstElementChild.click();
            }
        } else {
            if(audio.src != ""){
                if(button_case.innerText.toLowerCase() == "play"){
                    audio.play();
                } else {
                    audio.pause();
                }
            } else {
                display.firstElementChild.click();
            }
        }
    }
    style.innerHTML = '.list[key="'+key+'"] {color: blue; box-shadow: 0px 0px 5px 0px cyan;}'
}
function audioPlay() {
    if(wide){
        button_case.firstElementChild.innerText = "Pause";
    } else {
        button_case.innerText = "Pause";
    }
    pc_range.style.top = pc_prog.getBoundingClientRect().top + 'px';
    pc_range.style.height = pc_prog.getBoundingClientRect().height + 'px';
    pc_range.style.left = pc_prog.getBoundingClientRect().left + 'px';
    pc_range.style.width = pc_prog.getBoundingClientRect().width + 'px';
    if(isPlay[xxx]){} else {
        isPlay[xxx] = true;
        if(window.location.hostname == "tunethis.w3spaces.com"){
            tracker = new URL('https://l.linklyhq.com/l/1fiKQ');
            data = xxx.split('.');
            dk = database[data[0]].name;
            dx = database[data.shift()][data.pop()].name;
            tracker.searchParams.set(dk, dx);
            fetch(tracker).catch(error => {});
        }
    }
}
function audioPause() {
    if(wide){
        button_case.firstElementChild.innerText = "Play";
    } else {
        button_case.innerText = "Play";
    }
}
function hideMenu() {
    menu.style = "";
}
function ex_download() {
    refineDetails();
    audioDownload();
    key = keyd; 
    refineDetails();
}
function ex_art_download() {
    refineDetails();
    link.href = x.img;
    link.click();
    key = keyd; 
    refineDetails();
}
function metaData() {
    meta_button.href = x.url;
    meta_img.style.backgroundImage = 'url(\'' + x.img +'\')';
    meta_tbody.innerHTML = '';
    //Artist, Name, Featured, Year, Length, Album
    createTable();
    th.innerText = "Artist";
    td.innerText = k.name;
    createTable();
    th.innerText = "Song";
    td.innerText = x.name;
    if(x.album){
        createTable();
        th.innerText = "Album";
        td.innerText = x.album;
    }
    if(x.feat){
        createTable();
        th.innerText = "Featuring";
        td.innerText = x.feat;
    }
    if(x.year){
        createTable();
        th.innerText = "Year";
        td.innerText = x.year;
    }
    if(audio.duration){
        createTable();
        th.innerText = "Length";
        len = Math.round(audio.duration)
        min = 0;
        do {
            if(len >= 60){
                len -= 60;
                min++;
            }
        }while(len >= 60);
        if(len <10){
            len = '0' + len;
        }
        td.innerText = min + ":" + len;
    }
    if(x.plays){
        createTable();
        th.innerText = "Plays";
        td.innerText = x.plays;
    }
    if(x.downloads) {
        createTable();
        th.innerText = "Downloads";
        td.innerText = x.downloads;
    }
    modal = "meta-data";
    activateModal();
}
function createTable() {
    tr = document.createElement("tr");
    meta_tbody.appendChild(tr);
    tr.className = "meta-data";
    th = document.createElement("th");
    tr.appendChild(th);
    th.className = "meta-data";
    td = document.createElement("td");
    tr.appendChild(td);
    td.className = "meta-data";
}
function activateModal() {
        if(isModal){
            Esc()
        }
        if(oldModal == modal){
            Esc()
            oldModal = false;
        } else {
            oldModal = modal;
            document.getElementById(modal).style.display = "block";
            document.getElementById(modal).focus();
            document.getElementById("cover").style.display = "block";
            isModal = true;
        }
}
function Esc() {
    if(oldModal){
    document.getElementById(oldModal).style = "";   
    }
    if(modal){
        document.getElementById(modal).style = "";
        document.getElementById("cover").style = "";
        isModal = false;
    }
}
function shortcuts() {
    modal = "shortcut";
    activateModal();
}
function ex_metadata() {
        refineDetails();
        metaData();
        key = keyd; 
        refineDetails();
}
function audioStream() {
    stream.innerHTML = '';
    //Audiomack, Boomplay, SoundCloud, Spotify, YT, YT Music
    if(x.audiomack || x.boomplay || x.soundcloud || x.spotify || x.yt || x.ytmusic || x.stream){
        if(x.audiomack){
            createStream();
            ph.innerText = "Audiomack";
            ah.href = x.audiomack;
        }
        if(x.boomplay){
            createStream();
            ph.innerText = "Boomplay";
            ah.href = x.boomplay;
        }
        if(x.soundcloud){
            createStream();
            ph.innerText = "SoundCloud";
            ah.href = x.soundcloud;
        }
        if(x.spotify){
            createStream();
            ph.innerText = "Spotify";
            ah.href = x.spotify;
        }
        if(x.yt){
            createStream();
            ph.innerText = "YouTube";
            ah.href = x.yt;
        }
        if(x.ytmusic){
            createStream();
            ph.innerText = "YouTube Music";
            ah.href = x.ytmusic;
        }
        if(x.stream){
            createStream();
            ph.innerText = "Stream";
            ah.href = x.stream;
        }
    } else {
        stream.innerHTML = '<p style="text-align: center; font-size: xx-large; opacity: 0.7; font-family: centaur;"> Sorry, streaming info not available <br><br><br> ðŸ¤”</p>';
    }
    modal = "stream";
    activateModal();
}
function createStream() {
    ah = document.createElement("a");
    stream.appendChild(ah);
    ah.className = "stream";
    ah.setAttribute("target", "_blank");
    ph = document.createElement("p");
    ah.appendChild(ph);
    ph.className = "stream";
}
function ex_stream() {
    refineDetails();
    audioStream();
    key = keyd; 
    refineDetails();
}
function audioGoToArtist() {
    stream.innerHTML = '';
    //Audiomack, Boomplay, SoundCloud, Spotify, YT, YT Music, Facebook, IG, Twitter
    if(k.audiomack_url || k.boomplay_url || k.soundcloud_url || k.spotify_url || k.yt_url || k.ytmusic_url || k.facebook_url || k.ig_url || k.twitter_url){
        if(k.facebook_url){
            createStream();
            ph.innerText = "Facebook";
            ah.href = k.facebook_url;
        }
        if(k.ig_url){
            createStream();
            ph.innerText = "Instagram";
            ah.href = k.ig_url;
        }
        if(k.twitter_url){
            createStream();
            ph.innerText = "Twitter";
            ah.href = k.twitter_url;
        }
        if(k.audiomack_url){
            createStream();
            ph.innerText = "Audiomack";
            ah.href = k.audiomack_url;
        }
        if(k.boomplay_url){
            createStream();
            ph.innerText = "Boomplay";
            ah.href = k.boomplay_url;
        }
        if(k.soundcloud_url){
            createStream();
            ph.innerText = "SoundCloud";
            ah.href = k.soundcloud_url;
        }
        if(k.spotify_url){
            createStream();
            ph.innerText = "Spotify";
            ah.href = k.spotify_url;
        }
        if(k.yt_url){
            createStream();
            ph.innerText = "YouTube";
            ah.href = k.yt_url;
        }
        if(k.ytmusic_url){
            createStream();
            ph.innerText = "YouTube Music";
            ah.href = k.ytmusic_url;
        }
    
    } else {
        stream.innerHTML = '<p style="text-align: center; font-size: xx-large; opacity: 0.7; font-family: centaur;"> Sorry, Artist info not available <br><br><br> ðŸ¤”</p>';
    }
    modal = "stream";
    activateModal();
}
function ex_go_to_artist() {
    refineDetails();
    audioGoToArtist();
    key = keyd; 
    refineDetails();
}
isKeyPressed = {}
document.onkeydown = (keyDownEvent) => {
    if(keyDownEvent.altKey && keyDownEvent.key.toLowerCase() == "q"){
        keyDownEvent.preventDefault();
        display.focus();
    } else {
        if(keyDownEvent.target != document.querySelector("input[type=\"search\"]") && keyDownEvent.target.tagName.toLowerCase() != "button" && keyDownEvent.target.tagName.toLowerCase() != "a"){
            switch(keyDownEvent.key.toLocaleLowerCase()){
                case "q":
                    if(keyDownEvent.ctrlKey){
                        Esc();
                        search.focus();
                        keyDownEvent.preventDefault();
                        if(wide == false){
                            H();
                        }
                    } else {
                        keyDownEvent.preventDefault();
                        shortcuts();
                    }
                    break;
                case " ":
                    keyDownEvent.preventDefault();
                    audioPorP();
                    break;
                case "n":                
                    keyDownEvent.preventDefault();
                    audioNext();
                    break;
                case "mediatracknext":
                    keyDownEvent.preventDefault();
                    audioNext();
                    break;
                case "arrowright":
                    if(keyDownEvent.altKey == false){
                        keyDownEvent.preventDefault();
                        ai = Math.round(audio.currentTime);
                        if((ai + 10) <= Number(pc_prog.max)){
                            audio.currentTime = ai + 10;
                        } else {
                            audioNext();
                        }
                    }
                    break;
                case "m":
                    if(keyDownEvent.ctrlKey == false){
                        keyDownEvent.preventDefault();
                        metaData();
                    }
                    break;
                case "arrowleft":
                    if(keyDownEvent.altKey == false){
                        keyDownEvent.preventDefault();
                        ai = Math.round(audio.currentTime);
                        if((Number(pc_prog.value) - 10) >= 0){
                            audio.currentTime = ai - 10;
                        } else {
                            audioBack();
                        }
                    }
                    break;
                case "b":
                    keyDownEvent.preventDefault();
                    audioBack();
                    break;
                case "mediatrackprevious":
                    keyDownEvent.preventDefault();
                    audioBack();
                    break;
                case "escape":
                    keyDownEvent.preventDefault();
                    Esc();
                    break;
                case "d":
                    keyDownEvent.preventDefault();
                    isKeyPressed[keyDownEvent.key] = false;
                    if(keyDownEvent.shiftKey){
                        ex_art_download();
                    } else {
                        audioDownload();
                    }
                    break;
                case "g":
                    keyDownEvent.preventDefault();
                    audioGoToArtist();
                    break;
                case "s":
                    keyDownEvent.preventDefault();
                    Esc();
                    audioStream();
    
            }
            if(isNaN(keyDownEvent.key) == false && keyDownEvent.key != " "){
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
document.onkeyup = (keyUpEvent) => {
    isKeyPressed[keyUpEvent.key] = false;
}
function searching() {
    searched = search.value.toLowerCase();
    display.innerHTML = '';
    n = 1;
    isNotFound = true;
    xo = 1;
    do {
        key = chart[n];
        refineDetails();
        key = chart[n];
        is = false;
        if(x.album){
            if(x.album.toLowerCase().search(searched) != -1){
                is = true;
            }
        }
        if(x.feat){
            if(x.feat.toLowerCase().search(searched) != -1){
                is = true;
            }
        }
        if(k.name.toLowerCase().search(searched) != -1 || x.name.toLowerCase().search(searched) != -1 || x.name.toLowerCase().replace(/[.]/g, '').search(searched) != -1 || k.name.toLowerCase().replace(/[.]/g, '').search(searched) != -1 || k.name.toLowerCase().replace(/[.]/g, '').replace(/[&]/g, 'and').search(searched) != -1 || k.name.toLowerCase().replace(/[&]/g, 'and').search(searched) != -1 || x.name.toLowerCase().replace(/[.]/g, '').replace(/[&]/g, 'and').search(searched) != -1 || x.name.toLowerCase().replace(/[&]/g, 'and').search(searched) != -1){
            is = true;
        }
        if(is){
            xo++;
            if(wide){
                list = document.createElement("div");
                display.appendChild(list);
                list.className = "list";
                if((xo/2).toString().replace('.', '=').search('=') == -1 ){
                    list.setAttribute("scheme", "dark")
                }
                list.setAttribute("key", key);
                img = document.createElement("img");
                list.appendChild(img);
                img.className = "img";
                img.src = x.img;
                ref = document.createElement("span");
                list.appendChild(ref);
                ref.className = "ref";
                ref.innerText = n;
                song = document.createElement("span");
                list.appendChild(song);
                song.className = "song";
                if(x.feat){
                    song.innerText = x.name + " (feat. " + x.feat +")";
                } else {
                    song.innerText = x.name;
                }
                artist = document.createElement("span");
                list.appendChild(artist);
                artist.innerText = k.name;
                artist.className = "artist";
                album = document.createElement("span");
                list.appendChild(album);
                album.className = "album";
                if(x.album){
                    album.innerText = x.album;
                } else {
                    album.innerText = "(Single)"
                }   
            } else{
                list = document.createElement("div");
                display.appendChild(list);
                list.setAttribute("tabindex", (8+n));
                list.className = "list";
                if((xo/2).toString().replace('.', '=').search('=') == -1 ){
                    list.setAttribute("scheme", "dark")
                }
                list.setAttribute("key", key);
                img = document.createElement("img");
                list.appendChild(img);
                img.className = "img";
                img.src = x.img;
                ref = document.createElement("span");
                list.appendChild(ref);
                ref.className = "ref";
                ref.innerText = n;
                container = document.createElement("div");
                list.appendChild(container);
                container.className = "container";
                song = document.createElement("span");
                container.appendChild(song);
                song.className = "song";
                song.innerText = x.name;
                artist = document.createElement("span");
                container.appendChild(artist);
                artist.innerText = k.name;
                artist.className = "artist";
                elips = document.createElement("button");
                list.appendChild(elips);
                elips.innerText = "â€¢â€¢â€¢";
                elips.className = "elips"
                elips.addEventListener("click", customcontextmenu);
            }
            isNotFound = false;
        }
        n++;
    } while(chart[n])
    if(isNotFound){
        if(wide){
            display.innerHTML = '<p style="font-family: centaur; font-weight: bold; opacity: 0.7; display: block; font-size: xx-large; text-align: center"> Sorry, your requested search "'+ search.value +'" doesn\'t exist <br><br> ðŸ¤” </p>';
        } else {
            display.innerHTML = '<p style="font-family: centaur; font-weight: bold; opacity: 0.7; display: block; font-size: xx-large; text-align: center"> Sorry, your requested search "'+ search.value +'" doesn\'t exist <br><br> ðŸ¤” </p>';
        }
    }    
}
function H() {  
    if(wide == false){
        document.getElementById("form").style.display = "inline-block";
        document.getElementById("upload-div").style.display = "inline-block";
        search.focus();
        document.querySelector("code").style.display = "none";
    }
}
function R() {
    document.getElementById("form").style.display = "";
    document.getElementById("upload-div").style.display = "";
    document.querySelector("code").style.display = "";
}
function close_button() {
    if(wide){
        hideMenu();
    } else {
        mobileHide();
    }
}
function check_userID() {
    if(localStorage.getItem("id")){} else {
       id = new Date().toString().toUpperCase().split('(').shift().replace(/[ +:]/g, '');
       localStorage.setItem("id", id);
    }
}
